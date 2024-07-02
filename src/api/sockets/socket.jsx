import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const accessToken = useSelector((state) => state.auth.accessToken);


  useEffect(() => {
    const initializeSocket = () => {
      if (accessToken) {
        const newSocket = io("localhost:5050", {
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