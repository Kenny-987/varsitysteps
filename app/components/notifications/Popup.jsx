'use client'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'
import { useContextUser } from '../../hooks/Context'

const Popup = ({message}) => {
    const{setShowNotifyPopup}=useContextUser()
  return (
    <div className='notify-popup'>
        <FontAwesomeIcon icon={faClose} onClick={()=>setShowNotifyPopup()}/>
        <Link href=''>
        <p className="notify-message">{message}</p>
        </Link>
        
    </div>
  )
}

export default Popup