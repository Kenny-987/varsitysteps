'use client'
import React,{useState,useEffect} from 'react'
import '../quizblock/quizblock.css'
import Image from 'next/image'
import Link from 'next/link'

const PreviewBlock = ({topic}) => {
    const [quizzes,setQuizzes]=useState([])
    const [loading,setLoading] = useState(false)
useEffect(()=>{
  const fetchQuizzes = async()=>{
    setLoading(true)
    try {
      const response =  await fetch(`/api/quiz/getquizzes?query=${topic}`)
      if(response.ok){
        const data =  await response.json()
        const shuffled = data.sort(() => Math.random() - 0.5);
        setQuizzes(shuffled.slice(0, 2));
        setQuizzes(data.slice(0,2))  
      }else{
        console.log('error');
        
      }
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
  }
  fetchQuizzes()
},[topic])


const slugify = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace spaces & special characters with dashes
      .replace(/^-+|-+$/g, ''); // Remove trailing dashes
  };

  return (
    <div className="quiz-blocks-list">
      {loading ? <div className='btn-loader'></div>:
      <>
      {quizzes.length > 0 && quizzes.map((quiz,index)=>{
      const quizSlug = slugify(quiz.title);
      return <Link key={index} href={`/thearena/quizzes/quiz/${quiz.id}-${quizSlug}`}>
        <div key={index} className="quiz-block">
      {quiz.cover_image && <div className="quiz-image">
    <Image src={quiz.cover_image} width={60} height={60} alt='cover-image'/>
    </div>}
  
    <div className="quiz-details">
  <p className='quiz-title'>{quiz.title}</p>
    <p className='quiz-desc'>{quiz.description}</p>
    <p className='total-questions'>Total questions: {quiz.total_questions}</p>
  </div>
  </div> 
      </Link>
    })}
      </>}
    
    </div>
  )
}

export default PreviewBlock