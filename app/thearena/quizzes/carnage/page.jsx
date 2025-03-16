'use client'
import React from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../../quiz/quiz.css'


const Carnage = () => {
const topic = 'any'

const startGame =()=>{
      window.location.href = `/thearena/randomquizzes/quiz/${topic}`
}
  return (
    <section className="quiz-page ">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/randomquizzes'>randomquizzes</Link></span>/carnage</p>
            </div>
        <h3>Biology</h3>
      </div>
        <div className="section-intro">
        <p>Absolutely any topic goes, It's not for the weak or easily defeated. Can you score 10 points?. Its not impossible but it won't be easy
        </p>
        
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start the Mayhem</button>
        
    </section>
  )
}

export default Carnage