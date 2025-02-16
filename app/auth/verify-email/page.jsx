'use client'
import React, { useState } from 'react'
import '../../globals.css'
import './verify.css'
import { useContextUser } from '../../hooks/Context'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose,faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const VerifyEmail = () => {
const {userData,isAuthenticated} = useContextUser() 
const router = useRouter()
const [otp,setOtp]=useState('')
const [step1,setStep1] = useState(true)
const [step2,setStep2]=useState(false)
const [loading,setLoading]=useState(false)
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')

if(!isAuthenticated ){
   return router.push('/auth/login');
}else if(userData.is_verified){
    return router.push('/dashboard');
}
const email = userData.email

const verifyEmail = async()=>{
setLoading(true)
try {
    const response = await fetch(`https://varsitysteps-server.onrender.com/auth/verify`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({email})
    })
    if(response.ok){
        setLoading(false)
        setStep1(false)
        setStep2(true)
    }else{
        setLoading(false)
        console.log('mmmh something wrong here');
        setShowMessage(true)
        setMessage('Network Error')
    }
} catch (error) {
    setLoading(false)
    console.error(error)
    setShowMessage(true)
    setMessage('Server Error')
}
}

const checkOtp = async()=>{
    if(otp==''){
        setMessage('Enter Otp')
        return setShowMessage(true)
    }
    setLoading(true)
    try {
        const response = await fetch(`https://varsitysteps-server.onrender.com/auth/otp`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({otp,email,flag:'emailVerification'})
        })
        if(response.ok){
            setLoading(true)
            console.log('email verified');
            window.location='/dashboard'
        }else{
            setLoading(false)
            setMessage('Network Error')
            setShowMessage(true)
        }
    } catch (error) {
        setLoading(false)
        setMessage('Internal server error')
        setShowMessage(true)
        console.error(error)
    }
}

  return (
    <section className='verify'>
        <h3>Verify your email: <span className='email'>{userData.email} </span>to confirm your identity and strengthen your account security, and recieve email notifications.</h3>
        {step1 &&
        <>{loading?<div className='btn-loader'></div>:<button onClick={verifyEmail}>Click here to verify</button>}
        {showMessage && <div className='authmessage'>
                <FontAwesomeIcon icon={faInfoCircle}/>
                <p>{message}</p>
                <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}
        </>
         }
        {step2 && <div>
            <p className='message-sent'>A code was sent to your email inbox: Enter the code in the field below</p>
        <input type="number"
        value={otp}
        onChange={(e)=>setOtp(e.target.value)} />   
        {loading?<div className='btn-loader'></div>:<button onClick={checkOtp}>Submit</button>} 
        {showMessage && <div className='authmessage'>
                <FontAwesomeIcon icon={faInfoCircle}/>
                <p>{message}</p>
                <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}
        </div>
        
        }
        
        
        </section>
  )
}

export default VerifyEmail