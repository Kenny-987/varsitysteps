'use client'
import React,{useState,useEffect} from 'react'
import './dashboadcss/messages.css'
import Image from 'next/image'
import ChatSection from './ChatSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useContextUser } from '../hooks/Context'
import { useSocket } from '../hooks/SocketContext'

const Messages = ({setShowChats,chatStatus,receiver}) => {
const [chats,setChats]=useState([])
const [showNewChat,setShowNewChat] = useState(true)
const [message,setMessage]=useState("")
const {userData}=useContextUser()
const user_id = userData.id
const [chat_id,setChat_id] =useState(null)
const [mobileChat,setMobileChat] = useState(false)
const [currentChat,setCurrentChat]=useState(null)

const socket = useSocket()

//function to fetch chats
useEffect(()=>{
const fetchChats = async ()=>{
const response = await fetch(`/api/messages/chats`,{
  credentials:'include'
})
if(response.ok){
  const data = await response.json()
  const sortedChats = data.sort((a, b) => {
    const timeA = new Date(a.last_message_time).getTime();
    const timeB = new Date(b.last_message_time).getTime();
    return timeB - timeA; // Newest first
  });
  setChats(sortedChats);
  // setCurrentChat(sortedChats[0])
  // setChat_id(sortedChats[0].chat_id)
  // console.log(currentChat);
  
  }
}
fetchChats()
},[])



const sendMessage = async()=>{
  let sender_id = user_id
  let receiver_id = receiver.user_id
  if(sender_id && receiver_id){
    try {
      if (message.trim()) {
        const chatMessage ={
          sender_id,
          receiver_id,
          message
        }
        socket.emit('chatMessage',chatMessage)
        setMessage('');
        setShowNewChat(false) 
        setShowChats(false)
      }
    } catch (error) {
      console.error(error)
    }
  } 
}


const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  // Check if the date is today
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Check if the date is yesterday
  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Format date components
  const day = String(date.getDate()).padStart(2, '0'); 
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (isToday) {
    // If today, return time
    return `${hours}:${minutes}`;
  } else if (isYesterday) {
    // If yesterday, return "yesterday"
    return 'Yesterday';
  } else {
    // Otherwise, return dd:mm
    return `${day} ${month}`;
  }
};


  return (
   <section className="messages-container">
    <h3>Messages <FontAwesomeIcon icon={faClose} onClick={()=>setShowChats(false)}/></h3>

    {/* -----------------------------------------------------------------
    ---this div pops when a new conversation or chat is starting---------
    -------------------------------------------------------------------- */}
    {chatStatus == false && showNewChat && <div className="new-chat-modal">
      <div className="chat-modal">
      <p className='heading'>New Chat <FontAwesomeIcon icon={faClose} onClick={()=>setShowNewChat(false)}/></p>
        <div className="chat-modal-header">
        <div className="chat-modal-header-image">
          {receiver.profile_image?<Image src={receiver.profile_image} alt='profile_image' width={50} height={50}/>: <FontAwesomeIcon className='user-icon' icon={faUser}/>}
          
        </div>
          <p>{receiver.username}</p>
        </div>
        <div className="message-field">
          <textarea type="text" 
          value={message}
          name="message" 
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Introduce your self and get started"/>
          <button onClick={sendMessage}>send</button>
        </div>
      </div>
    </div>}
     {/* -----------------------------------------------------------------
    ---this div pops when a new conversation or chat is starting---------
    -------------------------------------------------------------------- */}
       
       {chats.length > 0 ? 
        <div className="messages">
        {/* this div is a list of all inboxes */}
        <div className={`inbox-list ${currentChat ? 'hide':" "}`}>
          {/* this div is a single inbox container */}
          {chats.map((chat)=>{
            return <div key={chat.chat_id} className="inbox" onClick={()=>{setChat_id(chat.chat_id),setCurrentChat(chat)}}>
            <div className="inbox-image">
              {chat.profile_image?<Image src={chat.profile_image} alt='profile_image' width={60} height={60}/>:<FontAwesomeIcon className='user-icon' icon={faUser}/>}
              
            </div>
            <div className="inbox-details">
              <p className="name">{chat.person_2}</p>
              <p className='last-message'>{chat.last_message_content}</p>
            </div>
              <div className="inbox-date">{formatDate(chat.last_message_time)}</div>
          </div>
          })}
          
          {/* this is end of a single inbox container */}
        
        </div>

        {/* ------------------------------------------------------------------
        ----------------------chat page starts here--------------------------
        ---------------------------------------------------------------------- */}
        {chat_id &&currentChat && <div className={`chat-page ${currentChat ? 'mobilechat':''}`}>
         <ChatSection chat_id={chat_id} user_id={user_id} currentChat={currentChat} setCurrentChat={setCurrentChat} chats={chats} setChats={setChats}/>
        </div> }
        
      </div> : <p>No messages</p>}


   </section>
  )
}

export default Messages