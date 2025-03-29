'use client'
import React, { createContext, useContext, useState,useEffect } from 'react';
import useFetchUser from './useFetchUser';
const DashContext = createContext();


// Create the provider component
export const ContextProvider = ({ children }) => {
  const [showDash, setShowDash] = useState(false);
  const [showAchPopup,setShowAchPopup]=useState(false)
  const [showCalling,setShowCalling]=useState(false)
  const {userData,setUserData,isAuthenticated,setIsAuthenticated,loading,notifications,notificationCount,setNotificationCount,tutoringData} = useFetchUser();
  const [callerDetails,setCallerDetails]=useState(null)
  const [globalAchievement,setGlobalAchievement]=useState([])
  const [answerCallFunction,setAnswerCallFunction]=useState(null)
  const [showVideoCall,setShowVideoCall]=useState(false)
  const [showNotifyPopup,setShowNotifyPopup]=useState(false)

if(loading){
  return <div className='page-loader-parent'>
    <div className='page-loader'></div>
  </div>
}

  return (
    <DashContext.Provider value={{ showDash, setShowDash, userData,setUserData,isAuthenticated,setIsAuthenticated,notifications,notificationCount,setNotificationCount,tutoringData,setShowAchPopup,showAchPopup,globalAchievement,setGlobalAchievement,showCalling,setShowCalling,callerDetails,setCallerDetails,answerCallFunction,setAnswerCallFunction,showVideoCall,setShowVideoCall,showNotifyPopup,setShowNotifyPopup}}>
      {children}
    </DashContext.Provider>
  );
};

// Custom hook to use the context
export const useContextUser = () => {
  const context = useContext(DashContext);
  if (context === undefined) {
    throw new Error('useDashContext must be used within a DashContextProvider');
  }
  return context;
};

