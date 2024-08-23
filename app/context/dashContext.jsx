'use client'
// context/dashContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';

// Create the context
const DashContext = createContext();

// Create the provider component
export const DashContextProvider = ({ children }) => {
  const [showDash, setShowDash] = useState(false);
  const [authStatus, setAuthStatus] = useState({isAuthenticated:false,user:null});
  const [loading,setLoading] = useState(true)
 
useEffect(()=>{
   const localData = JSON.parse(localStorage.getItem('userData'))
   if(localData){
    console.log('this is local user data ',localData)
    setAuthStatus(localData)
   }
},[])


  // useEffect(() => {
  //   // Check authentication status on initial load
  //   const localData = JSON.parse(localStorage.getItem('user'))
  //   if (localData){
  //     setAuthStatus(localData)
  //   }else{
  //     const checkAuth = async () => {
  //       try {
  //       const response = await fetch('http://localhost:3000/api/auth/status',{
  //         method:'GET',
  //         credentials:'include'
  //       });
  //         const data = await response.json();
  //         if(data){
  //           setLoading(false)
  //           localStorage.setItem('user',JSON.stringify(data))
  //         }
  //       } catch (error) {
  //         console.error('Error checking authentication status:', error);
  //       }finally{
  //         setLoading(false)
  //       }
  //     };
  //     checkAuth();
  //   }
  
  // }, []);

//   useEffect(()=>{
//     const getData = async ()=>{
//       try{
//         const localData = await JSON.parse(localStorage.getItem('user'))
//         if(localData){
//           setAuthStatus(localData)
//         }
//       }catch(error){
//         console.error(error)
//       }
//     }
// getData()
//   },[])

  return (
    <DashContext.Provider value={{ showDash, setShowDash,authStatus,loading }}>
      {children}
    </DashContext.Provider>
  );
};

// Custom hook to use the context
export const useDashContext = () => {
  const context = useContext(DashContext);
  if (context === undefined) {
    throw new Error('useDashContext must be used within a DashContextProvider');
  }
  return context;
};




//this context is used to toggle the dashboard navbar when a user clicks it. Since the trigger is the navbar component i had to use context api