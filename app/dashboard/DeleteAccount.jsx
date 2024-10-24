'use client'
import React, {useState} from 'react'
import './dashboadcss/edit.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle,faClose } from '@fortawesome/free-solid-svg-icons'


const DeleteAccount = () => {
  const [showPassword, setShowPassord] = useState(false)
  const [password,setPassword]=useState()
  const [loading,setLoading]=useState('')
  const [showMessage, setShowMessage] = useState(false)


  return (
    <div className='delete-account'>
      <div className='edit-profile-content'>
      <div className="warning-text">
      <h3>Delete your Account</h3>
      <p>We're sorry to see you go. Deleting your account is permanent and cannot be undone. All your data will be lost. If you have any concerns or need assistance, please reach out to our support team before making this decision.</p>
      <p>If you're sure please confirm below</p>
      </div>

      <form >
      <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input 
          type={showPassword ?'text':'password'}
          id="Password" 
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
           />
        </div>

        <div className="showpassword">
          <input type="checkbox" name="showpassword" id="showpassword" onClick={()=>setShowPassord(!showPassword)} />
            <label htmlFor="showpassword">Show Password</label>
            </div>
        {loading?<div className='loading'>...loading</div>:<button type="submit" style={{backgroundColor: 'red'}}>Delete</button>}
      </form>
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