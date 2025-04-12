'use client'
import React, {useState,useEffect}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useContextUser } from '../../../../hooks/Context'


const RateTutor = ({setContent,user}) => {
const [hasRated,setHasRated]=useState(null)
const [rateScore,setRateScore]=useState(0)
const [hover, setHover] = useState(0);
const [review,setReview] = useState('')
const {userData}=useContextUser()
const [loading,setLoading] = useState(false)






//function to rate a tutor
const rateTutor = async (rater_id) => {
    setLoading(true)
    try {
        const response =  await fetch(`/api/tutors/rate`,{
            method:'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({rateScore,tutor_id:user.id,rater_id,review})
        })
        if(response.ok){
            setContent('dashboard')
            
        }else{
            console.log('oops');
        }
    } catch (error) {
        console.error(error)
    }finally{
        setLoading(false)
    }
    
}

//function to check if user has rated 
// useEffect(()=>{
// checkHasRated()
// },[])
//     const checkHasRated = async () => {
//         try {
//             const response =  await fetch(`/api/tutors/checkrate/${user.id}`,{
//                 credentials:'include'
//             })
//             if(response.ok){
//                 const data =  await response.json()
//                 setHasRated(data)
//                 console.log(data);
                
//             }else{
//                 console.log('oops');
                
//             }
//         } catch (error) {
//             console.error(error)
//         }
//     }

  return (
    <div className='overlay'>
        <div className="rate-tutor">
            <h4>{user.username}</h4>
        <div className="stars">
                    {[...Array(5)].map((star,index)=>{
                        index +=1;
                        return <button key={index}
                        className="rate-btn"
                        onClick={()=>setRateScore(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rateScore)}
                        >
                        <span><FontAwesomeIcon className={index <= (hover || rateScore) ? "on" : "off"} icon={faStar}/></span>
                        </button>
                    })}
                </div>
                <div className="review">
                    <label htmlFor="review"></label>
                    <textarea name="review" id='review'
                    value={review} 
                    placeholder='Leave a rewiew (optional)'
                    onChange={(e)=>{setReview(e.target.value)}}/>

                </div>
                {loading ? <div className='btn-loader'></div>:
                <div className="rate-options">
                <button className="rate-btn" onClick={()=>rateTutor(userData.id)}>submit</button>
                <button className="cancel-rate" onClick={()=>{setContent('dashboard')}}>cancel</button>
                </div>
                }
                

        </div>
        </div>
  )
}

export default RateTutor