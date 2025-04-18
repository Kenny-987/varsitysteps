
'use client'
import React,{useState,useEffect} from 'react'
import '../../globals.css';
import '../form.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle,faClose} from '@fortawesome/free-solid-svg-icons'
import { useRouter,useSearchParams } from 'next/navigation';
import { useContextUser } from '../../hooks/Context';

const Login = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [showPassword, setShowPassord] = useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message, setMessage] = useState('')
  const [loading,setLoading]=useState(false)
  const router = useRouter()
  const searchParams = useSearchParams();
  const {isAuthenticated,setIsAuthenticated}=useContextUser()

  
  useEffect(()=>{
    if(isAuthenticated){
      router.push('/')
    }
  },[])

  if(isAuthenticated){
    return null;
  }

  const api = '/api/auth/login'
  const login= async(e)=>{
    setLoading(true)
    e.preventDefault();
    try {
      const response =  await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password }),
        credentials: 'include', 
      });
      if (response.ok) {
        const roles =  await response.json()
        setIsAuthenticated(true)
        setLoading(false)
        
        if(roles.includes('student')){
          localStorage.setItem('role','student')
          const redirectUrl = searchParams.get("redirect") || "/dashboard";
          window.location.href=redirectUrl
        }else if(roles.includes('tutor')){
          localStorage.setItem('role','tutor')
          const redirectUrl = searchParams.get("redirect") || "/tutordashboard";
           window.location.href=redirectUrl
          }else if(roles.includes('student') && roles.includes('tutor')){
          localStorage.setItem('role','student')
          window.location.href='/dashboard'
        }
      
      } else {
        const  errMsg =  await response.json()
        setShowMessage(true)
        setMessage(errMsg.message);
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setShowMessage(true)
      setMessage('Login failed');
      setLoading(false)
    }
  }

      return (
        <section className="signup form-page">
      <div className="sign-up-form">
          <h1>Login</h1>
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" 
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

            <div className="showpassword">
          <input type="checkbox" name="showpassword" id="showpassword" onClick={()=>setShowPassord(!showPassword)} />
            <label htmlFor="showpassword">Show Password</label>
            </div>

            {loading?<div className='btn-loader'></div>:<button type="submit">Login</button>}
          </form>

          <div className="redirect">
            <p>No Account yet? <span><Link href="/auth/signup">Sign up here</Link></span></p>
            <p><span><Link href='/auth/resetpassword'>Forgot Password</Link></span></p>
            
            <p className="policylink">By logging in you accept our <span><Link href="/terms-and-conditions">policy, terms & conditions</Link></span></p>
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

export default Login