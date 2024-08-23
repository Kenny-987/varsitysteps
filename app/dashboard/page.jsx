'use client'
import React, {useState} from 'react'
import './dash.css'
import Profile from './profile';
import Messages from './messages'
import Settings from './settings';
import Help from './help';
import Logout from './logout';
import { useDashContext } from '../context/dashContext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const[content,setContent]=useState("Profile")
  const {showDash,setShowDash,authStatus} = useDashContext()
  const {isAuthenticated,user}=authStatus
  const router = useRouter()
  
  if(!isAuthenticated || isAuthenticated === false || !user){
   return router.push('/auth/login')
  }

  return (
    <section className="dash-container">
      
       <ul className={`nav-list ${showDash ? 'mobile-dash':''}  `}>
        <div className="username">
        <h1>{user.username}</h1>
      </div>
          <li className="navitem" onClick={()=>{setContent("Profile");setShowDash(!showDash)}}>Profile</li>
          <li className="navitem" onClick={()=>{setContent("Messages");setShowDash(!showDash)}}>Messages</li>
          <li className="navitem" onClick={()=>{setContent("Settings");setShowDash(!showDash)}}>Settings</li>
          <li className="navitem" onClick={()=>{setContent("Help");setShowDash(!showDash)}}>Help</li>
          <li className="navitem" onClick={()=>{setContent("Logout");setShowDash(!showDash)}}>Logout</li>
          </ul>
        
     <div className="dash-content">
      {content === 'Profile' && <Profile user={user}/>}
      {content === 'Messages' && <Messages/>}
      {content === 'Settings' && <Settings/>}
      {content === 'Help' && <Help/>}
      {content === 'Logout' && <Logout/>}
     </div>
    </section>
    )
}
export default Dashboard