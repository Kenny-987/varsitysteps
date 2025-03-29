'use client'
import React from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../../quiz/quiz.css'


const Biology = () => {
const topic = 'Biology'

const startGame =()=>{
      window.location.href = `/thearena/randomquizzes/quiz/${topic}`
}
  return (
    <section className="quiz-page ">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/randomquizzes'>randomquizzes</Link></span>/biology</p>
            </div>
        <h3>Biology</h3>
      </div>
        <div className="section-intro">
        <p>Random Biology questions: No themes, No subtopics, they might be easy, or might be hard, be ready for a anything
        </p>
        
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>
        
    </section>
  )
}

export default Biology