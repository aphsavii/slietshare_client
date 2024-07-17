import React from 'react';
import { Skeleton } from "@/shadcn/ui/skeleton"

const SuggestedProfiles = () => (
  <div className="flex justify-between w-full items-center">
    <div className="flex flex-row justify-center items-center gap-x-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
    <Skeleton className="h-8 w-8 rounded" />
  </div>
);

const SuggestedProfilesList = () => {
  return (
    <div className="flex flex-col w-full my-3 gap-3.5">
      {[...Array(5)].map((_, index) => (
        <SuggestedProfiles key={index} />
      ))}
    </div>
  );
};

export default SuggestedProfilesList;