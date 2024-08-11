import React from 'react';
import { Skeleton } from "@/shadcn/ui/skeleton"

const ChatSkeletonLoader = () => {
  return (
    <div className="space-y-4 py-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <div className="relative max-w-[70%] bg-muted p-3 rounded-lg">
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="absolute bottom-1 right-2 h-3 w-8" /> {/* Time skeleton */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeletonLoader;