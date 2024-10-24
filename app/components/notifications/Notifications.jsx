'use effect'
import React,{useState,useEffect} from 'react'
import './notifications.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useContextUser } from '../../hooks/Context'

const Notifications = ({setShowNotifications}) => {
const {notifications,setNotificationCount} = useContextUser()

const markAsRead = async(id)=>{
    console.log('click')
    try {
        const response = await fetch(`http://10.1.10.89:3000/api/markread`,{
            method:'PATCH',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({status:true,id})
        })
        if(response.ok){
            const result = await response.json()
            const unread = result.filter(notification=>notification.is_read==false)
            setNotificationCount(unread.length);
            console.log(result);
            
        }
    } catch (error) {
        console.error()
    }
}
console.log(notifications);

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