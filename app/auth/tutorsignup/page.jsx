'use client'
import React,{useState} from 'react'
import '../../globals.css';
import '../form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faGoogle,faApple} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Tutorsignup = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setconfirmPassword]=useState('')
  const [email,setEmail]=useState('')
  const [message, setMessage] = useState('message')
  const [showMessage, setShowMessage] = useState(false)
  const [showPassword, setShowPassord] = useState(false)
  const router = useRouter()
  const role ='tutor'

  const signUp= async(e)=>{
    e.preventDefault();

    if (password !== confirmPassword) {
      setShowMessage(true)
      setMessage('Passwords do not match');
      return;
    }
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, role, password }),
      credentials: 'include', 
    });
    const data = await response.json();

    if (response.ok) {
      router.push('/dashboard')
    } else {
      setShowMessage(true)
      setMessage(data.message || 'Signup failed');
    }
  }


      return (
        <section className="signup form-page">
            <div className="tutor-info">
                <div className="info">
                    <h1>Join our team of tutors and set your own rates for helping students succeed.</h1>
                    <p>Build your profile to showcase your tutoring expertise and attract clients. <span>It's Free</span></p>
                    <p>All negotiations and agreements are directly between you and your students. VarsitySteps serves solely as a platform and is not responsible for any issues that arise..</p>
                    <p></p>
                </div>
            <div className="sign-up-form tutors">
          <h1>Sign Up</h1>
          <p>Be a Tutor</p>
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
          required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type={showPassword ?'text':'password'}
           id="password" 
           name="password"
           value={password}
          onChange={(e) => setPassword(e.target.value)} 
           required />
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input type={showPassword ?'text':'password'}
           id="confimpassword"
           name="confirmpassword" 
           value={confirmPassword}
           onChange={(e) => setconfirmPassword(e.target.value)}
           required />
        </div>
        <div className="showpassword">
          <input type="checkbox" name="showpassword" id="showpassword" onClick={()=>setShowPassord(!showPassword)} />
          <label htmlFor="showpassword">Show Password</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
          <div className="redirect">
            <p><Link href="/auth/signup">Sign up for Regular Account</Link></p>
            <p>Already have an Account? <span><Link href="/auth/login">Login</Link></span></p>
            <p className="policylink">By signing up you accept our <span><Link href="">policy, terms & conditions</Link></span></p>
          </div>
          {showMessage && <div className='authmessage'>
        <FontAwesomeIcon icon={faInfoCircle}/>
        <p>{message}</p>
        <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}
          </div>
            </div>
    
        </section>
      )
}

export default Tutorsignup