'use client'
import React,{useState,useEffect} from 'react'
import { useParams } from "next/navigation"
import '../../quiz.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faLightbulb, faRunning, faSmile} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useContextUser } from '../../../../hooks/Context'
import Image from 'next/image'
import QuizComplete from './QuizComplete'

const QuizComponent = () => {
  const {userData} = useContextUser()
    const {quiz} = useParams()
    const [showInfo,setShowInfo]=useState(false)
    const [isCorrect,setIsCorrect]=useState(false)
    const [questionCounter,setQuestionCounter]=useState(0)
    const [points,setPoints]=useState(0)
    const [timer,setTimer]=useState(30)
    const [isRunning,setIsRunning]=useState(false)
    const [message,setMessage]=useState('') 
    const [warning,setWarning] = useState(false)
    const [questions,setQuestions] = useState([])
    const [loading,setLoading] =useState(true)
    const [loginPrompt,setLoginPrompt]=useState(true)
    const title = quiz.split('-').slice(1).join("-")
    const quiz_id = quiz.split('-')[0]


    ///getting quiz questions
    useEffect(()=>{
      if(userData){
        setIsRunning(true)
      }
      const fetchQuestions = async()=>{
        try {
          const response =  await fetch(`/api/quiz/getquestions?query=${quiz_id}`)
          
          if(response.ok){
            const data =  await response.json()
            setQuestions(data)          
          setLoading(false)
          }else{
            console.log('error')
          }
        } catch (error) {
          console.error(error)
        }finally{
          setLoading(false)
        }
      }
      fetchQuestions()
     
    },[])

    //functon to add points
    const addPoints=async()=>{
      const percentage = (points / 10) * 100
        try {
          const response = await fetch(`/api/quiz/addpoints`,{
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
            setMessage('Correct')
        }else{
            setIsCorrect(false)
            setIsRunning(false)
            setMessage('So close')
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

 
      if (!quiz) return null;
     
     
  return (
    <div className='quizcomponent'>
      {loading ? <div className='btn-loader'></div>:
      <>
      {questionCounter>questions.length-1? <QuizComplete 
      title={title} 
      points={points}
      questionCounter={questionCounter}
      setQuestionCounter={setQuestionCounter}      
      setTimer={setTimer}           
      setPoints={setPoints}          
      setIsRunning={setIsRunning}         
      setShowInfo={setShowInfo}         
      setMessage={setMessage}
      />:
     
        <>
        <div className="quiz-start-modal">
      {!userData && loginPrompt && 
        <div className='login_prompt'>
        <button>
          <Link href={`/auth/login?redirect=${`/thearena/quizzes/quiz/${quiz_id}`}`}>Login or Sign up to unlock achievements and compete in the leaderboard</Link>
          </button>
          <p>-or-</p>
          <button onClick={()=>{
            setLoginPrompt(false)
            setIsRunning(true)
            }}>
          Continue as guest
          </button>
        </div>
          }  
      </div>
        <div className="username-points">
        <p>{userData?userData.username:'Guest'}</p>
        <p>Points: <span>{points}</span></p> 
    </div>

        <div className="quiz-question">
        <div className="time"><p>Question: {questionCounter+1}/{questions.length}</p>
        <p>Time: <span style={timer<=10?{backgroundColor:'red'}:{backgroundColor:'green'}}>{timer}s</span></p></div>
        <p className='question'>{questions[questionCounter].question_text}</p>
        {questions[questionCounter].image && <Image src={questions[questionCounter].image} alt='image' width={200} height={200}/> }
        <div className="question-image">
          
        </div>
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
          {/* remember to embbed gyphy */}
        <div className="emote">
            {isCorrect?<Image src='/images/happybear.gif' alt='gif'width={150} height={150}/>:<Image src='/images/sadbear.gif' alt='gif' width={150} height={150}/>}
        </div>
        <p className='result' style={isCorrect?{backgroundColor:"green"}:{backgroundColor:'red'}}>{isCorrect?`${message}`:`${message}, the correct answer is ${questions[questionCounter].answer_options[questions[questionCounter].correct_answer]}`}</p>
        <p className='bonus-info'><FontAwesomeIcon icon={faLightbulb} color='green'/> {questions[questionCounter].extra_info}</p>
        <button onClick={handleNext}>Next <FontAwesomeIcon icon={faCaretRight}/></button>
        </div>
        </div>}
    <button className='quitquiz' onClick={()=>setWarning(true)}>Quit</button>
    
    {warning && <div className='quizinfo'>
        <div className="quizinfo-child quit">
          {userData? <p>If you quit no points will be added towards achievements or the leaderboard.</p>:<p>Don't give up maybe it'll get easier ahead</p>}
        
         <p>The clock is still ticking<span style={timer<=10?{backgroundColor:'red'}:{backgroundColor:'green'}}>{timer}s</span> </p>

        <button className='quit-btn'><Link href='/thearena/quizzes'>Quit </Link><FontAwesomeIcon icon={faRunning}/></button>
        <button onClick={()=>setWarning(false)}>Continue <FontAwesomeIcon icon={faSmile}/></button>
        </div>
        </div> }
      </>
        } 
      
      </>
      }

      
    </div>
  )
}

export default QuizComponent