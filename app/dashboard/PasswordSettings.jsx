import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import './dashboadcss/edit.css'


const PasswordSettings = ({userData,setContent}) => {
const [currentPassword,setCurrentPassword] = useState('')
const [newPassword,setNewPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [loading,setLoading]=useState('')
const [message, setMessage] = useState('')
const [showMessage, setShowMessage] = useState(false)
const [showPassword, setShowPassord] = useState(false)
const userId = userData.id

    const changePassword = async(e)=>{
        e.preventDefault();
        setLoading(true);
        if(currentPassword.trim()=='' && newPassword.trim()=='' && confirmPassword.trim()==""){
          setShowMessage(true)
          setMessage('Fields cannot be empty');
        }
        if (newPassword !== confirmPassword) {
          setShowMessage(true)
          setMessage('Passwords do not match');
          return;
        }
        try {
            const response = await fetch(`https://varsitysteps-server.onrender.com/user/update/password/${userId}`,{
                method:'PUT',
                headers: {
                'Content-Type': 'application/json',
             },
            body: JSON.stringify({currentPassword,newPassword}),
            credentials: 'include'
            })
            if(response.ok){
                console.log('password changed')
                setLoading(false);
            }else{
                const message = await response.json()
                console.log("could not change password")
                setShowMessage(true)
                setMessage(message.message)
                setLoading(false);
            }
        } catch (error) {
            setMessage('Error Changing Password')
            setShowMessage(true)
            console.error(error)
            setLoading(false);
        }
        
    }

  return (
    <div className='edit-password'>
      <div className="edit-password-content">
      <form onSubmit={changePassword}>
        <h3>Change Your Password <FontAwesomeIcon onClick={()=>setContent('Profile')} icon={faClose}/></h3>
      <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input 
          type={showPassword ?'text':'password'}
          id="currentPassword" 
          name="currentPassword"
          value={currentPassword}
          required
          onChange={(e) => setCurrentPassword(e.target.value)} 
           />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input 
          type={showPassword ?'text':'password'}
          id="newPassword" 
          name="newPassword" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
           />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input 
          type={showPassword ?'text':'password'}
          id="confirmPassword" 
          name="confirmPassword" 
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
           />
        </div>
        <div className="showpassword">
          <input type="checkbox" name="showpassword" id="showpassword" onClick={()=>setShowPassord(!showPassword)} />
            <label htmlFor="showpassword">Show Password</label>
            </div>
        {loading?<div className='btn-loader'></div>:<div>
          <button type="submit">Save</button>
          {/* <button>Cancel</button> */}
          </div>}
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

export default PasswordSettings