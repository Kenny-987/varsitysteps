"use client"
import React ,{useState,useEffect,useRef}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft,faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useContextUser } from '../hooks/Context'
import { useSocket } from '../hooks/SocketContext'


const ChatPage = ({setOpenChats,chat_id,currentChat,formatedDate,fetchChats}) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('');
  const {userData}=useContextUser()
  const socket =useSocket()
  const user_id = userData.id
  const messageEndRef = useRef(null);

  const handleSendMessage = async() => {
    const sent_at = new Date(); 
      if (message.trim()) {
        const chatMessage ={
          sender_id:user_id,
          receiver_id:currentChat.recipient_id,
          chat_id,
          message,
          sent_at
        }
        await socket.emit('chatMessage',chatMessage)
        setMessage('');
      }
    };

    
 
  useEffect(()=>{
    const fetchMessages = async()=>{
      try {
        const response = await fetch(`/testing/messages/conversation/${chat_id}`,{
          credentials:'include'
        })
        if (response.ok){
          const data = await response.json()
          setMessages(data)
       
        }else{
          console.log('could not fetch messages');
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchMessages()
  },[chat_id])

  useEffect(() => {
    socket.emit('joinRoom', chat_id);
  }, [socket,chat_id]);

  useEffect(()=>{
    const handleIncomingMessage = (data) => {
      if (data.chat_id === chat_id) {
        setMessages((prevMessages) => [...prevMessages, data]);
        fetchChats()
      }
    };
    socket.on('chatMessage', handleIncomingMessage);
          return () => {
      socket.off('chatMessage', handleIncomingMessage);
    };
  },[chat_id])

  
  return (
    <>
    <div className="chat-header">
      <div className="chat-name">
      <FontAwesomeIcon icon={faArrowCircleLeft} className='back-arrow' onClick={()=>setOpenChats(false)}/>
      <div className="chat-image">
        {currentChat.recipient_profile_image?<Image src="/images/kenny.jpg" alt='image' width={30} height={30}/>:<div className='placeholder-img'>{currentChat.recipient_name.slice(0,1)}</div>}
        
      </div>
    <h4>{currentChat.recipient_name}<span className='last-active'>
    Active: 2 mins ago
      </span></h4>
      </div>
  </div>
  
  {/* chat conversations */}
  <div className="conversation">
 {messages.length > 0 ?messages.map((message,index)=>{
         return <p key={index} className={`message ${message.sender_id == user_id ? 'inbound':'outbound'}`}> {message.message}
         <span>{formatedDate(message.sent_at)}</span></p>
    }):"Send a message and get the converstion started"}

  </div>
  <div className="sendmessage">
        <textarea
        rows='1'
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="file-options">
        <button className='sendbtn'
         aria-label="Send Message"
         disabled={!message.trim()}
          onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane}/></button>
        </div>    
  </div>
  {/* <Link href='' className='sharefiles'>Click here to share files</Link> */}
  </>

  )
}

export default ChatPage
