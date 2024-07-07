import React from "react";
import { Skeleton } from "/shadcn/ui/skeleton";

const UserProfileSkeleton = () => {
  return (
    <div className="container px-4 flex min-h-[600px] md:min-h-[800px] mx-auto">
      <div className="mx-auto w-full flex flex-col lg:flex-row py-10 md:py-16 px-3 lg:px-0">
        {/* Left column */}
        <div className="lg:max-w-[450px] min-w-64 lg:min-w-80 flex flex-col gap-5">
          {/* Profile info skeleton */}
          <div className="py-5 px-5 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-3/4 mt-5" />
            <Skeleton className="h-4 w-1/2 mt-2" />
            <Skeleton className="h-16 w-full mt-2" />
            <div className="flex mt-5 mb-2 justify-between items-center">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Personal Info skeleton */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          {/* Social Links skeleton */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-sm mr-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full lg:px-8 mt-5 lg:mt-0 flex flex-col gap-5">
          {/* About skeleton */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>

          {/* Work Experience skeleton */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <Skeleton className="h-6 w-1/3 mb-4" />
            {[1, 2].map((_, index) => (
              <div key={index} className="py-3">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-sm mr-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full mt-3" />
              </div>
            ))}
          </div>

          {/* Projects skeleton */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <Skeleton className="h-6 w-1/4 mb-4" />
            {[1, 2].map((_, index) => (
              <div key={index} className="py-3">
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>

          {/* Education skeleton */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <Skeleton className="h-6 w-1/4 mb-4" />
            {[1, 2].map((_, index) => (
              <div key={index} className="py-3">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-sm mr-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full mt-3" />
              </div>
            ))}
          </div>

          {/* Skills skeleton */}
          <div className="py-5 px-6 bg-white h-fit rounded-xl border border-1 border-lightGray">
            <Skeleton className="h-6 w-1/4 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <Skeleton key={index} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;