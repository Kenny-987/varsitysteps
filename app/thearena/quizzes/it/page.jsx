'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../../quiz/quiz.css'
import { useContextUser } from '../../../hooks/Context'

const IT = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const topic = 'IT'

const startGame =()=>{
  if(isAuthenticated && userData){
      window.location.href = `/thearena/quiz/${topic}`
  }else{
    setLoginPrompt(true)
  }
}
  return (
    <section className="quiz-page ">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/it</p>
            </div>
        <h3>IT and Computer Science</h3>
      </div>
        <div className="section-intro">
        <p>Are you ready to prove you're a tech genius? Test your skills with today’s daily quiz! Dive into exciting questions, challenge yourself, and see if you can outsmart the competition. Don't just take the quiz – own it! Keep track of your progres and aim for a top score.
        </p>
        <div className="theme">
          <h4>Tech Titans: This Week’s Theme – Mastering Programming & IT Knowledge</h4>
          <p>Are you ready to test your programming prowess? From coding languages to the ins and outs of IT, this week’s challenge will separate the tech novices from the true tech titans</p>
          </div>
        
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>
        {loginPrompt && 
          <div className='login_to_play'>
          <button>
            <Link href={`/auth/login?redirect=${`/thearena/quiz/general-knowledge`}`}>Login or Sign up to unlock achievements and compete in the leaderboard</Link>
            </button>
            <p>-or-</p>
            <button>
            <Link href={`/thearena/quiz/${topic}`}>Continue as guest</Link>
            </button>
          </div>
        }
        
    </section>
  )
}

export default IT