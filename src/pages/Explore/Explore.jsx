import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Users, Filter, X } from "lucide-react";
import { PROGRAMMES, TRADES, getBatchYears } from "@/constant";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfinitePageLoader from "@/components/Loaders/InfinitePageLoader";
import { useInView } from "react-intersection-observer";
import userService from "@/api/services/userService";
import toast from "react-hot-toast";

const BATCHES = getBatchYears();

const Explore = () => {
  const [reRun, setReRun] = useState(0);
  const [filters, setFilters] = useState({
    skills: [],
    batches: BATCHES,
    trades: PROGRAMMES.flatMap((prog) => TRADES[prog]),
    programmes: PROGRAMMES,
    sort: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput && !filters.skills.includes(skillInput)) {
      setFilters((prev) => ({ ...prev, skills: [...prev.skills, skillInput] }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleFilterChange = (key, value) => {
    if (value === "All") {
      const allItems =
        key === "programmes"
          ? PROGRAMMES
          : key === "batches"
          ? BATCHES
          : PROGRAMMES.flatMap((prog) => TRADES[prog]);
      setFilters((prev) => ({
        ...prev,
        [key]: prev[key].length === allItems.length ? [] : allItems,
      }));
    } else if (key === "programme") {
      const updatedProgrammes = filters.programmes.includes(value)
        ? filters.programmes.filter((item) => item !== value)
        : [...filters.programmes, value];

      const updatedTrades = updatedProgrammes.flatMap((prog) => TRADES[prog]);

      setFilters((prev) => ({
        ...prev,
        programmes: updatedProgrammes,
        trades: updatedTrades,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: prev[key].includes(value)
          ? prev[key].filter((item) => item !== value)
          : [...prev[key], value],
      }));
    }
  };

  const handleSort = (value) => {
    setFilters((prev) => ({
      ...prev,
      sort: value.trim(),
    }));
    setReRun((prev) => prev + 1);
  };

  const FilterCheckbox = ({ label, value, category }) => {
    const isAll = value === "All";
    const allItems =
      category === "programmes"
        ? PROGRAMMES
        : category === "batches"
        ? BATCHES
        : PROGRAMMES.flatMap((prog) => TRADES[prog]);

    const isChecked = isAll
      ? filters[category].length === allItems.length
      : filters[category].includes(value);

    return (
      <div className="flex items-center gap-2 my-1">
        <Checkbox
          id={`${category}-${value}`}
          checked={isChecked}
          onCheckedChange={() => handleFilterChange(category, value)}
        />
        <label
          htmlFor={`${category}-${value}`}
          className="text-sm font-medium !-mt-0 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    );
  };

  const { ref, inView } = useInView();
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["exploreUser" + reRun],
    queryFn: ({ pageParam = 1 }) =>
      userService.exploreUsers({ pageParam, limit: 10, req: filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
  useEffect(() => {
    if (error) console.error(error);
    if (status === "success" && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, error, status, hasNextPage]);

  const applyFilters = () => {
    // check filters
    if(filters.trades.length === 0 || filters.programmes.length === 0 || filters.batches.length === 0){
      toast.error("please select filter");
    }
    
    // Apply Filters
    setReRun((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto py-10 pb-40 px-4 min-h-[600px] md:min-h-[800px]">
      <h1 className="text-2xl lg:text-4xl font-bold my-6 lg:my-14 text-center">
        Explore people around the campus
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar Filters */}
        <div
          className={`md:w-1/4 ${showFilters ? "block" : "hidden md:block"}`}
        >
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Filters</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <form onSubmit={handleAddSkill} className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <Button type="submit" variant="primary" size="sm">
                    Add
                  </Button>
                </form>
                <div className="flex flex-wrap gap-1 mt-2">
                  {filters.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded flex items-center"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 text-blue-800 hover:text-blue-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Batch</h3>
                <div className="flex flex-row justify-between">
                  <FilterCheckbox label="All" value="All" category="batches" />
                  {BATCHES.map((batch) => (
                    <FilterCheckbox
                      key={batch}
                      label={batch}
                      value={batch}
                      category="batches"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Programmes</h3>
                <div className="flex flex-row justify-left gap-x-4">
                  <FilterCheckbox
                    label="All"
                    value="All"
                    category="programmes"
                  />
                  {PROGRAMMES.map((programme) => (
                    <FilterCheckbox
                      key={programme}
                      label={programme}
                      value={programme}
                      category="programmes"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Trade</h3>
                <FilterCheckbox label="All" value="All" category="trades" />
                <div className="flex flex-wrap -mx-2">
                  {PROGRAMMES.filter((prog) =>
                    filters.programmes.includes(prog)
                  ).map((prog) => (
                    <div key={prog} className="w-1/2 px-2">
                      <h4 className="text-sm font-medium mt-2">{prog}</h4>
                      {TRADES[prog].map((trade) => (
                        <FilterCheckbox
                          key={trade}
                          label={trade}
                          value={trade}
                          category="trades"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex justify-end">
                <Button size="sm" variant="primary" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          {/* Sort and Filter Toggle (for mobile) */}
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={(value) => handleSort(value)}>
              <SelectTrigger className="w-[180px] lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Followers: Low to High</SelectItem>
                <SelectItem value="desc">Followers: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>

          {/* User Cards Grid */}
          {!data?.pages && <InfinitePageLoader text="Searching users..." />}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.pages &&
              data?.pages?.map((page, i) => (
                <React.Fragment key={i}>
                  {page?.map((user) => (
                    <Card key={user._id} className="max-w-sm">
                      <CardHeader className="flex flex-col items-center p-4">
                        <Avatar className="w-20 h-20 mb-2">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>
                            {user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-semibold text-center">
                          {user.fullName}
                        </h3>
                        <p className="text-sm text-gray-500 text-center truncate max-w-full">
                          {user.headLine}
                        </p>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-center">
                        <div className="flex items-center justify-center text-sm mb-2">
                          <Users className="mr-1 h-3 w-3" />
                          <span>{user.followersCount} followers</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1">
                          {user?.skills?.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                            >
                              {skill.skill}
                            </span>
                          ))}
                          {user?.skills?.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{user?.skills?.length - 3} more
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </React.Fragment>
              ))}
          </div>
          <div className="" ref={ref}>
            {isFetchingNextPage && (
              <InfinitePageLoader text="Searching Users..." />
            )}
            {data?.pages[0].length === 0 && (
              <div className="py-20">
                <p className="text-center text-gray-500">No Users Found</p>
              </div>
            )}

            {data?.pages[0].length > 0 && !hasNextPage && (
              <div className="py-10">
                <p className="text-center text-gray-500">No more users found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
