'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../quiz.css'
import { useContextUser } from '../../../hooks/Context'

const Nature = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const [showMessage,setShowMessage]=useState(false)
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
                <p><span><Link href='/theareana'>the arena</Link></span>/<span><Link href='/thearena/quiz'>quizzes</Link></span>/nature</p>
            </div>
        <h3>Nature</h3>
      </div>
        <div className="section-intro">
        <p>The Nature section is designed to test your knowledge on animals, ecosytems and environmental facts, and the natural wonders of our planet. 
        </p>
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>
        {loginPrompt && 
          <button className='login_to_play'>
          <Link href={`/auth/login?redirect=${`/thearena/quiz/geography`}`}>Login to start playing</Link>
          </button> }
        {showMessage && 
        <p>You have already played today's General Knowledge quiz, check out other topics for more daily quizzes <Link href='/thearena/quiz'>More Topics</Link> </p>
        }
        
    </section>
  )
}

export default Nature