'use client'
import React from 'react'
import './incomingCall.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faPhoneSlash } from '@fortawesome/free-solid-svg-icons'
import { useContextUser } from '../../hooks/Context'

const IncomingCall = ({callerDetails,setShowCalling}) => {
const {setShowVideoCall}=useContextUser()


  return (
    <div className='incoming-popup'>
      <p>Incoming call from {callerDetails.callerName}</p>
      <div className="anweroptions">
        <button className='acceptcall' onClick={()=>{{setShowVideoCall(true)}
      setShowCalling(false)
      }}>
      <p>Click for options</p>
        </button>
      </div>
      </div>
  )
}

export default IncomingCall