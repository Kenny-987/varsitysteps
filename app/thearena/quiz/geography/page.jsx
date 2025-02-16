'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../quiz.css'
import { useContextUser } from '../../../hooks/Context'

const Geography = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const [showMessage,setShowMessage]=useState(false)
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
                <p><span><Link href='/theareana'>the arena</Link></span>/<span><Link href='/thearena/quiz'>quizzes</Link></span>/geography</p>
            </div>
        <h3>Geography</h3>
      </div>
        <div className="section-intro">
        <p>The Geography section is designed to challenge your understanding of the Zimbabwean and African landscape. 
        </p>
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>
        {loginPrompt && 
          <button className='login_to_play'>
          <Link href={`/auth/login?redirect=${`/thearena/quiz/geography`}`}>Login to start playing</Link>
          </button> }
        {showMessage && 
        <p>You have already played today's Geography quiz, check out other topics for more daily quizzes <Link href='/thearena/quiz'>More Topics</Link> </p>
        }
        
    </section>
  )
}

export default Geography