'use client'
import { faPlusCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState,useEffect} from 'react'
import { useContextUser } from '../../hooks/Context'

const AddStudent = ({students,classStudents,setContent,class_id,classDetails}) => {
    const [studentsToAdd,setStudentToAdd]=useState([])//this will contain students that are not in th class
    const [loading,setLoading]=useState(null)
    const [message,setMessage]=useState(null)
    const {userData}=useContextUser()

    const notInClass = students.filter(student =>
        !classStudents.some(classStudent => classStudent.student_id === student.user_id)
    );

    useEffect(()=>{
        setStudentToAdd(notInClass)
    },[])
  
     
    const addStudent = async(student_id)=>{
        setLoading(student_id)
        try {
            const response =  await fetch(`/api/tutors/addstudent`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({class_id, student_id,tutorName:userData.username,className:classDetails.name }),
                credentials:'include'
            })
            if(response.ok){
                setStudentToAdd((prevStudents) => prevStudents.filter(student => student.user_id !== student_id));
                console.log(studentsToAdd);
                
                setMessage('student added')
                setTimeout(() => {
                    setMessage('');
                  }, 3000);
            }
        } catch (error) {
            console.log(error);
            alert('error adding students')
        }finally{
            setLoading(null)
        }
    }

  return (
    <div className='addstudents'>
        <h4 className='addstudents-header'> <FontAwesomeIcon icon={faArrowCircleLeft} onClick={()=>setContent('dashboard')}/> Add students to the class</h4>
        {message&& <p className='students-message'>{message}</p>}
       {studentsToAdd.length > 0 ?
       <>
        {studentsToAdd.map((student)=>{
         return <div className="addstudent" key={student.user_id}>
            <h4>{student.username}</h4>
            {loading === student.user_id ? (
          <div className="btn-loader"></div> 
        ) : (
          <button disabled={loading==null?false:true} onClick={() => addStudent(student.user_id)}>
            Add student <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        )}
            
        </div>
        })}
       </>
       :<p>Either you have added all your students or you do not have any students to add</p>}   
    </div>
  )
}

export default AddStudent