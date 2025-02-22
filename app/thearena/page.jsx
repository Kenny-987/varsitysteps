'use client'
import React ,{useState}from 'react'
import './arena.css'
import LeaderBoard from './LeaderBoard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
// import '../globals.css'


const Arena = () => {
    const [content,setContent]=useState('challenges')
  return (
    <section className="arena">
        <div className="heading">
            <h3>Welcome to the Arena</h3>
            <p>Complete challenges and climb up the Leaderboard</p>
        </div>
        <div className="tab-links">
            <p onClick={()=>setContent('challenges')}>Challenges</p>
            <p onClick={()=>setContent('leaderboard')}>Leaderboard</p>
        </div>
        <div className="arena-content">
            {content === 'challenges' && <div className='challenges'>
                <Link href='/thearena/quizzes'><div className="challenge">
                    <p><Image src="/images/quizzes.svg" width={30} height={20} alt='icon'/>Daily Quizzes</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/randomquizzes'><div className="challenge">
                    <p> <Image src="/images/random.svg" width={30} height={20} alt='icon'/>Random Quizzes</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>
                </div>}
                
            {content === 'leaderboard' && <LeaderBoard/>}
        </div>
    </section>
  )
}

export default Arena