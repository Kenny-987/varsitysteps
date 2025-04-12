'use client'
import React ,{useState}from 'react'
import './arena.css'
import LeaderBoard from './LeaderBoard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
// import '../globals.css'


const Arena = () => {
    const [content,setContent]=useState('challenges')
    
  return (
    <>
    <Head>
                <title>Arena - VarsitySteps</title>
                <meta name="description" content="Complete challenges and climb up the leaderboard in the Arena. Take quizzes and have fun!" />
                <meta name="keywords" content="arena, quizzes, challenges, leaderboard, education, fun learning, online quizzes, VarsitySteps" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Arena - VarsitySteps" />
                <meta property="og:description" content="Complete challenges and climb up the leaderboard in the Arena." />
                <meta property="og:image" content="/images/arena-banner.jpg" />
                <meta property="og:url" content="https://www.varsitysteps.co.zw/thearena" />
    </Head>
   
    <section className="arena">
        {/* <div className="coming-soon">
            <h1>Coming soon</h1>
            <p>quizzes are being added</p>
        </div> */}
        
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
                <Link href='/thearena/quizzes'><div className="challenge-card">
                    <Image src="/images/quizzes.svg" width={80} height={80} alt='icon'/>
                    <p>Quizzes</p>
                    <button>play</button>
                </div></Link> 
                <Link href='/thearena/zitf'><div className="challenge-card">
                    <Image src="/images/zitf.jpg" width={80} height={80} alt='icon'/>
                    <p>ZITF Special</p>
                    <button>play</button>
                </div></Link>
                </div>}
                
            {content === 'leaderboard' && <LeaderBoard/>}
        </div>
    </section>
    </>
  )
}

export default Arena
