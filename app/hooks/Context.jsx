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

  const [globalAchievement,setGlobalAchievement]=useState([])

 

if(loading){
  return <div className='page-loader-parent'>
    <div className='page-loader'></div>
  </div>
}

  return (
    <DashContext.Provider value={{ showDash, setShowDash, userData,setUserData,isAuthenticated,setIsAuthenticated,notifications,notificationCount,setNotificationCount,tutoringData,setShowAchPopup,showAchPopup,globalAchievement,setGlobalAchievement}}>
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

