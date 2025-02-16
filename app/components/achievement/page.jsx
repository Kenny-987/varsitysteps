import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight, faClose, faTrophy } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import '../../globals.css'
import './popup.css'
import { useContextUser } from '../../hooks/Context'

const AchievementPopup = () => {
   const {globalAchievement,setShowAchPopup} = useContextUser()
   
  return (
    <div className="achievement-popup-container">
      <FontAwesomeIcon className='close-popup' icon={faClose} onClick={()=>setShowAchPopup(false)}/>
    {globalAchievement.map((ach,index)=>{
        return <div className='achievement-popup' key={index}>
      <h3>Congratulations</h3>
      <p> <FontAwesomeIcon icon={faTrophy}/> {ach.message}</p>
      <span onClick={()=>setShowAchPopup(false)}><Link href='/myarena'>View more Achievements</Link></span>
      </div>
      })}
  
      </div>
      

  )
}

export default AchievementPopup