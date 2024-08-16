import React, { useEffect, useState } from "react";
import { ExternalLink, Trophy, Medal } from "lucide-react";
import leaderboardService from "@/api/services/leaderboardService";
import { Link } from "react-router-dom";
import LeaderboardSkeleton from "@/components/skeletons/LeaderboardSkeleton";
import { set } from "react-hook-form";

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-t-lg transition-colors duration-200 ${
      active
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const RankIcon = ({ rank }) => {
  if (rank === 1)
    return (
      <Trophy className="inline-block mr-1 sm:mr-2 text-yellow-500" size={20} />
    );
  if (rank === 2)
    return (
      <Medal className="inline-block mr-1 sm:mr-2 text-gray-400" size={20} />
    );
  if (rank === 3)
    return (
      <Medal className="inline-block mr-1 sm:mr-2 text-yellow-500" size={20} />
    );
  return null;
};

const LeaderboardTable = ({ data, platform }) => {
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-300 to-yellow-200 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold";
      case 1:
        return "bg-gradient-to-r from-gray-300 to-gray-200 hover:from-gray-400 hover:to-gray-300 text-black font-semibold";
      case 2:
        return "bg-gradient-to-r from-yellow-700 to-yellow-700 hover:from-yellow-800 hover:to-yellow-700 text-white font-semibold";
      default:
        return index % 2 === 0
          ? "bg-white hover:bg-blue-50"
          : "bg-gray-50 hover:bg-blue-50";
    }
  };

  return (
    <div className="overflow-x-auto max-w-full">
      <table className="w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden ">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
              Rank
            </th>
            <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
              Username
            </th>
            {platform === "gfg" ? (
              <>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                  Score
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                  Problems Solved
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                  Max Streak
                </th>
              </>
            ) : (
              <>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                  Rating
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                  Max Rating
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                  Rank
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                  Max Rank
                </th>
              </>
            )}
            <th className="py-2 px-3 sm:py-3 sm:px-4 border-b text-xs sm:text-sm whitespace-nowrap">
              Coding Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={user.regno}
              className={`${getRowStyle(
                index
              )} transition-colors duration-200 text-center`}
            >
              <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center font-bold text-sm sm:text-base whitespace-nowrap">
                <RankIcon rank={index + 1} />
                {index + 1}
              </td>
              <td
                className={`py-2 px-3 sm:py-4 sm:px-4 border-b font-medium text-sm sm:text-base ${
                  index < 3 ? "sm:text-lg" : ""
                } whitespace-nowrap`}
              >
                <Link to={`/user/${user.regno}`} className="hover:underline">
                  {user.fullName}
                </Link>
              </td>
              {platform === "gfg" ? (
                <>
                  <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center text-sm sm:text-base whitespace-nowrap">
                    {user.gfgData.score}
                  </td>
                  <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center text-sm sm:text-base whitespace-nowrap">
                    {user.gfgData.problemsSolved}
                  </td>
                  <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center text-sm sm:text-base whitespace-nowrap">
                    {user.gfgData.streak}
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center text-sm sm:text-base whitespace-nowrap">
                    {user.rating ?? "_"}
                  </td>
                  <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center text-sm sm:text-base whitespace-nowrap">
                    {user.maxRating ?? "_"}
                  </td>
                  <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center text-sm sm:text-base whitespace-nowrap">
                    {user.rank ?? "_"}
                  </td>
                  <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center text-sm sm:text-base whitespace-nowrap">
                    {user.maxRank ?? "_"}
                  </td>
                </>
              )}
              <td className="py-2 px-3 sm:py-4 sm:px-4 border-b text-center whitespace-nowrap">
                <a
                  href={`https://${
                    platform === "gfg"
                      ? "auth.geeksforgeeks.org/user/" + user.gfgData.username
                      : "codeforces.com/profile/" + user.codeforcesData.username
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="inline-block" size={16} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Leaderboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("gfg");
  const [gfgData, setGfgData] = useState([]);
  const [codeforcesData, setCodeforcesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (selectedPlatform === "codeforces") {
          if (codeforcesData.length === 0) {
            const data = await leaderboardService.getCodeforcesLeaderboard();
            setCodeforcesData(data);
          }
        } else {
          if (gfgData.length === 0) {
            const data = await leaderboardService.getGFGLeaderboard();
            setGfgData(data);
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [selectedPlatform]);

  return (
    <div className="container min-h-[600px] md:min-h-[800px] mx-auto py-10 md:py-20">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-center text-gray-800">
        College wide Leaderboard
      </h1>
      <div className="mb-4 sm:mb-6 flex justify-center space-x-2 sm:space-x-4">
        <TabButton
          active={selectedPlatform === "gfg"}
          onClick={() => setSelectedPlatform("gfg")}
        >
          GeeksforGeeks
        </TabButton>
        <TabButton
          active={selectedPlatform === "codeforces"}
          onClick={() => setSelectedPlatform("codeforces")}
        >
          Codeforces
        </TabButton>
      </div>

      {isLoading ? (
        <LeaderboardSkeleton platform={selectedPlatform} />
      ) : (
        <LeaderboardTable
          data={selectedPlatform === "gfg" ? gfgData : codeforcesData}
          platform={selectedPlatform}
        />
      )}
    </div>
  );
};

export default Leaderboard;
