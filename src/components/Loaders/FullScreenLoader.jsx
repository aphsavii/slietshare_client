import React from 'react';

const FullScreenLoader = ({text="Loading your content..."}) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 1s ease-out infinite alternate;
        }
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
        .orbit {
          animation: orbit 3s linear infinite;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full pulse"></div>
        </div>
        {['bg-red-500', 'bg-green-500', 'bg-yellow-500'].map((color, index) => (
          <div 
            key={index} 
            className={`absolute top-1/2 left-1/2 w-4 h-4 ${color} rounded-full orbit`} 
            style={{ 
              animationDelay: `${index * -1}s`,
              marginTop: '-8px',
              marginLeft: '-8px'
            }}
          ></div>
        ))}
      </div>
      
      <div className="text-4xl font-bold text-primary mb-4 animate-fadeInScale">
        SLIETshare
      </div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default FullScreenLoader;