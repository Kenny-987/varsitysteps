'use effect'
import React,{useState,useEffect} from 'react'
import './notifications.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useContextUser } from '../../hooks/Context'

const Notifications = ({setShowNotifications}) => {
const {notifications,setNotificationCount} = useContextUser()

useEffect(()=>{
    const markAsRead = async()=>{
        console.log('click')
        try {
            const response = await fetch(`https://early-flowers-shave.loca.lt/api/markread`,{
                method:'PATCH',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify({status:true})
            })
            if(response.ok){
            console.log('ok');
            setNotificationCount(0)
            }
        } catch (error) {
            console.error()
        }
    }
    markAsRead()
},[])

console.log('mounted');

  return (
    <div className='notifications'>
    <h3>Notifications <FontAwesomeIcon onClick={()=>setShowNotifications(false)} icon={faClose}/></h3>
    <div className="notification-div">
    {notifications.length>0 ?notifications.map((noty,index)=>{
        return <div key={index} className='notification'>
            <p>{noty.message}</p>
            {/* {noty.is_read?"":<button onClick={()=>markAsRead(noty.id)} >mark as read</button>} */}
        </div>
    }):<p>Notifications will show up here</p>}
    </div>
    </div>
  )
}

export default Notifications