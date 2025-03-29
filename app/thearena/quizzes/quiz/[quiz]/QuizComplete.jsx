import React from 'react'
import ShareResult from './ShareResult';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextUser } from '../../../../hooks/Context';
import {faRepeat} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';


const QuizComplete = ({title,points,questionCounter,setIsRunning,setMessage,setPoints,setQuestionCounter,setShowInfo,setTimer}) => {
const {userData}=useContextUser()
    let completeMessage = "";
    let textColor = ''
    if (points >= 8) {
      completeMessage = "🎉 Excellent! You did great!";
      textColor='green'
    } else if (points >= 5) {
      completeMessage = "👍 Good job! Keep improving!";
      textColor='orange'
    } else {
      completeMessage = "💪 Don't give up! Try again!";
      textColor='red'
    }
  return (
    <div className='quiz_complete' >
        <Image src='/images/confetti-ball-svgrepo-com.svg' alt='celebrate' width={200} height={200}/>
          <h2>Quiz Complete</h2>
          <p className='quiz-points'>You got <span style={{color:textColor}}>{points}/{questionCounter}</span> points.</p>
          <p>{completeMessage}</p>
          <ShareResult title={title} points={points}/>

          <button className='quiz_complete_btn'>
            <Link href='/thearena'>Check out more quizzes</Link></button>
          {userData && 
          <div>
            <p>-Or-</p>
            <span className='quiz_complete_btn'><Link href='/myarena'>Visit your arena dashboard</Link></span>
          </div>
           } 
           <span className='quiz_complete_btn tryagain'
            onClick={()=>{
              setQuestionCounter(0);      
              setTimer(30);               
              setPoints(0);               
              setIsRunning(true);         
              setShowInfo(false);         
              setMessage('');  
              }}>Try again <FontAwesomeIcon icon={faRepeat}/></span>
          </div>
  )
}

export default QuizComplete