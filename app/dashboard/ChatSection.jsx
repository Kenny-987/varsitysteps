'use client'
import { faArrowCircleLeft, faImage, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState,useEffect,useRef} from 'react'
import { useSocket } from '../hooks/SocketContext'

const ChatSection = ({chat_id,user_id,currentChat,setCurrentChat}) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('');
  const messageEndRef = useRef(null);
  const textareaRef = useRef(null);
  const socket =useSocket()

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 

    // If content height exceeds max height, limit it
    if (textarea.scrollHeight > 200) {
      textarea.style.overflowY = 'scroll'; 
    } else {
      textarea.style.overflowY = 'hidden'; 
    }
  }, [message]);


//getting reciver id
let receiver_id
if(currentChat.user_1==user_id){
  receiver_id = currentChat.user_2
}else{
  receiver_id=currentChat.user_1
}


//function to send message
    const handleSendMessage = async() => {
      const timestamp = new Date(); 
        if (message.trim()) {
          const chatMessage ={
            sender_id:user_id,
            receiver_id,
            timestamp,
            chat_id:currentChat.chat_id,
            message
          }
          await socket.emit('chatMessage',chatMessage)
          setMessage('');
        }
      };


      //function to fetch messages
      useEffect(()=>{
        const fetchMessages = async()=>{
          try {
            const response = await fetch(`/api/messages/conversation/${chat_id}`,{
              credentials:'include'
            })
            if (response.ok){
              const data = await response.json()
              setMessages(data)
              setTimeout(scrollToBottom, 100);
            }else{
              console.log('could not fetch messages');
            }
          } catch (error) {
            console.error(error)
          }
        }
        fetchMessages()
      },[chat_id])

      const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
        // Join room when the user connects
        socket.emit('joinRoom', user_id);
      
      }, [socket,user_id]);
      useEffect(()=>{
        const handleIncomingMessage = (data) => {
          if (data.chat_id === chat_id) {
            setMessages((prevMessages) => [...prevMessages, data]);
          }
        };
      
        socket.on('chatMessage', handleIncomingMessage);
              return () => {
          socket.off('chatMessage', handleIncomingMessage);
        };
      },[chat_id])

useEffect(() => {
  scrollToBottom();
}, [messages]);


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



  return (<>
   <div className="chat-header">
    <h3><FontAwesomeIcon icon={faArrowCircleLeft} className='back-arrow' onClick={()=>setCurrentChat(null)}/> {currentChat.person_2}</h3>
  </div>
  {/* chat content */}

  <div className="message-container">
    {messages.map((message,index)=>{
         return <p key={index} className={`message ${message.sender_id == user_id ? 'inbound':'outbound'}`}> {message.message}
         <span>{formatDate(message.timestamp)}</span></p>
    })}

    <div ref={messageEndRef} />
      </div> 
       <div className="chat-input">
        <textarea
        ref={textareaRef}
        rows='1'
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="file-options">
        {/* <button onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperclip}/></button>
        <button onClick={handleSendMessage}><FontAwesomeIcon icon={faImage}/></button> */}
        <button className='sendbtn' onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane}/></button>
        </div>
      </div>
  </>
   
  )
}

export default ChatSection

