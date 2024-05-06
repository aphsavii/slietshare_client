import React, { useEffect } from 'react'
import PendingQs from './PendingQs';

function QsStatus() {
  useEffect(() => {
    // Add your code for this component here
  });
  return (
    <div className="container py-10 px-4 flex items-center justify-center min-h-[600px] md:min-h-[800px] mx-auto">
    <div className=''>
      <PendingQs />
      </div>
    </div>
  )
}

export default QsStatus;