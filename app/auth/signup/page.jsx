'use client'
import React,{useEffect,useState} from 'react'
import '../../globals.css'
import '../form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle,faClose} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContextUser } from '../../hooks/Context';

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
  const {isAuthenticated,setIsAuthenticated}=useContextUser()
 
  useEffect(()=>{
    if(isAuthenticated){
      return router.push('/dashboard')
    }
  },[])

  if(isAuthenticated){
    return null;
  }
  
  const signUp= async(e)=>{
    setLoading(true)
    e.preventDefault();
    if(username.trim()===""){
      setShowMessage(true)
      setLoading(false)
      setMessage('Enter valid name');
      return;
    }
   
    if (password !== confirmPassword) {
      setShowMessage(true)
      setLoading(false)
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('https://early-flowers-shave.loca.lt/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, role, password }),
        credentials: 'include', 
      });
      
      if (response.ok) {
        const roles = await response.json();
        
        setIsAuthenticated(true)
        setLoading(false)
        if(roles.includes('student')){
          window.location.href='/dashboard'
        }else if(roles.includes('tutor')){
           window.location.href='/tutordashboard'
        }else if(roles.includes('student') && roles.includes('tutor')){
          window.location.href='/dashboard'
        }
      } else {
        setLoading(false)
        const errMsg = await response.json()
        setShowMessage(true)
        setMessage(errMsg.message ||'Signup failed');
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
      <p><Link href="/auth/tutorsignup">Sign Up for a Tutor Account</Link></p>
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

        {showMessage && <div className='authmessage'>
        <FontAwesomeIcon icon={faInfoCircle}/>
        <p>{message}</p>
        <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}

        <div className="showpassword">
          <input type="checkbox" name="showpassword" id="showpassword" onClick={()=>setShowPassord(!showPassword)} />
          <label htmlFor="showpassword">Show Password</label>
        </div>
        {loading?<div className='btn-loader'></div>:<button type="submit">Sign Up</button>}
      </form>
      <div className="redirect">
        <p>Already have an Account? <span><Link href="/auth/login">Login</Link></span></p>
        <p className="policylink">By signing up you accept our <span><Link href="">policy, terms & conditions</Link></span></p>
      </div>
      </div>
    </section>
  )
}

export default Signup