'use client'
import React, {useState, useEffect}  from 'react'
import { useParams } from "next/navigation"
import '../../globals.css'
import './userprofile.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faLocationDot, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons'

const StudentProfile = () => {
    const {studentID} = useParams()
    const [student,setStudent] = useState({})
    console.log(studentID)
    console.log(student)
    useEffect(()=>{
        const fetchStudent = async ()=>{
            try {
                const response  = await fetch(`http://10.1.10.89:3000/user/studentprofile/${studentID}`)
                const data = await response.json()
                if (response.ok){
                    console.log('this is user profile: ',data)
                    setStudent(data)
                }else{
                    console.log('error fetching profile')
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchStudent()
    },[])

  return (
    <section className="profile">
        <div className="image">
            {student.profile_image?<Image alt="profile image" src={student.profile_image} width={200} height={200}/>:<div className="icons">
          <FontAwesomeIcon onClick={()=>setEditImage(true)} className="icon" icon={faUser}/>
        </div> }
        </div>
        <div className="details">
        <div className="user-detail name">
                <h3>{student.username?student.username:'..loading'}</h3>
            </div>
            <div className="user-detail">
            <p>Location:</p>
                <p><FontAwesomeIcon icon={faLocationDot}/> {student.location?student.location:'unkown'}</p>
            </div>
            <div className="user-detail">
                <p>Institution:</p>
                <p><FontAwesomeIcon icon={faUniversity}/> {student.institution?student.institution:'unkown'}</p>
            </div>
            <div className="user-detail">
                <p>Programme:</p>
                <p><FontAwesomeIcon icon={faBook}/> {student.programme?student.programme:'unkown'}</p>
            </div>
        </div>
    </section>
  )
}

export default StudentProfile