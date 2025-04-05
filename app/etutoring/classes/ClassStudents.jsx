'use client'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import '../userslist/mystudents.css'
import '../../globals.css'
import Image from 'next/image'

const ClassStudents = ({setContent,classStudents,classid,setClassStudent}) => {
const [showModal,setShowModal]=useState(false)
const [loading,setLoading]=useState(false)
const [student_id,setStudent_id]=useState(null)
const role = localStorage.getItem('role')
// console.log(classid,student_id);

const removeStudent =async ()=>{
  setLoading(true)
  try {
    const response = await fetch(`/api/tutors/remove-student?class_id=${classid}&student_id=${student_id}`,{
      method:'DELETE',
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
    }
    })
    if(response.ok){
      setClassStudent(classStudents.filter((student)=>student.student_id !== student_id ))
      setShowModal(false)
      setStudent_id(null)
    }
  } catch (error) {
    console.log(error);
    
  }finally{
    setLoading(false)
  }

}


  return (
    <div className='students-inclass'>
        <h4 className='addstudents-header'><FontAwesomeIcon icon={faArrowCircleLeft} onClick={()=>setContent('dashboard')}/> Students in this class</h4>
        {classStudents.length>0 ? classStudents.map((student)=>{
          return <div className="users class-students" key={student.student_id}>
            <div className='classstudent-user'>
            <div className="profile-image">
                            {student?.profile_image?<Image alt='person-image' src={student.profile_image} width={50} height={50}/>: <div className='initials'>{student.username.slice(0,1).toUpperCase()}</div>}
                        </div>
          <h4>{student?student.username:'loading'}</h4>
            </div>
            {role=='tutor'?<div className="student-action" onClick={()=>{setShowModal(true),setStudent_id(student.student_id)}}>
            remove
          </div>:''}
          
          </div>
        }):<p>You don't have any students in this class</p>}
        
        {showModal && <div className='overlay'>
          <div className='removestudentmodal'>
          <p>Are you sure you want to remove this student</p>
          <div className="remove-options">
            {loading?<div className='btn-loader'></div>: 
            <>
            <button onClick={()=>setShowModal(false)}>no</button>
            <button onClick={()=>removeStudent()}>yes</button>
            </>}
            
          </div>
        </div></div>}
        
    </div>
  )
}

export default ClassStudents