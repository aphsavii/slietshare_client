import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/Button";
import { User } from "lucide-react";
import userService from "@/api/services/userService";
import { SquareArrowOutUpRight, Shuffle } from "lucide-react";
import { trimText } from "@/helpers";
import SuggestedProfilesList from "../skeletons/SuggestedProfiles";

function PostSidebar() {
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [random,setRandom] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    userService
      .suggestedProfiles()
      .then((res) => {
        setSuggestedProfiles(res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  }, [random]);

  return (
    <div className="flex items-center flex-col mb-3">
      <div className="px-3 w-full">
        <h2 className=" mt-5 text-xl text-primaryBlue font-semibold ">
          You may know them
        </h2>
        {loading && <SuggestedProfilesList />}
       {!loading && <div className="flex flex-col w-full my-3 gap-3.5 ">
          {suggestedProfiles.map((profile) => (
            <div
              key={profile._id}
              className="flex justify-between w-full items-center"
            >
              <div className="flex flex-row justify-center items-center gap-x-2">
                <Link to={`/user/${profile.regno}`}>
                  <Avatar className="h-7 w-7  md:h-10 md:w-10 cursor-pointer">
                    <AvatarImage src={profile.avatarUrl} />
                    <AvatarFallback>
                      <User color="#6b7280" size={24} />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="h-full">
                  <Link to={`/user/${profile.regno}`}>
                    <h2 className="font-medium hover:underline">
                      {profile.fullName}
                    </h2>
                  </Link>
                  <p className="text-xs text-gray-500">
                    {trimText(profile.headLine, 35)}
                  </p>
                </div>
              </div>
              <Link to={`/user/${profile.regno}`}>
                <Button
                  size="xs"
                  variant="icon"
                  className="tracking-wide px-2 py-1"
                >
                  <SquareArrowOutUpRight color="#6b7280" size={16} />
                </Button>
              </Link>
            </div>
          ))}
        </div>}
      </div>
      <Button variant="ghost" className=" text-primaryBlue" onClick={()=>setRandom(Math.random())}>
        shuffle <Shuffle size={16} className="ml-1" />
      </Button>
    </div>
  );
}

export default PostSidebar;
