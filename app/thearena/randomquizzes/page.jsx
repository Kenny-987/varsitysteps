'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import '../arena.css'
import '../quiz/quiz.css'
import './random.css'
import Image from 'next/image'

const RandomQuiz = () => {
  return (
    <section className="quiz arena-section">
        <div className="heading">
            <div className="navsection">
                <p>navigation: <span><Link href='/thearena'>the arena</Link></span>/randomquizzes</p>
            </div>
        <h3>Random quiz section</h3>
        </div>
        <div className="section-intro">
        <p>Choose a topic and answer random questions based on that topic or go full random with questions from any topic. <small>(Random quiz does not contribute to leaderboard and achievements)</small></p>
        <p>You get a maximum of 30 seconds per question and each question is worth 1 point.  Enjoy!!</p>
        </div>
        
            <div className="challenges random-quizzes">
                <Link href='/thearena/randomquizzes/general-knowledge'><div className="challenge">
                    <p><Image src="/images/general_knowledge.svg" alt='icon' width={30} height={30}/> General Knowledge</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/randomquizzes/geography'><div className="challenge">
                    <p><Image src="/images/geography.svg" alt='icon' width={30} height={30}/> Geography</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/randomquizzes/it'><div className="challenge">
                    <p><Image src="/images/coding.svg" alt='icon' width={30} height={30}/> IT and Computer Science</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/randomquizzes/nature-animals'><div className="challenge">
                    <p><Image src="/images/nature.svg" alt='icon' width={30} height={30}/> Animals and Nature</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/randomquizzes/biology'><div className="challenge">
                    <p><Image src="/images/dna.svg" alt='icon' width={30} height={30}/> Biology</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>

                <Link href='/thearena/randomquizzes/science'><div className="challenge">
                    <p><Image src="/images/science.svg" alt='icon' width={30} height={30}/> Science (Physics and Chemistry)</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>
                
                <Link href='/thearena/randomquizzes/carnage'><div className="challenge">
                    <p><Image src="/images/danger.svg" alt='icon' width={30} height={30}/> Absolute Carnage</p>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </div></Link>
            </div>
        

    </section>
  )
}

export default RandomQuiz