import React, { useState } from 'react'
import '../../globals.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './faq.css'
const Faq = () => {
    const [toggleAnswer,setToggleAnswer]=useState(null)
    
    const faqData = [
        {
          question: "What is VarsitySteps?",
          answer: "VarsitySteps is a platform that connects students with resources, tutors, and career guidance.",
        },
        {
          question:'Who can use VarsitySteps?',
          answer:"VarsitySteps is an inclusive platform, making it valuable for anyone involved in education, skills development, or career planning. Whether you’re seeking knowledge, sharing expertise, or building connections, VarsitySteps has something for everyone"
        },
        {
          question: "How can I become a tutor?",
          answer: "You can sign up on the platform, complete your profile, and apply to be listed as a tutor.",
        },
        {
          question: "I'm having trouble signing up or logging in",
          answer: "Make sure to allow cookies in your browser settings and allow cross-site tracking.",
        },
        {
          question: "Is VarsitySteps free to use?",
          answer: "The platform offers free resources, but certain services may come with a fee such as premium membership for tutors.",
        },
        {
            question: "Why is my profile not showing in the search results?",
            answer: "Ensure you add the subjects you teach as the system uses searched subjects to display tutor profiles.",
          },
      
      ];

    const toggleAnswerDisplay = (index) => {
        setToggleAnswer((prev) => (prev === index ? null : index));
    };
  return (
    <section className='faq-section'>
        <h1>Frequently asked questions</h1>
        <div className="faq-questions">
                {faqData.map((faq,index)=>{
                    return <div className='question-answer' key={index}>
                        <p className='question'>{faq.question} {toggleAnswer == index ? <FontAwesomeIcon onClick={()=>toggleAnswerDisplay(index)} icon={faMinusSquare}/>:<FontAwesomeIcon onClick={()=>toggleAnswerDisplay(index)} icon={faPlusSquare}/>}</p>
                        {toggleAnswer == index  && <p className="answer">{faq.answer}</p>}
                    </div>
                })}
        </div>
    </section>
  )
}

export default Faq