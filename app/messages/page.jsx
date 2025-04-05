'use client'
import React,{useState,useEffect} from 'react'
import Navbar from '../etutoring/Navbar'
import '../etutoring/etutoring.css'
import Image from 'next/image'
import './messages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ChatPage from './ChatPage'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Messages = () => {
  const searchParams = useSearchParams();
const [chats,setChats]=useState([])
const [openChats,setOpenChats]=useState(false)
const [chat_id,setChat_id] =useState(null)
const [currentChat,setCurrentChat]=useState(null)
const router =useRouter()
const receiver_id = searchParams.get('receiver_id')
const [loading,setLoading]=useState(false)

const fetchChats = async ()=>{
  setLoading(true)
  try {
    const response = await fetch(`/api/messages/chats`,{
      credentials:'include'
    })
    if(response.ok){
      const data = await response.json()
      const sortedChats = data.sort((a, b) => {
        const timeA = new Date(a.last_message_time).getTime();
        const timeB = new Date(b.last_message_time).getTime();
        return timeB - timeA; 
      });
      setChats(sortedChats);
      }
  } catch (error) {
    console.error(error)
  }finally{
    setLoading(false)
  }
}
useEffect(() => {
  fetchChats();
}, []);


useEffect(() => {
    if (receiver_id) {
      const chat = chats.find((chat) => chat.recipient_id == receiver_id);
      if (chat) {
        setChat_id(chat.chat_id);
        setCurrentChat(chat);
        setOpenChats(true);
      }
  }
}, [chats]);


    const formatedDate = (timestamp) => {
      const date = new Date(timestamp);
      const now = new Date();
    
      const midnight= new Date();
      midnight.setHours(0, 0, 0, 0);
      midnight.setDate(midnight.getDate() - 1);
    
      if (date.toDateString() === now.toDateString()) {
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } else if (date >= midnight && date < now) {
        return `Yesterday ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } else {
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
      }
    };


  return (
    <section className=' etutoring'>
        <Navbar/>
        <div className='messages-page'>
        <h3><FontAwesomeIcon icon={faArrowLeft} onClick={()=>{router.back()}}/> Messages</h3>
    <div className="messages-div">
    {loading?<div className='btn-loader'></div>:
    <>
        {/* div shows chats allowing user to select one to view full messages */}
        {chats.length > 0 ? 
        <div className="messages-overview">
          {chats.map((chat,index)=>{
            return <div key={index} className="chat-profile"  onClick={()=>{setChat_id(chat.chat_id);setCurrentChat(chat);setOpenChats(true)}}>
            <div className="chat-image">
              {chat.recipient_profile_image?<Image src={chat.recipient_profile_image} alt='image' width={50} height={50}/>:
              <div className='placeholder-img'>{chat.recipient_name?chat.recipient_name.slice(0,1):chat.group_name.slice(0,1)}</div>}
            
            </div>
            <div className="chat-name-text">
              <h4>{chat.recipient_name?chat.recipient_name:chat.group_name}</h4> 
            <div className="text-overview">
              <span>{chat.is_group?<small>{chat.sender_name}</small>:''} {chat.last_message?chat.last_message:'Click here and start a conversation'}</span>
              </div>
              </div>
              <div className="chat-date">
                <p>{chat.last_message_time?formatedDate(chat.last_message_time):''}</p>
              </div>
        </div>
          })} 
            
        </div>:<div className='no-chats'>
          <Image alt='empty' src="/images/Empty-amico.svg" width={250} height={250}/>
          <p><FontAwesomeIcon icon={faInfoCircle}/> No chats yet</p>
          </div>}
        {/* div shows chats allowing user to select one to view full messages */}

  {/*this div renders chat content allowing users to exchange messages */}
  {chats.length > 0 && 
  <>
  {openChats ? <div className='chatpage'>
      <ChatPage setOpenChats={setOpenChats} chat_id={chat_id} currentChat={currentChat} formatedDate={formatedDate} fetchChats={fetchChats}/>
    </div>:<div className='clickchat'>
      <Image alt='click' src="/images/click.svg" width={100} height={100}/>
      <p>Click on a chat</p>
    </div> }
  </>}
    </>}
     </div>
     </div>
 
        
    </section>
  )
}

export default Messages