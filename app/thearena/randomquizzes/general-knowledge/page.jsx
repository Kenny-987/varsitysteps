'use client'
import React from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../../quiz/quiz.css'


const General = () => {
const topic = 'general knowledge'


const startGame =()=>{
      window.location.href = `/thearena/randomquizzes/quiz/${topic}`
}

  return (
    <section className="quiz-page ">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/randomquizzes'>quizzes</Link></span>/general-knowledge</p>
            </div>
        <h3>General Knowledge</h3>
      </div>
        <div className="section-intro">
        <p>Random General knowledge questions: No themes, No subtopics, they might be easy, or might be hard, be ready for a anything
        </p>
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>   
    </section>
  )
}

export default General