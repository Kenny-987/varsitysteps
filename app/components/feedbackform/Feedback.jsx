'use client'
import React, { useState } from 'react'
import './feedback.css'
import { useContextUser } from '../../hooks/Context'

const Feedback = () => {
  const [loading,setLoading] = useState(false)
  const [message,setMessage]=useState('')
  const [name,setName]=useState('')
  const [feedback,setFeedback]=useState('')
  const [showmessage,setShowmessage] = useState(false)
  const {setShowAchPopup,setGlobalAchievement}=useContextUser()

  

  const sendFeedback=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`/testing/feedback/send`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({name,feedback})
      })
      if(response.ok){
        const data = await response.json();
        if(data.length>0){
            setGlobalAchievement(data)
        setShowAchPopup(true)
        }

        setMessage('Feedback sent! Thank you')
        setShowmessage(true)
       setTimeout(()=>{
        setShowmessage(false)
       },3000)

      }else{
        setMessage('Error sending feedback')
        setShowmessage(true)
       setTimeout(()=>{
        setShowmessage(false)
       },3000)
      }
    } catch (error) {
      setMessage('Error sending feedback')
        setShowmessage(true)
       setTimeout(()=>{
        setShowmessage(false)
       },3000)
      console.error(error)
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className='feedback'>
      <h3>Feedback</h3>
      <p>Your feedback is vital to the growth of VarsitySteps</p>
      <form onSubmit={sendFeedback}>
        <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input type="text" 
        id='name'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        />
        </div>
        <textarea name="" id=""
        placeholder='Report bugs, issues or Share your thoughts and ideas on how we can improve VarsitySteps'
        required
        value={feedback}
        onChange={(e)=>{setFeedback(e.target.value)}}
        />
        {loading?<div className='btn-loader'></div>:<button type="submit">Submit</button>}
        {showmessage && <p className='message'>{message}</p> }
      </form>
    </div> 
  )
}

export default Feedback