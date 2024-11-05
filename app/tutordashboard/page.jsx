'use client'
import React, {useState,useEffect } from 'react';
import '../dashboard/dashboadcss/dash.css'
import { useContextUser} from '../hooks/Context';
import { useRouter } from 'next/navigation';
import Help from '../dashboard/help'
import Messages from '../dashboard/messages';
import TutorProfile from './TutorProfile';
import DeleteAccount from '../dashboard/DeleteAccount';
import PasswordSettings from '../dashboard/PasswordSettings';
import Requests from './Requests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretUp,faEnvelope,faLink,faLock,faPeopleGroup,faSignOut,faUser,faWarning,faClose} from '@fortawesome/free-solid-svg-icons';
import StudentsList from './StudentsList';

const TutorDashboard = ()=>{
    const {userData,isAuthenticated,loading,showDash, setShowDash,tutoringData} = useContextUser()
    const[content,setContent]=useState("Profile")
    const router = useRouter()
    const [showLogoutOptions,setShowLogoutOptions] = useState(false)
    const [showChats,setShowChats] = useState(false)
    const [requests,setRequests] = useState([])
   
    
    //checking authentication status
    useEffect(() => {
      if (!isAuthenticated || !userData) {
        router.push('/auth/login');
      } else if (isAuthenticated && !userData.role_name.includes('tutor')) {
        router.push('/dashboard');
      }
    }, [isAuthenticated, userData, loading, router]);
  

  
  let user
  if(userData.role_name.includes('tutor') && userData.role_name.includes('student')){
    user = {...userData,...tutoringData}
  }else{
    user = userData
  }

  
    useEffect(()=>{
      const fetchRequests = async()=>{
      const userId = userData.id
        try {
            const response = await fetch(`https://early-flowers-shave.loca.lt/api/requests/${userId}`,{
                credentials:'include'
            })
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setRequests(data)

            }else{
                console.log("No data could be fetched")
            }
            
        } catch (error) {
            console.log(error.message)
        }

    }
    if(isAuthenticated && userData){

      fetchRequests()
    }
},[userData,isAuthenticated])

if (!isAuthenticated || !userData) {
  return null; 
}

if(loading){
  return <div>...loading</div>
 }
const logout = async()=>{
  try {
   const response = await fetch(`https://early-flowers-shave.loca.lt/auth/logout`,{
    method:'POST',
    credentials:'include'
   })
    if(response.ok){
      window.location.href='/'
    }else{
      console.log('cant log out');
      
    }
  } catch (error) {
    console.error(error)
  }
   }

    return <section className='dash-container'>
    
       <ul className={`nav-list ${showDash ? 'mobile-dash':''}  `}>
        <div className="username">
        <h1>{userData.username}</h1>
        <FontAwesomeIcon icon={faClose} className='close-dashlinks' onClick={()=>setShowDash(!showDash)}/>
      </div>
          <li className="navitem" onClick={()=>{setContent("Profile");setShowDash(!showDash);setShowChats(false)}}><FontAwesomeIcon icon={faUser}/> Profile</li>
          <li className="navitem" onClick={()=>{setContent("Password");setShowDash(!showDash);setShowChats(false)}}><FontAwesomeIcon icon={faLock}/>  Change Password</li>
          <li className="navitem" onClick={()=>{setShowChats(true),setShowDash(!showDash)}}><FontAwesomeIcon icon={faEnvelope}/> Messages</li>
          <li className="navitem" onClick={()=>{setContent("Students");setShowDash(!showDash);setShowChats(false)}}><FontAwesomeIcon icon={faPeopleGroup}/> My Students</li>
          <li className="navitem" onClick={()=>{setContent("Requests");setShowDash(!showDash);setShowChats(false)}}><FontAwesomeIcon icon={faLink}/> Connection Requests <span>{requests.length?requests.length:0}</span></li>

          <div className="logout navitem">
            <p onClick={()=>setShowLogoutOptions(!showLogoutOptions)}><FontAwesomeIcon icon={faSignOut}/> Logout {showLogoutOptions?<FontAwesomeIcon icon={faCaretUp}/>:<FontAwesomeIcon icon={faCaretDown}/>}</p>
            {showLogoutOptions && <div className="logout-options">
              <button className="logout-yes" onClick={logout}>Yes</button>
              <button className="logout-cancel" onClick={()=>setShowLogoutOptions(false)}>Cancel</button>
            </div> }
          </div>
          <li className="navitem delete-account" onClick={()=>{setContent("Delete");setShowDash(!showDash)}}><FontAwesomeIcon icon={faWarning}/> Delete Account</li>
          </ul>
        
     <div className="dash-content">
      {content === 'Profile' && <TutorProfile user={user}/>}
      {content === 'Password' && <PasswordSettings userData={userData} setContent={setContent}/>}
      {/* {content === 'Messages' && <Messages userData={userData} newChat={newChat} receiver_id={0}/>} */}
      {content === 'Students' && <StudentsList setContent={setContent}/>}
      {content === 'Requests' && <Requests requests={requests} setContent={setContent}/>}
      {content === 'Delete' && <DeleteAccount/>}
     </div>
      {showChats && <Messages userData={userData} setShowChats={setShowChats} />}
</section>

}

export default TutorDashboard