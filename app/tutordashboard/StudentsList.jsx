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
const [chatStatuses, setChatStatuses] = useState({})
const [receiver,setReceiver]=useState(null)
//function to fetch students
    useEffect(()=>{
        const fetchStudents = async()=>{
            try {
                const response = await fetch(`http://localhost:3000/user/mystudents`,{
                    credentials:'include'
                })
                if(response.ok){
                    const data = await response.json()
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

// Function to check chat status for each student 
useEffect(() => {
  const checkChatStatuses = async () => {
    try {
      // Create an array of promises for each student's chat status check
      const studentPromises = students.map(async (student) => {
        const response = await fetch(
          `http://localhost:3000/messages/checkchats?user1=${userData.id}&user2=${student.user_id}`,
          { credentials: 'include' }
        );

        if (response.ok) {
          const data = await response.json();
          return { [student.user_id]: data }; // Return object with student ID as key
        } else {
          console.log('Failed to check chat status for student', student.user_id);
          return { [student.user_id]: null }; // Handle errors gracefully
        }
      });

      // Wait for all promises to resolve and merge into a single object
      const resolvedStatuses = await Promise.all(studentPromises);
      setChatStatuses(Object.assign({}, ...resolvedStatuses)); // Merge statuses into one object
    } catch (error) {
      console.error(error);
    }
  };

  // Check only when students change
  if (students.length > 0) {
    checkChatStatuses();
  }
}, [students, userData.id]);





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
                            <button onClick={()=>{
                              setStudentId(student.user_id),
                              setShowChats(true),
                              setReceiver(student),
                              setChatStatus(chatStatuses[student.user_id])
                              }}>Message</button>
                              
                        </div>
                    </div>
            }): <p>No students yet</p>}
        </div>
        {showChats &&  <Messages setShowChats={setShowChats} chatStatus={chatStatus} receiver={receiver}/>} 
    </section>
  )
}

export default StudentsList







// useEffect(() => {
//   const checkChatStatuses = async () => {
//     try {
//       const studentPromises = students.map(async (student) => {
//         const response = await fetch(
//           `http://localhost:3000/messages/chats?user1=<span class="math-inline">\{userData\.id\}&user2\=</span>{student.user_id}`,
//           { credentials: 'include' }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           return { [student.user_id]: data }; // Return object with student ID as key
//         } else {
//           console.log('Failed to check chat status for student', student.user_id);
//           return { [student.user_id]: null }; // Handle errors gracefully (e.g., set null)
//         }
//       });

//       const resolvedStatuses = await Promise.all(studentPromises); // Wait for all promises to resolve
//       setChatStatuses(Object.assign({}, ...resolvedStatuses)); // Merge individual statuses into single object
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Check only when students change (avoid unnecessary re-renders)
//   if (students.length > 0) {
//     checkChatStatuses();
//   }
// }, [students]);