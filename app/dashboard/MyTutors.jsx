'use client'
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useContextUser } from '../hooks/Context'
import Messages from './messages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons'


const MyTutors = ({myTutors,setContent}) => {
  const [receiver,setReceiver]=useState(null)
  const [tutor_id,setTutorId] = useState(null)
  const {userData} = useContextUser()
  const [chatStatus,setChatStatus]= useState(null)
  const [showChats,setShowChats] = useState(false)
    // console.log(myTutors)

    //fuction to check status
    useEffect(()=>{
      const checkChatStatus = async()=>{
           try {
              const response = await fetch(`http://10.1.10.89:3000/messages/chats?user1=${userData.id}&user2=${tutor_id}`,{
                  credentials:'include'
              })
              if(response){
                  const data = await response.json()
                  setChatStatus(data)    
              }else{
                  console.log('cant check status')
              }
          } catch (error) {
              console.error(error)
          }
      } 
      if(tutor_id){
          checkChatStatus()
      }      
  },[tutor_id])




  return (
    <section className="people-list">
     <h3><FontAwesomeIcon icon={faArrowLeft} className='back' onClick={()=>{setContent('Profile')}}/> My Tutors</h3>
    <div className='people'>
        {myTutors.map((tutor)=>{
            return   <div className='person' key={tutor.user_id}>
                    <div className="person-image">
                       {tutor.profile_image ? <Image alt='person-image' src={tutor.profile_image} width={150} height={200}/> : <FontAwesomeIcon className='person-icon' icon={faUser}/>} 
                    </div>
                    <p>{tutor.username}</p>
                    <div className="actions">
                        <button onClick={()=>{setTutorId(tutor.user_id),setShowChats(true),setReceiver(tutor)}}>Message</button>
                        <button><Link href= {`/tutoring/tutorprofile/${tutor.user_id}`}>View Profile</Link></button>
                    </div>
                </div>
        })}
    </div>
    {showChats &&  <Messages setShowChats={setShowChats} chatStatus={chatStatus} receiver={receiver}/>} 
</section>
  )
}

export default MyTutors