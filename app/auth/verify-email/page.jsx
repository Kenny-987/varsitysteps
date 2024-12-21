'use client'
import React, { useState } from 'react'
import './verify.css'
import { useContextUser } from '../../hooks/Context'
import { useRouter } from 'next/navigation'

const VerifyEmail = () => {
const {userData,isAuthenticated} = useContextUser() 
const router = useRouter()
const [otp,setOtp]=useState('')
const [step1,setStep1] = useState(true)
const [step2,setStep2]=useState(false)

if(!isAuthenticated){
    router.push('/auth/login');
}
console.log(userData);

const verifyEmail = async()=>{
    const email = userData.email
    console.log('clicked');
    
try {
    const response = await fetch(`https://varsitysteps-server.onrender.com/auth/verify`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({email})
    })
    if(response.ok){
        setStep1(false)
        setStep2(true)
    }else{
        console.log('mmmh something wrong here');
        
    }
} catch (error) {
    console.error(error)
}
}

const checkOtp = async()=>{
    try {
        const response = await fetch(``,{
            method:'POST',
            headers:{},
            body:JSON.stringify({otp})
        })
        if(response.ok){
            console.log('email verified');
            window.location=''
        }
    } catch (error) {
        console.error(error)
    }
}

  return (
    <section className='verify'>
        <h3>Verify your email: {userData.email} to confirm your identity and strengthen you account security, and recieve email notifications.</h3>
        {step1 &&<button onClick={verifyEmail}>Click here to verify</button> }
        {step2 && <div>
            <p>A code was sent to your email inbox: Enter the code in the field below</p>
        <input type="number"
        value={otp}
        onChange={(e)=>setOtp(e.target.value)} />   
        <button onClick={checkOtp}>Submit</button> 
        </div>}
        
        
        </section>
  )
}

export default VerifyEmail