'use client'
import React, {useState,useEffect } from 'react';
import '../dashboard/dashboadcss/dash.css'
import { useContextUser} from '../hooks/Context';
import { useRouter } from 'next/navigation';
import TutorProfile from './TutorProfile';
import DeleteAccount from '../dashboard/DeleteAccount';
import PasswordSettings from '../dashboard/PasswordSettings';
import Requests from './Requests'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretUp,faLink,faLock,faSignOut,faUser,faWarning,faClose, faGamepad, faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSocket } from '../hooks/SocketContext';

const TutorDashboard = ()=>{
    const {userData,isAuthenticated,showDash, setShowDash,tutoringData,seteTutoringRole} = useContextUser()
    const[content,setContent]=useState("Profile")
    const router = useRouter()
    const [showLogoutOptions,setShowLogoutOptions] = useState(false)
    const [requests,setRequests] = useState([])
    const socket = useSocket()
    
    //checking authentication status
    useEffect(() => {
      if (!isAuthenticated || !userData) {
        router.push('/auth/login');
      } else if (isAuthenticated && !userData.role_name.includes('tutor')) {
        router.push('/dashboard');
      }else{
        localStorage.setItem('role','tutor')
      }
    }, [isAuthenticated, userData,  router]);
  


  
  let user
  if(userData.role_name.includes('tutor') && userData.role_name.includes('student')){
    user = {...userData,...tutoringData}
  }else{
    user = userData
  }

  const fetchRequests = async()=>{
    const userId = userData.id
      try {
          const response =  await fetch(`/api/requests/${userId}`,{
              credentials:'include'
          })
          if(response.ok){
              const data =  await response.json()
              setRequests(data)

          }else{
              console.log("No data could be fetched")
          }
          
      } catch (error) {
          console.log(error.message)
      }

  } 
    useEffect(()=>{
    if(isAuthenticated && userData){
      fetchRequests()
    }
},[userData,isAuthenticated])

useEffect(()=>{
  if(socket){
    socket.on('requests',(data)=>{
      fetchRequests()
    })
  }
},[])

if (!isAuthenticated || !userData) {
  return null; 
}

// if(loading){
//   return <div>...loading</div>
//  }
const logout = async()=>{
  try {
   const response =  await fetch(`/api/3000/auth/logout`,{
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
          <li className="navitem" onClick={()=>{setContent("Profile");setShowDash(!showDash)}}><FontAwesomeIcon icon={faUser}/> Profile</li>
          <li className="navitem" onClick={()=>{setContent("Password");setShowDash(!showDash)}}><FontAwesomeIcon icon={faLock}/>  Change Password</li>
        
          <li className="navitem"><Link href='/etutoring'><FontAwesomeIcon icon={faChalkboardTeacher}/> eTutoring</Link></li>
          <li className="navitem" onClick={()=>{setContent("Requests");setShowDash(!showDash)}}><FontAwesomeIcon icon={faLink}/> Connection Requests <span>{requests.length?requests.length:0}</span></li>
          <li className="navitem"><Link href='/myarena'><FontAwesomeIcon icon={faGamepad}/> My Arena</Link></li>
          <div className="logout navitem">
            <p onClick={()=>setShowLogoutOptions(!showLogoutOptions)}><FontAwesomeIcon icon={faSignOut}/> Logout {showLogoutOptions?<FontAwesomeIcon icon={faCaretUp}/>:<FontAwesomeIcon icon={faCaretDown}/>}</p>
            {showLogoutOptions && <div className="logout-options">
              <button className="logout-yes" onClick={logout}>Yes</button>
              <button className="logout-cancel" onClick={()=>setShowLogoutOptions(false)}>Cancel</button>
            </div> }
          </div>
          <li className="navitem delete-account-link" onClick={()=>{setContent("Delete");setShowDash(!showDash)}}><FontAwesomeIcon icon={faWarning}/> Delete Account</li>
          </ul>
        
     <div className="dash-content">
      {content === 'Profile' && <TutorProfile user={user}/>}
      {content === 'Password' && <PasswordSettings userData={userData} setContent={setContent}/>}
      {content === 'Requests' && <Requests requests={requests} setRequests={setRequests} setContent={setContent}/>}
      {content === 'Delete' && <DeleteAccount/>}
     </div>
</section>

}

export default TutorDashboard