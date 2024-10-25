'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useContextUser } from '../hooks/Context'
import Messages from '../dashboard/messages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faMessage,faUser } from '@fortawesome/free-solid-svg-icons'

const StudentsList = ({setContent}) => {
const [students,setStudents]=useState([])
const {userData} = useContextUser()
const [student_id,setStudentId] = useState(null)
const [chatStatus,setChatStatus]= useState(null)
const [showChats,setShowChats] = useState(false)
const [receiver,setReceiver]=useState(null)
//function to fetch students
    useEffect(()=>{
        const fetchStudents = async()=>{
            try {
                const response = await fetch(`https://varsitysteps-server.onrender.com/user/mystudents`,{
                    credentials:'include'
                })
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    setStudents(data)
                }else{
                    console.log('cant get students');
                    
                }
            } catch (error) {
                console.error(error)
            }
          
        }
fetchStudents()
    },[])

    //fuction to check status
    useEffect(()=>{
        const checkChatStatus = async()=>{
             try {
                const response = await fetch(`https://varsitysteps-server.onrender.com/messages/chats?user1=${userData.id}&user2=${student_id}`,{
                    credentials:'include'
                })
                if(response){
                    const data = await response.json()
                    setChatStatus(data)
                    console.log('chats status in student list page', data);
                    
                }else{
                    console.log('cant check status')
                }
            } catch (error) {
                console.error(error)
            }
        } 
        if(student_id){
            checkChatStatus()
        }      
    },[student_id])

  return (
    <section className="people-list">
        <h3><FontAwesomeIcon icon={faArrowLeft} className='back' onClick={()=>{setContent('Profile')}}/> My Students</h3>
        <div className='people'>
            {students.length > 0?students.map((student)=>{
                return   <div className='person' key={student.user_id}>
                    <Link href= {`/studentprofile/${student.user_id}`}>
                    <div className="person-name">
                    <div className="person-image">
                            {student.profile_image?<Image alt='person-image' src={student.profile_image} width={50} height={50}/>: <FontAwesomeIcon className='person-icon' icon={faUser}/>}
                            
                        </div>
                        <p>{student.username}</p>
                    </div>
                    </Link>
                    
                       
                        <div className="actions">
                            <button onClick={()=>{setStudentId(student.user_id),setShowChats(true),setReceiver(student)}}>Message</button>
                        </div>
                    </div>
            }): <p>No students yet</p>}
        </div>
        {showChats &&  <Messages setShowChats={setShowChats} chatStatus={chatStatus} receiver={receiver}/>} 
    </section>
  )
}

export default StudentsList