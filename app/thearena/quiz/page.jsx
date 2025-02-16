'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import '../arena.css'
import './quiz.css'
import Image from 'next/image'
const Quiz = () => {
  return (
    <section className="quiz arena-section">
        <div className="heading">
            <div className="navsection">
                <p>navigation: <span><Link href='/thearena'>the arena</Link></span>/quizzes</p>
            </div>
        <h3>Daily quiz section</h3>
        </div>
        <div className="section-intro">
        <p>Each topic has a new set of questions everyday.
            All question will mostly focus on the Zimbabwean country to enrich and enstill knowledge of our country. You can answer from all topics for maximum points.</p>
            <p>You get a maximum of 30 seconds per question and each question is worth 1 point.  Enjoy!!</p>
        </div>
        

            <div className="challenges">
                <Link href='/thearena/quiz/general-knowledge'><div className="challenge">
                    <p><Image src="/images/general_knowledge.svg" alt='icon' width={30} height={20}/>General Knowledge</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/quiz/geography'><div className="challenge">
                    <p><Image src="/images/geography.svg" alt='icon' width={30} height={20}/>Geography</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/quiz/history'><div className="challenge">
                    <p><Image src="/images/history.svg" alt='icon' width={30} height={20}/>History</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                {/* <Link href='/thearena/quiz'><div className="challenge">
                    <p><Image src="/images/sports.svg" alt='icon' width={30} height={20}/>Sports</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link> */}

                <Link href='/thearena/quiz/nature-animals'><div className="challenge">
                    <p><Image src="/images/nature.svg" alt='icon' width={30} height={20}/>Animals and Nature</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>
            </div>
        

    </section>
  )
}

export default Quiz