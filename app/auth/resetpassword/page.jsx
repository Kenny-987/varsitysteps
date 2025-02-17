'use client'
import React, { useState } from "react"
import '../../globals.css';
import '../form.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle,faClose } from "@fortawesome/free-solid-svg-icons";


const ResetPassword =()=>{
    const [email,setEmail]=useState('')
    const [loading,setLoading]= useState(false)
    const [otp,setOtp]=useState('')
    const [showStep1,setShowStep1] = useState(true)
    const [showStep2,setShowStep2] = useState(false)
    const [showStep3,setShowStep3]=useState(false)
    const [showPassword,setShowPassord] = useState(false)
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')


    const checkEmail = async(e)=>{
        e.preventDefault()
        if(email==''){
        setShowMessage(true)
        return setMessage('Enter valid email');
        }
        setLoading(true)
        try {
            const response = await fetch(`/api/auth/reset`,{
            method:'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
            })
            
            if(response.ok){
                setShowStep1(false)
                setShowStep2(true)
                setLoading(false)

            }else{
                const errMsg = await response.json()
                setShowMessage(true)
                setMessage(errMsg.message);
                setLoading(false)
                
            }
        } catch (error) {
            console.error(error)
            setShowMessage(true)
            setMessage('oops, Catastrophic failure');
            setLoading(false)
        }
    }
    
    const checkOtp = async()=>{
        try {
            const response =await fetch(`/api/auth/otp`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({otp,flag:'resetPassword'})
            })
            if(response.ok){
                setShowStep3(true)
                setShowStep2(false)
                setLoading(false)
            }else{
                const errMsg = await response.json()
                console.log(errMsg);
                setShowMessage(true)
                setMessage(errMsg.message);
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
            setShowMessage(true)
            setMessage('oops, Catastrophic failure');
            setLoading(false)
        }
    }
const newPassword = async()=>{
    try {
        const response = await fetch('/api/auth/newpassword',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({password})
        })
        if(response.ok){
            console.log('new password active');  
            window.location.href='/auth/login'
        }else{
            const errMsg = await response.json()
                console.log(errMsg);
                setShowMessage(true)
                setMessage(errMsg.message);
                setLoading(false)
        }
    } catch (error) {
        console.log(error);
    }
}
    return (
        <section className="sign-up form-page">
            <div className="sign-up-form">
            <form>
                {showStep1 && <div className="form-group">
              <label htmlFor="email">Enter your email</label>
              <input type="email" 
              id="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
               required />
               <small>You will recieve a code in your email to use in the next step</small>
               {loading?<div className='btn-loader'></div>:<button type="submit" onClick={checkEmail}>Submit</button>}
               {showMessage && <div className='authmessage'>
                <FontAwesomeIcon icon={faInfoCircle}/>
                <p>{message}</p>
                <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}
            </div>}
            
            {showStep2 && <div className="form-group">
              <label htmlFor="otp">Enter the code sent to your email</label>
              <input type="number" 
              id="otp" 
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} 
               required />
               {loading?<div className='btn-loader'></div>:<button type="button" onClick={checkOtp}>Submit</button>}
               {showMessage && <div className='authmessage'>
                <FontAwesomeIcon icon={faInfoCircle}/>
                <p>{message}</p>
                <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}
            </div>}
            
                {showStep3 &&
                <>
                <div className="form-group">
              <label htmlFor="otp">Enter new password</label>
              <input type={showPassword ? 'text':'password'}
              id="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
               required />
            </div>
            <div className="form-group">
              <label htmlFor="otp">Confirm password</label>
              <input type={showPassword ? 'text':'password'}
              id="confirmpassword" 
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
               required />
               {loading?<div className='btn-loader'></div>:<button onClick={newPassword}>Submit</button>}
            </div>
            <div className="showpassword">
          <input type="checkbox" name="showpassword" id="showpassword" onClick={()=>setShowPassord(!showPassword)} />
            <label htmlFor="showpassword">Show Password</label>
            </div>
                </>
            }
            
            </form>
            </div>
            
        </section>
    )

}

export default ResetPassword