'use client'
import React from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../quiz.css'
import PreviewBlock from '../previewblocks/PreviewBlock'
import QuizBlock from '../quizblock/QuizBlock'


const General = () => {
const topic = 'general knowledge'


const startGame =()=>{
      window.location.href = `/thearena/quizzes/quiz/${topic}`
}

  return (
    <section className="quiz-page">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/general-knowledge</p>
            </div>
        <h3>General Knowledge</h3>
      </div>
        <div className="section-intro">
        <p> General quiz questions</p>
        </div>  
        <div className="preview">
            <QuizBlock topic={'general knowledge'}/>
        </div>
    </section>
  )
}
export default General