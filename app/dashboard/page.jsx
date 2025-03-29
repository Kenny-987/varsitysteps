'use client'
import React, {useState,useEffect} from 'react'
import './dashboadcss/dash.css'
import Profile from './profile';
import PasswordSettings from './PasswordSettings';
import DeleteAccount from './DeleteAccount';
import { useContextUser } from '../hooks/Context';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretUp, faChalkboardTeacher, faEnvelope, faLock, faSignOut, faUser, faWarning,faClose, faGamepad} from '@fortawesome/free-solid-svg-icons';
// import MyTutors from './MyTutors';
import Link from 'next/link';

const Dashboard = () => {
  const[content,setContent]=useState("Profile")
  const {userData,isAuthenticated,loading, showDash, setShowDash} = useContextUser()
  const [isEffectCompleted, setIsEffectCompleted] = useState(false);
  const router = useRouter()
  const [showLogoutOptions,setShowLogoutOptions] = useState(false)
  const [myTutors,setMyTutors] = useState([])



   useEffect(() => {
      console.log('useffect runnng')
      if (!isAuthenticated || !userData) {
        router.push('/auth/login');
      } else if (isAuthenticated && !userData.role_name.includes('student')) {
        router.push('/tutordashboard');
      }else{
        localStorage.setItem('role','student')
        setIsEffectCompleted(true)
      }
      
    }, [isAuthenticated,  loading, router, userData]);

 

 const logout = async()=>{
try {
 const response =  await fetch(`/api/auth/logout`,{
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



if(loading){
  return <div className='page-loader'></div>
 }

 if (!isAuthenticated || !userData) {
  return null; 
}

 
// console.log(myTutors)
  return (
    <section className="dash-container">
      
       <ul className={`nav-list ${showDash ? 'mobile-dash':''}  `}>
        <div className="username">
        <h1>{userData?.username}</h1>
        <FontAwesomeIcon icon={faClose} className='close-dashlinks' onClick={()=>setShowDash(!showDash)}/>
      </div>
          <li className="navitem" onClick={()=>{setContent("Profile");setShowDash(!showDash)}}><FontAwesomeIcon icon={faUser}/> Profile</li>
          {/* <li className="navitem"><Link href='/learning-center'><FontAwesomeIcon icon={faChalkboardTeacher}/> Lesson Center</Link></li> */}
          <li className="navitem"><Link href='/etutoring'><FontAwesomeIcon icon={faChalkboardTeacher}/> eTutoring</Link></li>

          <li className="navitem" onClick={()=>{setContent("Password");setShowDash(!showDash)}}><FontAwesomeIcon icon={faLock}/> Change Password</li>

          {/* {myTutors.length > 0 && <li className="navitem" onClick={()=>{setContent('Tutors'),setShowDash(!showDash)}}> <FontAwesomeIcon icon={faChalkboardTeacher}/> My Tutors</li>} */}
          <li className="navitem"><Link href='/myarena'><FontAwesomeIcon icon={faGamepad}/> My Arena</Link> </li> 
          <div className="logout navitem">
            <p onClick={()=>setShowLogoutOptions(!showLogoutOptions)}><FontAwesomeIcon icon={faSignOut} /> Logout {showLogoutOptions?<FontAwesomeIcon icon={faCaretUp}/>:<FontAwesomeIcon icon={faCaretDown}/>}</p>

            {showLogoutOptions && <div className="logout-options">
              <button className="logout-yes" onClick={logout}>Yes</button>
              <button className="logout-cancel" onClick={()=>setShowLogoutOptions(false)}>Cancel</button>
            </div> }
            
          </div>
          <li className="navitem delete-account-link" onClick={()=>{setContent("Delete");setShowDash(!showDash)}}><FontAwesomeIcon icon={faWarning}/> Delete Account</li>
          </ul>
        
     <div className="dash-content">
      {isEffectCompleted && content === 'Profile' && userData && <Profile userData={userData} />}
      {content === 'Password' && <PasswordSettings userData={userData} setContent={setContent}/>}
      {content === 'Delete' && <DeleteAccount/>}
     </div>
    </section>
    )
}
export default Dashboard