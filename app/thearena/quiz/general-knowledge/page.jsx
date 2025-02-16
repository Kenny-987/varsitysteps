'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../quiz.css'
import { useContextUser } from '../../../hooks/Context'

const General = () => {
const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const [showMessage,setShowMessage]=useState(false)
const topic = 'general knowledge'


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
                <p><span><Link href='/theareana'>the arena</Link></span>/<span><Link href='/thearena/quiz'>quizzes</Link></span>/general-knowledge</p>
            </div>
        <h3>General Knowledge</h3>
      </div>
        <div className="section-intro">
        <p>The General Knowledge Quiz is designed to challenge your understanding of a wide range of subjects, from Maths, science to world history to sports and other interesting subjects. Whether you're a trivia enthusiast or just love learning new things, this quiz will test how well-rounded your knowledge really is.
        </p>
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>
        {loginPrompt && 
          <button className='login_to_play'>
          <Link href={`/auth/login?redirect=${`/thearena/quiz/general-knowledge`}`}>Login to start playing</Link>
          </button> }   
    </section>
  )
}

export default General