"use client"
import React ,{useState,useEffect,useRef}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft,faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useContextUser } from '../hooks/Context'
import { useSocket } from '../hooks/SocketContext'
import { useRouter} from "next/navigation";


const ChatPage = ({setOpenChats,chat_id,currentChat,formatedDate,fetchChats}) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('');
  const {userData}=useContextUser()
  const socket =useSocket()
  const user_id = userData.id
  const conversationRef = useRef(null);
  const router = useRouter();
  


  const handleSendMessage = async() => {
    
    const sent_at = new Date(); 
      if (message.trim()) {
        const chatMessage ={
          sender_id:user_id,
          receiver_id:currentChat.recipient_id,
          chat_id,
          message,
          sent_at,
          sender_name:userData.username,
          is_group: currentChat.is_group
        }
        await socket.emit(currentChat.is_group ? 'groupMessage' : 'chatMessage', chatMessage);
        setMessage('');
      }
    };


    useEffect(() => {
      if (conversationRef.current) {
        conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
      }
    }, [messages]);
  
 
  useEffect(()=>{
    const fetchMessages = async()=>{
      try {
        const response = await fetch(`/api/messages/conversation/${chat_id}`,{
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
    socket.emit(currentChat.is_group ? 'joinGroup' : 'joinRoom', chat_id);
  }, [socket, chat_id, currentChat.is_group]);

  useEffect(()=>{
    const handleIncomingMessage = (data) => {
      if (data.chat_id === chat_id) {
        setMessages((prevMessages) => [...prevMessages, data]);
        console.log(data);
        
        fetchChats()
      }
    };
    if(currentChat.is_group){
      socket.on('groupMessage',handleIncomingMessage)
      console.log('its a group');
      
    }else{

      socket.on('chatMessage', handleIncomingMessage);
    }
          return () => {
      socket.off('chatMessage', handleIncomingMessage);
      socket.off('groupMessage', handleIncomingMessage);
    };
  },[chat_id])
console.log(messages);

  const ClearSearchParams = () => {
    const currentPath = window.location.pathname; // Get current path without query params
    router.replace(currentPath, { scroll: false }); // Update the URL without reload
  }; 
  console.log(currentChat);
  if(!currentChat){
    return <p>..loading</p>
  }
  return (
    <>
    <div className="chat-header">
      <div className="chat-name">
      <FontAwesomeIcon icon={faArrowCircleLeft} className='back-arrow' onClick={()=>{setOpenChats(false);
      ClearSearchParams()
      }}/>
      <div className="chat-image">
        {currentChat.recipient_profile_image?<Image src={currentChat.recipient_profile_image} alt='image' width={30} height={30}/>:<div className='placeholder-img'>{currentChat.recipient_name?currentChat.recipient_name.slice(0,1):currentChat.group_name.slice(0,1)}</div>}
        
      </div>
    <h4>{currentChat.recipient_name||currentChat.group_name}<span className='last-active'>
    Active: 2 mins ago
      </span></h4>
      </div>
  </div>
  
  {/* chat conversations */}
  <div className="conversation" ref={conversationRef}>
 {messages.length > 0 ?messages.map((message,index)=>{
         return <p key={index} className={`message ${message.sender_id == user_id ? 'inbound':'outbound'}`}> 
         {currentChat.is_group && <span>{message.sender_name}</span>}
         {message.message}
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
