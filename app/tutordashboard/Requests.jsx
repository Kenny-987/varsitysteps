'use client'
import React,{useEffect,useState} from 'react'
import { useContextUser } from '../hooks/Context'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Requests = ({setRequests,requests,setContent}) => {
    const {userData}=useContextUser()
    const [loading,setLoading]=useState(null)
    const [message,setMessage]=useState(null)
    // data from server is conncetions array, i used requests variable namesto check requests to connect
    console.log(requests);
    
  
    const status= 'connected'

    const requestResponse =async(requestId)=>{
      setLoading(requestId)
        try {
          const response =  await  fetch(`http://localhost:3000/api/connectionresponse/${requestId}`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({status }),
            credentials: 'include',
          })
          if(response.ok){
            setRequests((prevRequests)=>prevRequests.filter(request => request.connection_id !== requestId))
            setMessage('Connection request accepted')
            setTimeout(() => {
                setMessage('');
              }, 3000);
            console.log('accepted');
            
          }else{
            console.log('response not sent successfully')
          }
        } catch (error) {
          console.error(error)
        }finally{
          setLoading(null)
        }
       }
  return (
    <section className="requests">
        <h3><FontAwesomeIcon icon={faArrowLeft} className='back' onClick={()=>{setContent('Profile')}}/> Requests</h3>
        {message&& <p className='success-message'>{message}</p>}
        <ul> 
            {requests.length > 0?requests.map((request,index)=>{
                return <li key={index}> <p><Link target='_blank' href= {`/studentprofile/${request.student_id}`}>{request.username}</Link> requested your services</p>
                <div className="options">
                  {loading == request.connection_id? <div className='btn-loader'></div> : <button disabled={loading==null?false:true} className='accept-request' onClick={()=>{requestResponse(request.connection_id)}}>Accept</button>}
                
                </div></li>
            }):<p>No requests yet</p>}
        </ul>
        <Link href='/etutoring' className='linkdiv'>
          <button>Click here to open your eTutoring to manage students you have connected with.</button>
        </Link>
    </section>
  )
}

export default Requests