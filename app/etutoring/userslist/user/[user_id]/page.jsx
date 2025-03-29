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
import { faCircle } from '@fortawesome/free-solid-svg-icons'

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
   
if(loading){
  return <p>...loading</p>
}

  return (
    <section className='etutoring'>
        <Navbar/>
        {user && <div className="student-info">
          <div className="users">
          <div className="profile-image">
                            {user?.profile_image?<Image alt='person-image' src={user.profile_image} width={50} height={50}/>: <div className='initials'>{user.username.slice(0,1)}</div>}
                        </div>
          <div className="users-name">
          <h3>{user?user.username:'loading'} </h3>
          {/* <small> Active 5 mins ago</small> */}
          {/* <FontAwesomeIcon icon={faCircle} color='grey'/> */}
          </div>
          </div>
          
        </div>}
        
        <div className='rendered-content'>
        {content === "dashboard"  && <div className="dashboard-grid">
          {/* Quick Access Links */}
          <div className="dashboard-card">
            <h3>Message</h3>
            <p>Chat with your {role=='tutor'?'student':'tutor'} using our chat system.</p>
            {user && <button><Link href={`/messages?receiver_id=${user.id}`}>Open Chat</Link></button>}
            
          </div>

          <div className="dashboard-card">
            <h3>Start Live Lesson</h3>
            <p>{role=='tutor'?"Start a live video calling session with your student for real-time teaching":"Join a live video call session with tutor for realtime learning."} </p>
            <button onClick={()=>setContent('livelesson')}>Start Live Lessons</button>
          </div>

          <div className="dashboard-card">
            <h3>Files and resources</h3>
            <p> {role =='tutor'?'Share files and resources such as notes and assignments for your student to access.':'Access, view and download files such as note, resources or assignments shared by your tutor'}</p>
            <button onClick={()=>setContent('files')}>{role == 'tutor'?'Upload files':'View Files'}</button>
          </div>

          {/* Upcoming Lessons */}
          <div className="dashboard-card">
            <h3>{role=='tutor'?'Student Submissions':"My Submissions"}</h3> 
            <p>{role=='tutor'?"View assignments and tasks sent by your student":"Manage your submisssions such as homework or assignments you send to your tutor"}</p>
            <button onClick={()=>setContent('submissions')}>View submissions</button>
          </div>
        </div> }
        {content === 'livelesson' && <LiveLesson receiver={user_id} setContent={setContent} user={user}/>}
        {content === 'files' && <Files setContent={setContent} user_id={user_id}/>}
        {content === 'submissions' && <StudentSubmissions setContent={setContent} user_id={user_id}/>}

        </div>
        

         
    </section>
  )
}

export default Student