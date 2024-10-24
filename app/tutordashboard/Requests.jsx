'use client'
import React,{useEffect,useState} from 'react'
import { useContextUser } from '../hooks/Context'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Requests = ({requests,setContent}) => {
    const {userData}=useContextUser()
    // data from server is conncetions array, i used requests variable namesto check requests to connect
    
  
    const status= 'connected'

    const requestResponse =async(requestId)=>{
        console.log(status)
        console.log(requestId)
        try {
          const response = await  fetch(`http://10.1.10.89:3000/api/connectionresponse/${requestId}`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({status }),
            credentials: 'include',
          })
          if(response.ok){
            setContent('Students')
            
          }else{
            console.log('response not sent successfully')
          }
        } catch (error) {
          console.error(error)
        } 
       }
  return (
    <section className="requests">
        <h3><FontAwesomeIcon icon={faArrowLeft} className='back' onClick={()=>{setContent('Profile')}}/> Requests</h3>
        <ul> 
            {requests.length > 0?requests.map((request,index)=>{
                return <li key={index}> <p><Link target='_blank' href= {`/studentprofile/${request.student_id}`}>{request.username}</Link> requested your services</p>
                <div className="options">
                <button onClick={()=>{requestResponse(request.connection_id)}}>Accept</button>
                </div></li>
            }):<p>No requests yet</p>}
            
        </ul>

    </section>
  )
}

export default Requests