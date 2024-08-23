'use client'
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {
    const [username,setUsername]=useState('')
    const [phone,setPhone]=useState('')
    const [email,setEmail]=useState('')
    const [programme,setProgramme]=useState('')
    const [college,setCollege]=useState('')
    const [duration,setDuration]=useState('')
    const [bio,setBio]=useState('')

  return (
    <div className='edit-profile'>
        <h3>Edit Your Profile</h3>
        <form onSubmit={signUp}>
      <div className="form-group">
          <label htmlFor="name">Fullname</label>
          <input 
          type="name" 
          id="name" 
          name="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
          type="email" 
          id="email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type='phone'
           id="phone" 
           name="phone"
           value={phone}
          onChange={(e) => setPhone(e.target.value)} 
            />
        </div>
        
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditProfile