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
import { faPen, faPlusCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import AddStudent from '../../AddStudent'
import ClassStudents from '../../ClassStudents'

const Class = () => {
    const [content,setContent]=useState("dashboard")
    const [classStudents,setClassStudent]=useState(null)
    const [students,setStudents]=useState(null)
    const [classDetails,setClassDetails]=useState(null)
    const {classid}=useParams()
    const role = localStorage.getItem('role')

    useEffect(()=>{
      fetchClass()
      fetchUsers()
    },[])
   
    const fetchClass = async ()=>{
      try {
        const response =  await fetch(`http:localhost:3000/tutors/classdetails/${classid}`,{
          credentials:'include',
        })
        if(response.ok){
          const data =  await response.json()
          console.log(data);
          setClassDetails(data.classDetails[0])
          setClassStudent(data.classStudents)
        }
      } catch (error) {
        alert('error gettig class')
      }
    }

    const fetchUsers = async()=>{
        try {
            const response =  await fetch(`http:localhost:3000/user/mystudents`,{
                credentials:'include'
            })
            if(response.ok){
                const data =  await response.json()
                setStudents(data)
                console.log(data);
                
            }else{
                console.log('cant get user');
                
            }
        } catch (error) {
            console.error(error)
        }
      }
  
  
  return (
   <section className='etutoring'>
    <Navbar/>
    <h3>Manage {classDetails?classDetails.name:''}</h3>
    <div className="class-actions">
        <div className="class-action">
             Rename <FontAwesomeIcon icon={faPen}/>
        </div>
        <div className="class-action" onClick={()=>setContent('addstudent')}>
            Add Student <FontAwesomeIcon icon={faPlusCircle}/>
        </div>
        <div className="class-action delete">
            Delete class <FontAwesomeIcon icon={faTrashCan}/>
        </div>
        
    </div>

    <div className='rendered-content'>
        {content === "dashboard"  && 
        <>
         {classDetails ? <div className="dashboard-grid">
          {/* Quick Access Links */}
          <div className="dashboard-card">
            <h3>Message</h3>
            <p>A group chat was automatically created when you created this class, now you can chat with your students using our chat system.</p>
             <button>Open Group Chat</button>
          </div>

          <div className="dashboard-card">
            <h3>Class students</h3>
            <p>View and manage students you have added in this class</p>
             <button onClick={()=>setContent('classtudents')}>View Students</button>
          </div>

          <div className="dashboard-card">
            <h3>Start Live Lesson</h3>
            <p>Start a live video calling session with your class for realtime teaching. Several students can join</p>
            <button onClick={()=>setContent('livelesson')}>Start Live Lessons</button>
          </div>

          <div className="dashboard-card">
            <h3>Files and resources</h3>
            <p>Share files and resources such as notes and assignments for your students in this class to access.</p>
            <button onClick={()=>setContent('files')}>Upload files</button>
          </div>

          {/* Upcoming Lessons */}
          <div className="dashboard-card">
            <h3>Sudent Submissions</h3>
            <p>View assignments and tasks sent by your students</p>
            <button onClick={()=>setContent('submissions')}>View submissions</button>
          </div>
        </div> :'loading'}
        
        </>
        
        }
        {content === 'livelesson' && <LiveLesson/>}
        {content === 'files' && <Files setContent={setContent}/>}
        {content === 'submissions' && <StudentSubmissions setContent={setContent}/>}
        {content === 'classtudents' && <ClassStudents setContent={setContent} classStudents={classStudents}/>}
        {content === 'addstudent' && <AddStudent setContent={setContent} students={students} class_id={classid}/>}

        
        </div>
   </section>

  )
}

export default Class