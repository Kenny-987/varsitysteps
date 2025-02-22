'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../../quiz/quiz.css'
import { useContextUser } from '../../../hooks/Context'

const Biology = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const topic = 'Biology'

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
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/biology</p>
            </div>
        <h3>Biology</h3>
      </div>
        <div className="section-intro">
        <p>Test your knowledge of life sciences with our daily biology quizzes! From the cells that make up every living organism to the ecosystems that support life, challenge yourself and see if you have what it takes to be a biology pro.
        Think you’ve got what it takes? Take today’s quiz and prove it! 
        </p>
        <div className="theme">
          <h4>Unlock the Blueprint of Life! This Week’s Theme: Cells & Genetics – Are You the Genetic Genius</h4>
          <p>Think you know cells inside and out? Can you crack the code of genetics? This week, we’re diving deep into the microscopic world of life’s building blocks.</p>
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

export default Biology