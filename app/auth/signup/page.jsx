'use client'
import React,{useEffect,useState} from 'react'
import '../../globals.css'
import '../form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle,faClose} from '@fortawesome/free-solid-svg-icons'
// import { faGoogle,faApple} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { useSession,signIn } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter()
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setconfirmPassword]=useState('')
  const [email,setEmail]=useState('')
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [showPassword, setShowPassord] = useState(false)
  const [loading,setLoading]=useState(false)
  const role ='student'
  // const { data: session, status } = useSession();

  const signUp= async(e)=>{
    setLoading(true)
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowMessage(true)
      setMessage('Passwords do not match');
      return;
    }
    try {
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
        console.log('sign up successful')
        setLoading(false)
      } else {
        setShowMessage(true)
        setMessage(data.message || 'Signup failed');
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setShowMessage(true)
      setMessage('Signup failed');
      console.error(error)
    }
   
  }


 
  return (
    
    <section className="signup form-page">
  <div className="sign-up-form">
      <h1>Sign Up</h1>
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
        {loading?<div className='loading'>...loading</div>:<button type="submit">Sign Up</button>}
      </form>
      <div className="redirect">
        <p><Link href="/auth/tutorsignup">Sign Up for a Tutor Account</Link></p>
        <p>Already have an Account? <span><Link href="/auth/login">Login</Link></span></p>
        <p className="policylink">By signing up you accept our <span><Link href="">policy, terms & conditions</Link></span></p>
      </div>
      {showMessage && <div className='authmessage'>
        <FontAwesomeIcon icon={faInfoCircle}/>
        <p>{message}</p>
        <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}
      </div>
    </section>
  )
}

export default Signup