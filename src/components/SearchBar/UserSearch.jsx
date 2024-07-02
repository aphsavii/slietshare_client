import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "/shadcn/ui/popover";
import { UserRoundSearch, Search } from "lucide-react";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import { useQuery } from "@tanstack/react-query";
import userService from "@/api/services/userService";
import Loading from "../Loaders/Loading";
import { Link } from "react-router-dom";

function UserSearch() {
  const [searchText, setSearchText] = useDebouncedState("", 1000);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userSearch", searchText],
    queryFn: async () => await userService.searchUsers(searchText),
    enabled: searchText.length > 0,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  },[data,isError]);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          {" "}
         
          <UserRoundSearch className="text-white h-4 w-4 md:h-7 md:w-7" />
        </PopoverTrigger>
        <PopoverContent className="bg-white w-screen min-h-[200px] md:w-[400px]">
          <h3 className="text-xl md:text-2xl font-medium text-gray-700 mt-2">
            Search your peers
          </h3>
          <div className="border shadow rounded-md md:w-fit my-3 px-2 w-full">
            <Search className="h-5 w-5 text-gray-600 inline my-auto mr-2 mb-1.5" />
            <input
              onChange={(e) => setSearchText(e.target.value)}
              className=" outline-none focus:outline-none md:p-1 p-1.5 rounded-md text-base md:text-lg"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="w-full mb-5 mt-10">
              {isLoading && <Loading />}
              {isError && <p>error</p>}
              {
                data && data.length == 0 && <p className="text-center text-sm lg:text-lg text-red-500 ">404 | No user Found</p>
              }
            {data && data.length > 0 &&
              data.map((user) => (
                <Link to={`user/${user.regno}`}>
                <div
                  key={user.regno}
                  className="flex  flex-col border-b border-gray-200 py-4"
                >
                  <div className="flex w-full justify-between">
                  <div className="flex">
                    <img
                      src={user.avatarUrl}
                      alt="profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <p className="ml-2 text-sm md:text-base text-primaryBlue font-medium">
                      {user.fullName}
                    </p>
                  </div>
                    <span className="text-xs font-normal italic text-gray-700">
                    {user.trade} / {user.regno}
                    </span>
                  </div>
                  <div className="text-xs -mt-2 ml-10 text-gray-500 text-left">
                    {user?.headLine}
                  </div>
                </div>
                </Link>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default UserSearch;
