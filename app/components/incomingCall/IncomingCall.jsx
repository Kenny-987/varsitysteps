'use client'
import React from 'react'
import './incomingCall.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

const IncomingCall = () => {
  return (
    <div className='incoming-popup'>
      <FontAwesomeIcon icon={faPhone}/>
      IncomingCall
      </div>
  )
}

export default IncomingCall