'use client'
import { faPlusCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState,useEffect} from 'react'


const AddStudent = ({students,setContent,class_id}) => {

    const addStudent = async(student_id)=>{
        try {
            const response = await fetch(`/testing/tutors/addstudent`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({class_id, student_id }),
                credentials:'include'
            })
            if(response.ok){
                alert('student added')
            }
        } catch (error) {
            console.log(error);
            alert('error adding students')
        }
    }

  return (
    <div className='addstudents'>
        <h4> <FontAwesomeIcon icon={faArrowCircleLeft} onClick={()=>setContent('dashboard')}/> Add students to the class</h4>
       {students.length > 0 ?
       <>
        {students.map((student)=>{
         return <div className="addstudent" key={student.user_id}>
            <h4>{student.username}</h4>
            <button onClick={()=>addStudent(student.user_id)}>Add student <FontAwesomeIcon icon={faPlusCircle}/></button>
        </div>
        })}
        {/* <div className="addstudent" >
            <h4>Kenny</h4>
            <button>Add student <FontAwesomeIcon icon={faPlusCircle}/></button>
        </div> */}
       </>
       :<p>You do not have any students yet</p>}
        
    
        
    </div>
  )
}

export default AddStudent