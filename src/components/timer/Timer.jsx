import React, { useState, useEffect } from 'react';

const Timer = ({ minutes }) => {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes]);

  const formattedTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} min ${sec < 10 ? '0' : ''}${sec} sec`;
  };

  return <span className='ml-1'>{formattedTime()}</span>;
};

export default Timer;
