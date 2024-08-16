import React from 'react';

const LeaderboardSkeleton = ({ platform }) => {
  return (
    <div className="animate-pulse w-full overflow-x-auto">
      <div className="min-w-[800px]"> {/* Minimum width to ensure all columns are visible */}
        <div className="h-8 bg-gray-300 rounded w-full mb-4"></div>
        <div className="space-y-2">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex space-x-2">
              <div className="h-8 bg-gray-300 rounded w-[7%]"></div>
              <div className="h-8 bg-gray-300 rounded w-[25%]"></div>
              <div className="h-8 bg-gray-300 rounded w-[20%]"></div>
              <div className="h-8 bg-gray-300 rounded w-[20%]"></div>
              <div className="h-8 bg-gray-300 rounded w-[20%]"></div>
              {platform === "codeforces" && (
                <>
                  <div className="h-8 bg-gray-300 rounded w-[14%]"></div>
                  <div className="h-8 bg-gray-300 rounded w-[14%]"></div>
                </>
              )}
              <div className="h-8 bg-gray-300 rounded w-[5%]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;