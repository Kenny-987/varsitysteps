'use client'
import React,{useState,useEffect} from 'react'
import { useParams } from "next/navigation"
import '../quiz.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faClose, faFaceSmile, faFrown, faLightbulb, faRunning, faSmile, faTrophy } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useContextUser } from '../../../hooks/Context'
import Image from 'next/image'


const QuizComponent = () => {
  const {userData} = useContextUser()
    const {topic} = useParams()
    const [showInfo,setShowInfo]=useState(false)
    const [isCorrect,setIsCorrect]=useState(false)
    const [questionCounter,setQuestionCounter]=useState(0)
    const [points,setPoints]=useState(0)
    const [timer,setTimer]=useState(30)
    const [isRunning,setIsRunning]=useState(true)
    const [message,setMessage]=useState('')
    const [warning,setWarning] = useState(false)
    const [questions,setQuestions] = useState([])
    const [loading,setLoading] =useState(true)
    const [playedStatus,setPlayedStatus] =useState(false)
    const [unlocked,setUnlocked] = useState([])
    const [showPopup,setShowPopup] = useState(false)
    const [checkingPlayedStatus, setCheckingPlayedStatus] = useState(true); 
    ///getting quiz questions
    useEffect(()=>{
      const fetchQuiz = async()=>{
        try {
          const response = await fetch(`https://varsitysteps-server.onrender.com/quiz/getquiz?query=${topic}`)
          if(response.ok){
            const data = await response.json()
            setQuestions(data)
            console.log(data);
            
          setLoading(false)
          }else{
            console.log('error')
            setLoading(false)
          }
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }
      fetchQuiz()
     
    },[])

    //chaecking and updating if player has played the quiz
    useEffect(()=>{
      if(questions.length>0){
        const quiz_id = questions.map(question => question.quiz_id)[0]
         const hasPlayed=async()=>{
        try {
          const response = await fetch(`https://varsitysteps-server.onrender.com/quiz/hasplayed`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({quiz_id}),
            credentials:'include'
          })
          if(response.ok){
            const data = await response.json()
            const status = data.message
            if(status === 'played'){
              setPlayedStatus(true)
            }
            
          }
        } catch (error) {
          console.error(error)
        }finally{
          setCheckingPlayedStatus(false)
        }
      }
      hasPlayed()
      }
    
    },[questions])
   
    //timer for the quiz
    useEffect(()=>{
        let interval
        if(isRunning){
            interval = setInterval(()=>{
                setTimer((prev)=> prev -1)
            },1000)
        }
        if(timer === 0 ){
            setIsRunning(false)
            clearInterval(interval)
            setMessage('Out of time')
            setShowInfo(true)
        }
        return ()=> clearInterval(interval)
    },[timer,isRunning])
      

      const checkAnswer=(index)=>{
        if(index === questions[questionCounter].correct_answer){
            setIsCorrect(true)
            setShowInfo(true)
            setPoints((prev)=>prev+1)
            setIsRunning(false)
            setMessage('correct')
        }else{
            setIsCorrect(false)
            setIsRunning(false)
            setMessage('oops incorrect')
            setShowInfo(true)
            return index
        }
      }

      const handleNext=()=>{
        setIsCorrect(false)
        setShowInfo(false)
        setTimer(30)
        setIsRunning(true)
        setQuestionCounter((prev)=>prev+1)
      }

    //functon to add points
    const addPoints=async()=>{
      const percentage = (points / 10) * 100
        try {
          const response = await fetch(`https://varsitysteps-server.onrender.com/quiz/addpoints`,{
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({points,percentage}),
            credentials:'include'
          })
          if(response.ok){
            const data = await response.json()
            setUnlocked(data)  
            if(data.length > 0){
              setShowPopup(true)
            }
            
          }

        } catch (error) {
          console.error(error)
        }
      }
      useEffect(()=>{
        if(questions.length>0){
          if(questionCounter>questions.length-1){
            addPoints()
          }
        }
      },[questions,questionCounter])

      if (checkingPlayedStatus) {
        return <div className='btn-loader'></div>; // Replace this with a better UI loader if needed
      }
  
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
    <div className='quizcomponent'>

    {/* achievement popup goes here */}
    {unlocked.length>0 &&showPopup && <div className='popupbox'>
      {unlocked.map((ach,index)=>{
        return <div className='achievement-popup' key={index}>
          <FontAwesomeIcon icon={faClose} onClick={()=>setShowPopup(false)}/>
      <h3>Congratulations</h3>
      <p> <FontAwesomeIcon icon={faTrophy}/> {ach.message}</p>
      <button><Link href='/myarena'>View more Achievements</Link></button>
      </div>
      })}
    </div>

        }
      

      {playedStatus ==true?<div className='quiz_complete'>
        <Image src='/images/completed-checkmark-done-complete-svgrepo-com.svg' alt='done' width={200} height={200}/>
        <h3>You have already played today's quiz</h3>
        <p>Check again tomorrow for a new quiz</p>
        <span>Explore more quizzes in the <Link href='/thearena'>Arena</Link> while you wait</span>
        <p>-Or-</p>
        <span><Link href='/myarena'>Visit your arena dashboard</Link></span>
        </div>:
      
      <>
      {questionCounter>questions.length-1?<div className='quiz_complete' >
        <Image src='/images/confetti-ball-svgrepo-com.svg' alt='celebrate' width={200} height={200}/>
          <h2>Quiz Complete</h2>
          <p>You got <span style={{color:textColor}}>{points}</span> points.</p>
          <p>{completeMessage}</p>
          <span className='quiz_complete_btn'><Link href='/thearena/quiz'>Check out more quizzes in the arena</Link></span>
          <p>-Or-</p>
          <span className='quiz_complete_btn'><Link href='/myarena'>Visit your arena dashboard</Link></span>
          </div>:
        <>
        <div className="username-points">
        <p>{userData.username}</p>
        <p>Points: <span>{points}</span></p> 
    </div>
        <div className="quiz-question">
        <div className="time"><p>Question: {questionCounter+1}/{questions.length}</p>
        <p>Time: <span style={timer<=10?{backgroundColor:'red'}:{backgroundColor:'green'}}>{timer}s</span></p></div>
        <p className='question'>{questions[questionCounter].question_text}</p>
    </div>
    
    <div className="answers">
        <p>Answers</p>
        {questions[questionCounter].answer_options.map((option,index)=>{
            return <div key={index} className="answer" onClick={()=>checkAnswer(index)}>
             <p>{option}</p>
         </div>
        })}
    </div>
    {showInfo && <div className='quizinfo'>
        <div className="quizinfo-child">
        <div className="emote">
            {isCorrect?<FontAwesomeIcon icon={faFaceSmile} color='green' size='4x'/>:<FontAwesomeIcon icon={faFrown} color='red' size='4x'/>}
        </div>
        <p className='result' style={isCorrect?{backgroundColor:"green"}:{backgroundColor:'red'}}>{isCorrect?`${message}`:`${message}, the correct answer is ${questions[questionCounter].answer_options[questions[questionCounter].correct_answer]}`}</p>
        <p className='bonus-info'><FontAwesomeIcon icon={faLightbulb} color='green'/> {questions[questionCounter].extra_info}</p>
        <button onClick={handleNext}>Next <FontAwesomeIcon icon={faCaretRight}/></button>
        </div>
        </div>}
    <button className='quitquiz' onClick={()=>setWarning(true)}>Quit</button>
    {warning && <div className='quizinfo'>
        <div className="quizinfo-child quit">
        <p>If you quit this quiz will be counted as complete, but you will not be awarded any points</p>
         <p>The clock is still ticking<span style={timer<=10?{backgroundColor:'red'}:{backgroundColor:'green'}}>{timer}s</span> </p>

        <button className='quit-btn'><Link href='/thearena'>Quit</Link><FontAwesomeIcon icon={faRunning}/></button>
        <button onClick={()=>setWarning(false)}>Continue <FontAwesomeIcon icon={faSmile}/></button>
        </div>
        </div> }
    </>}
      </>
        } 
      
    </div>
  )
}

export default QuizComponent