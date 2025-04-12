'use client'
import React,{useEffect,useState} from 'react'
import { useParams } from 'next/navigation'
import Navbar from '../../../Navbar'
import '../../../etutoring.css'
import '../../mystudents.css'
import Link from 'next/link'
import LiveLesson from '../../../../components/livelesson/LiveLesson'
import StudentSubmissions from '../../../Files/StudentSubmissions'
import Files from '../../../Files/Files'
import Image from 'next/image'
import '../../mystudents.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faEnvelope, faFolder, faFolderOpen, faStream, faVideo, faWarning } from '@fortawesome/free-solid-svg-icons'
import RateTutor from './RateTutor'

const Student = () => {
    const {user_id} = useParams()
    const [content,setContent]=useState("dashboard")
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(false)
    const role = localStorage.getItem('role')
    let url

    if(role=='tutor'){
      url=`/api/user/studentprofile/${user_id}`
    }else{
      url=`/api/tutors/tutorprofile/${user_id}`
    }
    
    useEffect(()=>{
      const fetchUser = async()=>{
        setLoading(true)
        try {
          const response =  await fetch(url)
          if(response.ok){
            const data =  await response.json()
            setUser(data) 
          }
        } catch (error) {
          console.error(error)
        }finally{
          setLoading(false)
        }
      }
      fetchUser()
    },[user_id])
   
    const lastActive = (timestamp)=>{
      const now = new Date();
      const lastActive = new Date(timestamp);
      const diffMs = now - lastActive;
    
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
    
      if (diffSecs < 60) {
        return `Last active ${diffSecs} second${diffSecs !== 1 ? 's' : ''} ago`;
      } else if (diffMins < 60) {
        return `Last active ${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
      } else if (diffHours < 24) {
        return `Last active ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      } else if (diffDays < 7) {
        return `Last active ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      } else {
        return `Last active on ${lastActive.toLocaleDateString()}`;
      }
    }

  return (
    <section className='etutoring'>
        <Navbar/>
        {loading ? <div className='btn-loader'></div>:
        <>
        {user && <div className="student-info">
          <div className="users user-page">
          <div className="profile-image">
                            {user?.profile_image?<Image alt='person-image' src={user.profile_image} width={50} height={50}/>: <div className='initials'>{user.username.slice(0,1)}</div>}
                        </div>
          <div className="users-name">
          <h4>{user?user.username:'loading'} </h4>
          <small>{user.is_online? <>Active now <FontAwesomeIcon icon={faCircle} color='#4af24a'/></>: `${lastActive(user.last_active)}`}</small>
          </div>
          </div>
          
        </div>}
        {role == 'student' && <button className="rate-tutor-btn" onClick={()=>setContent('rate')}>Rate tutor</button>}
          
      
        <div className='rendered-content'>
        {content === "dashboard"  && 
        <>
        
        <div className="dashboard-grid">
          {/* Quick Access Links */}
          <div className="dashboard-card">
          <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faEnvelope}/></span>
            <p className='dash-title'>Messages</p>
            </div>
            <p className='dash-desc'>Chat with your {role=='tutor'?'student':'tutor'} using our chat system.</p>
            {user && <Link href={`/messages?receiver_id=${user.id}`}><button className="dash-btn">Open Chat</button></Link>}
            
          </div>

          <div className="dashboard-card">
          <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faVideo}/></span>
            <p className='dash-title'>Video Call</p>
          </div>
            <p className='dash-desc'>{role=='tutor'?"Start a live video calling session with your student for real-time teaching":"Join a live video call session with tutor for realtime learning."} </p>
            <button className="dash-btn" onClick={()=>setContent('livelesson')}>Start Video Call</button>
          </div>

          <div className="dashboard-card">
            <div className="dash-cardheader">
              <span className="dash-icon"><FontAwesomeIcon icon={faFolderOpen}/></span>
              <p className='dash-title'>Files and resources</p>
            </div>
            
            <p className='dash-desc'>{role =='tutor'?'Share files and resources such as notes and assignments for your student to access.':'Access, view and download files such as note, resources or assignments shared by your tutor'}</p>
            <button className="dash-btn" onClick={()=>setContent('files')}>{role == 'tutor'?'Upload files':'View Files'}</button>
          </div>

          {/* Upcoming Lessons */}
          <div className="dashboard-card">
          <div className="dash-cardheader">
              <span className="dash-icon"><FontAwesomeIcon icon={faFolderOpen}/></span>
              <p className='dash-title'>{role=='tutor'?'Student Submissions':"My Submissions"}</p>
            </div>
            <p className='dash-desc'>{role=='tutor'?"View assignments and tasks sent by your student":"Manage your submisssions such as homework or assignments you send to your tutor"}</p>
            <button className="dash-btn" onClick={()=>setContent('submissions')}>{role=='tutor'?'Student Submissions':"My Submissions"}</button>
          </div>
          
        </div>
        {/* <button><FontAwesomeIcon icon={faWarning}/> Disconnect</button> */}
        </> }
       
        {content === 'livelesson' && <LiveLesson receiver={user_id} setContent={setContent} user={user}/>}
        {content === 'files' && <Files setContent={setContent} user_id={user_id}/>}
        {content === 'submissions' && <StudentSubmissions setContent={setContent} user_id={user_id}/>}
        {content === 'rate' && <RateTutor setContent={setContent} user={user}/>}
        
        </div>
        </>
        }
        
        

         
    </section>
  )
}

export default Student