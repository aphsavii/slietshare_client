import React from 'react'

function SkillTagRemovable({
    text,
    proficiency = 'Beginner',
    className,
    crossFunc
}) {
  const skillProficiency = {
    Beginner: 'bg-gray-100 text-gray-500 border-gray-200',
    Intermediate: 'bg-yellow-100 text-yellow-500 border-yellow-200',
    Advanced: 'bg-green-100 text-green-600 border-green-200',
    };

  return (
    <div title={text + ' '+ proficiency} className={`px-4 md:px-5 text-sm lg:text-base font-medium py-1 h-fit w-fit rounded-2xl lg:rounded-3xl border-[1px] ${skillProficiency[proficiency]}  ${className}`}>
     <span> {text}</span> <span className='ml-3 text-gray-500 cursor-pointer' onClick={crossFunc}>X</span>
    </div>
  )
}

export default SkillTagRemovable;
