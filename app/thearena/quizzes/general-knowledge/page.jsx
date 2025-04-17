'use client'
import React from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../quiz.css'
import QuizBlock from '../quizblock/QuizBlock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

const General = () => {
const router = useRouter()


  return (
    <section className="quiz-page">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/general-knowledge</p>
            </div>
        <h3><FontAwesomeIcon icon={faArrowCircleLeft} color='black' onClick={()=>router.back()}/> General Knowledge</h3>
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