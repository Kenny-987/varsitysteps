import React from 'react'
import ShareResult from './ShareResult';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextUser } from '../../../../hooks/Context';
import {faRepeat} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';


const QuizComplete = ({title,points,questionCounter,setIsRunning,setMessage,setPoints,setQuestionCounter,setShowInfo,setTimer,quiz}) => {
const {userData}=useContextUser()
    let completeMessage = "";
    let textColor = ''
    if ((points / questionCounter) * 100 >= 80) {
      completeMessage = "🎉 Excellent! You did great!";
      textColor='green'
    } else if ((points / questionCounter) * 100 >= 50) {
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
          <ShareResult title={title} quiz={quiz} points={points}/>

          <div className="post-quiz-options">
          <button className='quiz_complete_btn more-quizzes'>
            <Link href='/thearena'>More quizzes</Link>
          </button>
          {userData && 
            <button className='quiz_complete_btn'><Link href='/myarena'>Visit your arena dashboard</Link></button>
           } 
           <button className='quiz_complete_btn tryagain'
            onClick={()=>{
              setQuestionCounter(0);      
              setTimer(30);               
              setPoints(0);               
              setIsRunning(true);         
              setShowInfo(false);         
              setMessage('');  
              }}>Try again <FontAwesomeIcon icon={faRepeat}/>
              </button>
          </div>
          
          
           
          </div>
  )
}

export default QuizComplete