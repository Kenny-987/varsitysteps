'use client'
import React, {useEffect,useState} from 'react'
import { useSocket } from '../hooks/SocketContext';
import { useContextUser } from '../hooks/Context';

const ParentListenerSocket = ({children}) => {
    const socket = useSocket();
    const { setCallerDetails, setShowCalling } = useContextUser();
  
    useEffect(() => {
      // const handleCallMade = (data) => {
      //   // Always update caller details on incoming call
      //   setCallerDetails({
      //     callerId: data.callerUserId,
      //     callerName: data.callerName,
      //   });
      //   setShowCalling(true);
      //   console.log("Incoming call", data);
      // };
  
      const handleCallCancelled = (data) => {
        // Clear call details when the call is cancelled
        setCallerDetails(null);
        setShowCalling(false);
        console.log("Call cancelled");
      };
  
      // Register event listeners
      // socket.on("call-made", handleCallMade);
      socket.on("call-cancelled", handleCallCancelled);
  
      // Cleanup: remove only the specific handlers to avoid removing other listeners
      return () => {
        // socket.off("call-made", handleCallMade);
        socket.off("call-cancelled", handleCallCancelled);
      };
    }, []);
  
    return <>{children}</>;
}

export default ParentListenerSocket