'use client'
import React, {useState, useEffect} from "react"
import '../../tutors.css'
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useContextUser } from "../../../hooks/Context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft, faUser,faClose, faStar, faStarHalf, faCircle, faShareFromSquare } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"


const TutorProfile =()=>{
const [tutor,setTutor] = useState({})
const {userData,isAuthenticated} = useContextUser()
const {tutorID} = useParams()
const [connectonStatus,setConnectionStatus] = useState(null)
const [notSignedInWarning,setNotSignedInWarning] = useState(false)
const [loading,setLoading] = useState(false)
const router = useRouter()

//fuction to fetch tutor profile details
useEffect(()=>{
    const fetchTutor = async ()=>{
        // setLoading(true)
        try {
            const response  =  await fetch(`/api/tutors/tutorprofile/${tutorID}`)
            const data =  await response.json()
            if (response.ok){
                setTutor(data)
            }else{
                console.log('error fetching profile')
            }
        } catch (error) {
            console.error(error)
        }
    }
    fetchTutor()
},[])

//function to request a connection with a tutor
const requestConnection =async()=>{
if(isAuthenticated){
    console.log('sending request')
    setLoading(true)
    try {
        const response =  await fetch(`/api/api/connectionrequest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({student_id:userData.id, tutor_id:tutorID }),
            credentials: 'include', 
          });
          if (response.ok){
            setConnectionStatus('pending')
            setLoading(false)
          }
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
    }else{
    setNotSignedInWarning(true)
    }


}

//function to check if user is connected
    const checkConnection = async()=>{
        try {
            const response =  await fetch( '/api/connectionstatus',{
                method:'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({student_id:userData.id, tutor_id:tutorID }),
                credentials: 'include', 
              })
              if(response.ok){
                const data =  await response.json()
                setConnectionStatus(data.status)
              }else{
                  console.log('could not fetch connection')
              }
        } catch (error) {
            console.error(error)
        }
    }


useEffect(()=>{
    if(isAuthenticated){
        checkConnection()
    }
},[])



return <section className='tutor-profile-container'>
    <div className="route"> 
            <p onClick={()=>router.back()}><FontAwesomeIcon icon={faArrowAltCircleLeft}/></p>
        </div>
    <div className="profile-wrapper">
        {/* This div will align to left on desktop view and shows basic info */}
        <div className="tutor-basic-info">
        {tutor.is_premium  &&<p className='feature-icon'><FontAwesomeIcon icon={faStar} color="purple"/> Featured</p>}
            <div className="tutor-image">
                {tutor.profile_image ? <Image alt="profile-image" src={tutor.profile_image} priority={true} width={200} height={200}/> : <div className="tutor-profile-icon"><FontAwesomeIcon className='placeholder' icon={faUser}/></div> }
                
          </div>
          <div className="basic-info">
            <p>{tutor.username}</p>
            <p>{tutor.location}</p>
            <p>{tutor.student_count} Student(s)</p>
            <div className="rating">
                <p>Rating:</p>
                <div className="rating-stars">
                {[...Array(5)].map((_, index) => {

                const ratingValue = Number(tutor.average_rating);
                const fullStars = Math.floor(ratingValue);
                const hasHalfStar = ratingValue % 1 >= 0.5;

                if (index < fullStars) {
                    return <span key={index} className="star filled"><FontAwesomeIcon icon={faStar}/></span>;
                } else if (index === fullStars && hasHalfStar) {
                    return <span key={index} className="star half"><FontAwesomeIcon icon={faStarHalf}/></span>;
                } else {
                    return <span key={index} className="star"><FontAwesomeIcon icon={faStar}/></span>;
                }
                })}
                </div>
                <span>{Math.round(Number(tutor.average_rating)* 10)/10} ({tutor.total_ratings} ratings)</span>
            </div>
            <p>Minimum Fee: <span>${tutor.base_charge}/month</span></p>
            {tutor.phone  && tutor.is_premium &&
                <button className="whatsapp-link"><Link href={`https://wa.me/+${tutor.phone}`}><FontAwesomeIcon icon={faWhatsapp}/> Message Tutor</Link></button>
            }
            {loading ? <div className='btn-loader'></div> :
            <> {userData !== null && userData.id == tutorID ? "" :connectonStatus === 'connected' ? <button className="basic-info-btn"><Link href={`/messages?receiver_id=${tutorID}`}>Chat</Link></button> : 
            connectonStatus === 'pending' ?<button className="basic-info-btn">Pending</button> : 
            <button className="basic-info-btn" onClick={requestConnection}>Connect</button> }</> }

          </div>
        </div>

       

        
        {/*--------------------------------------------------------------
         modal to show warning if user wants to connect without signing in
         ----------------------------------------------------------- */}
        {notSignedInWarning && <div className="overlay">
            <div className="prompt">
                <div className="close-prompt"><FontAwesomeIcon onClick={()=>{setNotSignedInWarning(!notSignedInWarning)}} icon={faClose}/></div>
            <p><Link href={`/auth/login?redirect=${`/tutoring/tutorprofile/${tutor.id}`}`}>Login</Link> to connect with tutor</p>
            </div>
            {/*--------------------------------------------------------------
         modal to show warning if user wants to connect without signing in
         ----------------------------------------------------------- */}
            
        </div>}
        {/* This div will align to right on desktop view and shows more detailed info */}
        <div className="tutor-detailed-info">
            <div className="detailed-info-part">
                <h3>About {tutor.username?tutor.username:""}</h3>
                 <p>{tutor.bio?tutor.bio:'Nothing to show yet'}</p>
            </div>
            <div className="detailed-info-part">
                <h3>Qualifications/Education</h3>
                <ul className="list">
                {Array.isArray(tutor.qualifications) && tutor.qualifications.length > 0?tutor.qualifications.map((qualy,index)=>{
                    return <li key={index}><FontAwesomeIcon icon={faCircle} style={{fontSize:'8px'}}/> {qualy}</li>   
                }):"Nothing to show yet"}
                </ul>
                
            </div>
            <div className="detailed-info-part">
                <h3>Teaches</h3>
                <ul className="list">
                {Array.isArray(tutor.teaches) && tutor.teaches.length > 0 ?tutor.teaches.map((subject,index)=>{
                    return <li key={index}><FontAwesomeIcon icon={faCircle} style={{fontSize:'8px'}}/> {subject}</li>   
                }):"Nothing to show yet"}
                </ul>
                
            </div>
            <div className="detailed-info-part">
                <h3>Teaching Method</h3>
                <p>{tutor.teaching_method?tutor.teaching_method:'Nothing to show yet'}</p>
            </div>
        </div>
    </div>   
</section>
}
export default TutorProfile