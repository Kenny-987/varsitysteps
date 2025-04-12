import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useContextUser } from './Context';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const {userData}=useContextUser()

  useEffect(() => {
  let newSocket
    // Create socket connection
    if(userData){
      newSocket = io.connect('http://localhost:3000',{
        query:{userId:userData.id}
      });
    }else {
      console.log("User is not logged in, not connecting to WebSocket.");
  }
    setSocket(newSocket);

    // Cleanup the socket connection when the component unmounts
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
