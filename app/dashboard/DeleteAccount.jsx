'use client'
import React, {useState} from 'react'
import './dashboadcss/edit.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle,faClose } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

const DeleteAccount = () => {
  const [showPassword, setShowPassord] = useState(false)
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message,setMessage] = useState('')
  const router = useRouter()

  const deleteAccount = async()=>{
    if(password.trim()==''){
      setMessage('Please enter your password')
      return setShowMessage(true)
    }
    setLoading(true)
    try {
      const response =  await fetch('http://localhost:3000/auth/delete-account',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password }),
        credentials:'include'
      })
      if(response.ok){
        console.log('account deleted');
        window.location.href = '/auth/login'
      }else{
        const  errMsg =  await response.json()
        setShowMessage(true)
        setLoading(false)
        setMessage(errMsg.message)
      }
    } catch (error) {
      setLoading(false)
      setShowMessage(true)
      console.error(error)
      setMessage('Server error')
    }
  }

  return (
    <div className='delete-account'>
      <div className='edit-profile-content'>
      <div className="warning-text">
      <h3>Delete your Account</h3>
      <p>We're sorry to see you go. Deleting your account is permanent and cannot be undone. All your data will be lost. If you have any concerns or need assistance, please reach out to our support team before making this decision.</p>
      <p>If you're sure please confirm below</p>
      </div>

      <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input 
          type={showPassword ?'text':'password'}
          id="Password" 
          name="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)} 
           />
           <div className="showpassword">
          <input type="checkbox" name="showpassword" id="showpassword" onClick={()=>setShowPassord(!showPassword)} />
            <label htmlFor="showpassword">Show Password</label>
            </div>
        </div>

        
        {loading?<div className='btn-loader'></div>:<button onClick={deleteAccount}>Delete</button>}
      {showMessage && <div className='authmessage'>
        <FontAwesomeIcon icon={faInfoCircle}/>
        <p>{message}</p>
        <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}
      </div>
      
    </div>

  )
}

export default DeleteAccount