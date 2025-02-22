'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import '../../arena.css'
import '../../quiz/quiz.css'
import { useContextUser } from '../../../hooks/Context'

const Biology = () => {
    const {isAuthenticated,userData}=useContextUser()
const [loginPrompt,setLoginPrompt]=useState(false)
const topic = 'Science'

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
                <p><span><Link href='/thearena'>the arena</Link></span>/<span><Link href='/thearena/quizzes'>quizzes</Link></span>/science</p>
            </div>
        <h3>Science</h3>
      </div>
        <div className="section-intro">
        <p>Dive into the fascinating world of Physics and Chemistry with our daily quizzes! Whether it’s the laws of motion, the elements of the periodic table, or chemical reactions, challenge your understanding of the forces that shape our universe.
        Ready to put your science knowledge to the test? Take today’s quiz and see how well you know the world around you! ⚛️🧪
        </p>
        <div className="theme">
          <h4>Force, Motion, and Challenge: This Week’s Theme – Mechanics in Action</h4>
          <p>Do you have the power to master the laws of motion and forces? This week, we’re putting your mechanics knowledge to the ultimate test.</p>
        </div>
        </div>
        
        <button className='quiz-start-btn' onClick={startGame}>Start Quiz</button>
        {loginPrompt && 
          <div className='login_to_play'>
          <button>
            <Link href={`/auth/login?redirect=${`/thearena/quiz/general-knowledge`}`}>Login or Sign up to unlock achievements and compete in the leaderboard</Link>
            </button>
            <p>-or-</p>
            <button>
            <Link href={`/thearena/quiz/${topic}`}>Continue as guest</Link>
            </button>
          </div>
        }
        
    </section>
  )
}

export default Biology