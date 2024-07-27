import React from 'react'
import { Loader2 } from 'lucide-react';

function InfinitePageLoader({text}) {
  return (
    <div className="flex justify-center items-center py-4 w-full">
      <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
      <span className="ml-2 text-sm text-gray-600">{text}</span>
    </div>
  )
}

export default InfinitePageLoader;
