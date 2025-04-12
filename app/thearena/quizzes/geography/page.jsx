'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import { useContextUser } from '../../../hooks/Context'
import '../quiz.css'
import QuizBlock from '../quizblock/QuizBlock'

const Geography = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const topic = 'Geography'

const startGame =()=>{
      window.location.href = `/thearena/quizzes/quiz/${topic}`
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
        <p>Explore different geography quizzes and test your knowledge on the planet we call earth
        </p>
        </div>
        
        <div className="preview">
            <QuizBlock topic={'geography'}/>
        </div>
        
    </section>
  )
}

export default Geography