import React from 'react'

function SkillTag({
    text,
    proficiency = 'Beginner',
    className
}) {
  const skillProficiency = {
    Beginner: 'bg-gray-100 text-gray-500 border-gray-200',
    Intermediate: 'bg-yellow-100 text-yellow-500 border-yellow-200',
    Advanced: 'bg-green-100 text-green-600 border-green-200',
    };

  return (
    <div title={text + ' '+ proficiency} className={`px-4 md:px-5 text-sm lg:text-base cursor-pointer font-medium py-1 h-fit w-fit rounded-2xl lg:rounded-3xl border-[1px] ${skillProficiency[proficiency]}  ${className}`}>
      {text}
    </div>
  )
}

export default SkillTag;
