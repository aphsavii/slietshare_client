import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const accessToken = useSelector((state) => state.auth.accessToken);

  let socketUrl = window.location.origin.includes('localhost') ? 'http://localhost:5050' : 'https://slietshare-server.onrender.com/';
  if(window.location.origin.includes('slietshare-client-um2t')) socketUrl = 'https://slietshare-server-2lbv.onrender.com';  

  useEffect(() => {
    const initializeSocket = () => {
      if (accessToken) {
        const newSocket = io(socketUrl, {
          auth: { accessToken },
        //   autoConnect: false,
        });
        setSocket(newSocket);
      }
    };

    initializeSocket();

    return () => {
      if (socket) socket.disconnect();
    };
  }, [accessToken]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };