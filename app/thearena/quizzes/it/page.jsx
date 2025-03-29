'use client'
import React from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../quiz.css'

const IT = () => {
const topic = 'IT'

const startGame =()=>{
      window.location.href = `/thearena/randomquizzes/quiz/${topic}`
}
  return (
    <section className="quiz-page ">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/randomquizzes'>randomquizzes</Link></span>/it</p>
            </div>
        <h3>IT and Computer Science</h3>
      </div>
        <div className="section-intro">
        <p>Random IT and Computer Science questions: No themes, No subtopics, they might be easy, or might be hard, be ready for a anything
        </p>
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>

        
    </section>
  )
}

export default IT