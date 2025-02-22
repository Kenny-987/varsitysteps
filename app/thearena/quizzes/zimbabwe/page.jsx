'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../../quiz/quiz.css'
import { useContextUser } from '../../../hooks/Context'

const Biology = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const topic = 'Zimbabwe'

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
                <p><span><Link href='/theareana'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/zimbabwe</p>
            </div>
        <h3>Zimbabwe</h3>
      </div>
        <div className="section-intro">
        <p>From the ancient ruins of Great Zimbabwe to its diverse landscapes and wildlife, Zimbabwe is a country full of fascinating stories and vibrant traditions. Test your knowledge on the geography, history, culture, and current affairs of Zimbabwe in this exciting quiz. Whether you're a local or a global explorer, challenge yourself and see how well you really know this beautiful African nation!
        </p>
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