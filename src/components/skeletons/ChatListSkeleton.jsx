import React from 'react';
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Skeleton } from "@/shadcn/ui/skeleton";

const ChatListSkeletonLoader = () => {
  return (
    <ScrollArea className="h-[80vh]">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="p-4 hover:bg-gray-100 cursor-pointer flex items-center"
        >
          <Skeleton className="h-12 w-12 rounded-full mr-4" />
          <div className="flex-grow min-w-0">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex flex-col items-end">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-2 w-2 rounded-full" />
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default ChatListSkeletonLoader;