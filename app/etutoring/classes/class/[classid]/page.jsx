'use client'
import React,{useState,useEffect, use} from 'react'
import '../../../etutoring.css'
import '../../classes.css'
import Navbar from '../../../Navbar'
import Link from 'next/link'
import Files from '../../../Files/Files'
import StudentSubmissions from '../../../Files/StudentSubmissions'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFolderOpen, faPen, faPlusCircle, faTrashCan, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons'
import AddStudent from '../../AddStudent'
import ClassStudents from '../../ClassStudents'
import EditClass from './EditClass'
import { useRouter } from 'next/navigation'
import LiveLesson from '../../../../components/livelesson/LiveLesson'
// import GroupLiveLesson from '../../../../components/livelesson/groupCalls'

const Class = () => {
    const [content,setContent]=useState("dashboard")
    const [classStudents,setClassStudent]=useState(null)
    const [students,setStudents]=useState(null)
    const [classDetails,setClassDetails]=useState(null)
    const [editClass,setEditClass]=useState(false)
    const {classid}=useParams()
    const role = localStorage.getItem('role')
    const router = useRouter()

    useEffect(()=>{
      fetchClass()
      if(role =='tutor') fetchUsers()
    },[])
   
    const fetchClass = async ()=>{
      try {
        const response =  await fetch(`/api/tutors/classdetails/${classid}`,{
          credentials:'include',
        })
        if(response.ok){
          const data =  await response.json()
          console.log(data);
          setClassDetails(data.classDetails[0])
          setClassStudent(data.classStudents)
        }else if(response.status == 401){
          router.back()
        }
      } catch (error) {
        alert('error gettig class')
      }
    }

    const fetchUsers = async()=>{
        try {
            const response =  await fetch(`/api/user/mystudents`,{
                credentials:'include'
            })
            if(response.ok){
                const data =  await response.json()
                setStudents(data)
                
            }else{
                console.log('cant get user');
                
            }
        } catch (error) {
            console.error(error)
        }
      }
  
    const deleteClass = async()=>{
      try {
        const response = await fetch(`http://localhost:3000/tutors/deleteclass${classid}`,{
          method:'DELETE',
          credentials:'include'
        })
      if(response.ok){
        console.log('class deleted');
        
      }
      } catch (error) { 
        console.error(error)
      }
    }

  return (
   <section className='etutoring'>
    <Navbar/>
    <h3>{role=='tutor'?'Manage':'View'} {classDetails?classDetails.name:''}</h3>
    {role =="tutor" && <div className="class-actions">
        <button className="class-action" onClick={()=>{setEditClass(true)}}>
            Edit details <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="class-action" onClick={()=>setContent('addstudent')}>
            Add Student <FontAwesomeIcon icon={faPlusCircle}/>
        </button>
        <button className="class-action delete">
            Delete class <FontAwesomeIcon icon={faTrashCan}/>
        </button>     
    </div>}
    
    {editClass &&<EditClass classDetails={classDetails} setClassDetails={setClassDetails} setEditClass={setEditClass}/> }
    
    <div className='rendered-content'>
        {content === "dashboard"  && 
        <>
         {classDetails ? <div className="dashboard-grid">
          {/* Quick Access Links */}
          <div className="dashboard-card">
          <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faEnvelope}/></span>
            <p className='dash-title'>Messages</p>
            </div>
            <p className='dash-desc'>{role =='tutor' ?"A group chat was automatically generated when you created this class, allowing you to communicate with your students through our chat system.":
            "Open the group chat for this class to participate in discussions and conversations."}</p>
             <Link href={`/messages`}><button className="dash-btn">Open Group Chats</button></Link>
          </div>

          <div className="dashboard-card">
          <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faUsers}/></span>
            <p className='dash-title'>Class students</p>
            </div>
            <p className='dash-desc'>{role == 'tutor'? "View and manage students you have added in this class":
            "View other students in this class."}</p>
             <button className="dash-btn" onClick={()=>setContent('classtudents')}>View Students</button>
          </div>

          <div className="dashboard-card">
          <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faVideo}/></span>
            <p className='dash-title'>{role == 'tutor'?'Start':'Join'} a Live Lesson</p>
          </div>
            <p className='dash-desc'>{role == 'tutor'?"Start a live video call with your class for real-time teaching, where multiple students can join.":
            "Join the live video call for real-time learning and interact with your class in the session."}</p>
            {/* <button className="dash-btn" onClick={()=>setContent('groupcall')}>{role == 'tutor'?'Start Group Call':'Join Video Call'}</button> */}
            <button className="dash-btn">Coming soon</button>
          </div>

          <div className="dashboard-card">
          <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faFolderOpen}/></span>
            <p className='dash-title'>Files and resources</p>
          </div>
            <p className='dash-desc'>{role == 'tutor'?"Share files and resources, including notes and assignments, for your students to access in this class.":
            "Access shared files and resources, including notes and assignments, for this class."}</p>
            
            <button className="dash-btn" onClick={()=>setContent('files')}>{role=='tutor'?'Upload Files':'View Files'}</button>
          </div>

          {/* Upcoming Lessons */}
          <div className="dashboard-card">
          <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faFolderOpen}/></span>
            <p className='dash-title'>{role=='tutor'?'Student Submissions':'My Submissions'}</p>
          </div>
            <p className='dash-desc'>{role =='tutor'?"View assignments and tasks submitted by your students in this class for review and feedback.":
            "Submit files such as homework or assignments to the class. Your files are only visible to the tutor and yourself."}</p>
            
            <button className="dash-btn" onClick={()=>setContent('submissions')}>View submissions</button>
          </div>
        </div> :<div className='btn-loader'></div>}
        
        </>
        
        }
        {content === 'livelesson' && <LiveLesson/>}
        {/* {content === 'groupcall' && <GroupLiveLesson/>} */}
        {content === 'files' && <Files setContent={setContent} flag={'classfiles'} classid={classid}/>}
        {content === 'submissions' && <StudentSubmissions setContent={setContent} classid={classid} flag="class"/>}
        {content === 'classtudents' && <ClassStudents setContent={setContent} classStudents={classStudents} classid={classid} setClassStudent={setClassStudent} classDetails={classDetails}/>}
        {content === 'addstudent' && <AddStudent setContent={setContent} students={students} class_id={classid} classStudents={classStudents} classDetails={classDetails}/>}

        

        </div>
        
   </section>

  )
}

export default Class