// 'use client'
// import React,{useState,useEffect} from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useContextUser } from '../hooks/Context'
// import Messages from './messages'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowLeft, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons'


// const MyTutors = ({myTutors,setContent}) => {
//   const [receiver,setReceiver]=useState(null)
//   const [tutor_id,setTutorId] = useState(null)
//   const {userData} = useContextUser()
//   const [chatStatus,setChatStatus]= useState(null)
//   const [showChats,setShowChats] = useState(false)
//   const [chatStatuses, setChatStatuses] = useState({})
//     // console.log(myTutors) 

//     //fuction to check status
//   // Function to check chat status for each student 
// useEffect(() => {
//     const checkChatStatuses = async () => {
//       try {
//         // Create an array of promises for each student's chat status check
//         const studentPromises = myTutors.map(async (student) => {
//           const response =  await fetch(
//             `http:localhost:3000/messages/checkchats?user1=${userData.id}&user2=${student.user_id}`,
//             { credentials: 'include' }
//           );
  
//           if (response.ok) {
//             const data =  await response.json();
//             return { [student.user_id]: data }; // Return object with student ID as key
//           } else {
//             console.log('Failed to check chat status for student', student.user_id);
//             return { [student.user_id]: null }; // Handle errors gracefully
//           }
//         });
  
//         // Wait for all promises to resolve and merge into a single object
//         const resolvedStatuses =  await Promise.all(studentPromises);
//         setChatStatuses(Object.assign({}, ...resolvedStatuses)); // Merge statuses into one object
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     // Check only when students change
//     if (myTutors.length > 0) {
//       checkChatStatuses();
//     }
//   }, [myTutors]);
  

//   return (
//     <section className="people-list">
//      <h3><FontAwesomeIcon icon={faArrowLeft} className='back' onClick={()=>{setContent('Profile')}}/> My Tutors</h3>
//     <div className='people'>
//         {myTutors.map((tutor)=>{
//             return   <div className='person' key={tutor.user_id}>
//                 <Link href= {`/tutoring/tutorprofile/${tutor.user_id}`}>
//                 <div className="person-name">
//                 <div className="person-image">
//                        {tutor.profile_image ? <Image alt='person-image' src={tutor.profile_image} width={150} height={200}/> : <FontAwesomeIcon className='person-icon' icon={faUser}/>} 
//                     </div>
//                     <p>{tutor.username}</p>
//                     </div>
//                 </Link>
//                     <div className="actions">
//                         <button onClick={()=>{setTutorId(tutor.user_id),
//                             setShowChats(true),
//                             setReceiver(tutor),
//                             setChatStatus(chatStatuses[tutor.user_id])
//                             }}>Message</button>
//                     </div>
//                 </div>
//         })}
//     </div>
//     {showChats &&  <Messages setShowChats={setShowChats} chatStatus={chatStatus} receiver={receiver}/>} 
// </section>
//   )
// }

// export default MyTutors