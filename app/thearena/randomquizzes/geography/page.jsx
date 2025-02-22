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
      window.location.href = `/thearena/randomquizzes/quiz/${topic}`
}
  return (
    <section className="quiz-page ">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/randomquizzes'>randomquizzes</Link></span>/geography</p>
            </div>
        <h3>Geography</h3>
      </div>
        <div className="section-intro">
        <p>The Geography section is designed to challenge your understanding of the Zimbabwean and African landscape. 
        </p>
        <div className="theme">
        <p>Random Geography questions: No themes, No subtopics, they might be easy, or might be hard, be ready for a anything
        </p>
        </div>
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>

        
    </section>
  )
}

export default Geography