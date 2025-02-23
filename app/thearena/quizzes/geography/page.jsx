'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import { useContextUser } from '../../../hooks/Context'
import '../../quiz/quiz.css'

const Geography = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const topic = 'Geography'

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
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/geography</p>
            </div>
        <h3>Geography</h3>
      </div>
        <div className="section-intro">
        <p>The Geography section is designed to challenge your understanding of the different parts of the world inlding countires, continents, weather and basically anything Geography. 
        </p>
        <div className="theme">
          <h4>World Capitals Showdown! This Week’s Theme: Test Your Global Knowledge</h4>
          <p>Think you can name the capitals of every country? This week, we’re taking your geography skills to the next level!</p>
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

export default Geography