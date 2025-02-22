'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import '../arena.css'
import '../quiz/quiz.css'
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
        <p>Each topic has a new set of new questions everyday. Test your knowledge on different topics.</p>
            <p>You get a maximum of 30 seconds per question and each question is worth 1 point.  Enjoy!!</p>
        </div>
        

            <div className="challenges">
                <Link href='/thearena/quizzes/general-knowledge'><div className="challenge">
                    <p><Image src="/images/general_knowledge.svg" alt='icon' width={30} height={20}/>General Knowledge</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/quizzes/geography'><div className="challenge">
                    <p><Image src="/images/geography.svg" alt='icon' width={30} height={20}/>Geography</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                {/* <Link href='/thearena/quizzes/history'><div className="challenge">
                    <p><Image src="/images/history.svg" alt='icon' width={30} height={20}/>History</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link> */}

                <Link href='/thearena/quizzes/it'><div className="challenge">
                    <p><Image src="/images/coding.svg" alt='icon' width={30} height={20}/>IT and Computer Science</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/quizzes/nature-animals'><div className="challenge">
                    <p><Image src="/images/nature.svg" alt='icon' width={30} height={20}/>Animals and Nature</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/quizzes/biology'><div className="challenge">
                    <p><Image src="/images/dna.svg" alt='icon' width={30} height={20}/>Biology</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/quizzes/science'><div className="challenge">
                    <p><Image src="/images/science.svg" alt='icon' width={30} height={20}/>Science (Physics and Chemistry)</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                {/* <Link href='/thearena/quizzes/zimbabwe'><div className="challenge">
                    <p><Image src="/images/zimbabwe.svg" alt='icon' width={30} height={20}/>Everything Zimbabwe</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link> */}
            </div>
        

    </section>
  )
}

export default Quiz