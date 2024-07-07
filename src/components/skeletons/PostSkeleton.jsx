import React from "react";
import { Skeleton } from "../../../shadcn/ui/skeleton.jsx";

const PostSkeleton = () => {
  return (
    <div className="  rounded-lg ">
      <div className="p-4 bg-white rounded-lg mb-5">
        <div className="flex items-center mb-4">
          <Skeleton className="w-10 h-10 rounded-full mr-3" />{" "}
          {/* This is already rounded */}
          <div>
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-3 w-60" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="w-full h-64 rounded-lg mb-4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-40" />
        </div>
      <div className=" border-gray-200">
        <div className="flex justify-around p-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
      </div>
      <div className="p-4 bg-gray-50">
        <Skeleton className="w-full h-20 mb-4 rounded-md" />
        <div className="space-y-4">
          <Skeleton className="w-full h-16 rounded-md" />
          <Skeleton className="w-full h-16 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
