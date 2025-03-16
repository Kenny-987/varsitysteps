'use client'
import React,{useState} from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import '../arena.css'
import './quiz.css'
import './random.css'
import Image from 'next/image'
import QuizBlock from './quizblock/QuizBlock'
import PreviewBlock from './previewblocks/PreviewBlock'

const RandomQuiz = () => {
  return (
    <section className="quizzes-container arena-section">
        <div className="heading">
            <div className="navsection">
                <p>navigation: <span><Link href='/thearena'>the arena</Link></span>/quizzes</p>
            </div>
        <h3>Quizzes</h3>
        </div>
        <div className="topic-tags">
                <Link href='/thearena/quizzes/general-knowledge' aria-label="General Knowledge Quiz">
                    <p className="tag">General Knowledge</p>
                </Link>
                <Link href='/thearena/quizzes/geography' aria-label="General Knowledge Quiz">
                    <p className="tag">Geography</p>
                </Link>
                <Link href='/thearena/quizzes/general-knowledge' aria-label="General Knowledge Quiz">
                    <p className="tag">Technology</p>
                </Link>
                <Link href='/thearena/quizzes/general-knowledge' aria-label="General Knowledge Quiz">
                    <p className="tag">Animals</p>
                </Link>
                <Link href='/thearena/quizzes/general-knowledge' aria-label="General Knowledge Quiz">
                    <p className="tag">Science</p>
                </Link>
        </div>
        
        <div className="previewquizzes">
            <div className="preview">
            <h4>General Knowledge</h4>
            <PreviewBlock topic={'general knowledge'}/>
            <Link href='/thearena/quizzes/general-knowledge' aria-label="General Knowledge Quiz">
                    <button>More</button>
                </Link>
            </div>
            <div className="preview">
            <h4>Geography</h4>
            <PreviewBlock topic={'geography'}/>
            <Link href='/thearena/quizzes/geography' aria-label="General Knowledge Quiz">
                    <button>More</button>
                </Link>
            </div>
        </div>
        

    </section>
  )
}

export default RandomQuiz