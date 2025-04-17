'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import { useContextUser } from '../../../hooks/Context'
import '../quiz.css'
import QuizBlock from '../quizblock/QuizBlock'
import { useRouter } from 'next/navigation'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Geography = () => {
  const router = useRouter()

  return (
    <section className="quiz-page ">
      <div className="heading">
      <div className="navsection">
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/geography</p>
            </div>
        <h3><FontAwesomeIcon icon={faArrowCircleLeft} color='black' onClick={()=>router.back()}/> Geography</h3>
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