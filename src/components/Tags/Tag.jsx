import React from 'react'

function Tag({
    text,
    className
}) {
  return (
    <div className={`px-4 md:px-5 text-sm lg:text-base font-medium py-1 h-fit w-fit rounded-2xl lg:rounded-3xl border-[1px] border-gray-300 bg-gray-200  ${className}`}>
      {text}
    </div>
  )
}

export default Tag
