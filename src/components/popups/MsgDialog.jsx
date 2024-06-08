import React, { useState } from 'react';

const MsgDialog = ({ active, title = "", text = "" }) => {
  const [isOpen, setIsOpen] = useState(active);

  const handleCloseDialog = () => {
    localStorage.setItem('msgDialog', 'false');
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center z-50 pt-40 md:items-center md:pt-0">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseDialog}></div>
          <div className="bg-white rounded-lg p-5 max-w-[330px] md:max-w-md mx-auto relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-primaryBlue">{title}</h3>
              <button className="text-gray-500 hover:text-gray-700 pl-5 md:pl-10" onClick={handleCloseDialog}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 pr-4 text-justify">{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MsgDialog;