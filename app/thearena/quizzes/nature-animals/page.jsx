'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../../quiz/quiz.css'
import { useContextUser } from '../../../hooks/Context'

const Nature = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const topic = 'nature'

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
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/natureandanimals</p>
            </div>
        <h3>Nature</h3>
      </div>
        <div className="section-intro">
        <p>The Nature section is designed to test your knowledge on animals, ecosytems and environmental facts, and the natural wonders of our planet. 
        </p>
        <div className="theme">
          <h4>This Week’s Theme: The Wild World of Classification</h4>
          <p>Can you classify the creatures of the wild and the wonders of nature? This week, we’re diving into the intricate world of animal and plant classification. </p>
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

export default Nature