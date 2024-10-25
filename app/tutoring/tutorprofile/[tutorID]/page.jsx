'use client'
import React, {useState, useEffect} from "react"
import '../../tutors.css'
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useContextUser } from "../../../hooks/Context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft, faUser,faClose } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import Messages from "../../../dashboard/messages"

const TutorProfile =()=>{
const [tutor,setTutor] = useState({})
const {userData,isAuthenticated} = useContextUser()
const {tutorID} = useParams()
const [connectonStatus,setConnectionStatus] = useState(null)
const [notSignedInWarning,setNotSignedInWarning] = useState(false)
const [studentCount,setStudentCount]= useState(0)
const [chatStatus,setChatStatus]= useState(null)
const [loading,setLoading] = useState(false)
const [showChats,setShowChats] = useState(false)
const router = useRouter()
//fuction to fetch tutor profile details
useEffect(()=>{
    const fetchTutor = async ()=>{
        try {
            const response  = await fetch(`https://varsitysteps-server.onrender.com/tutors/tutorprofile/${tutorID}`)
            const data = await response.json()
            if (response.ok){
                // console.log('this is user profile: ',data)
                setTutor(data.tutor)
                setStudentCount(data.studentCount)
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
        const response = await fetch(`https://varsitysteps-server.onrender.com/api/connectionrequest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({student_id:userData.id, tutor_id:tutorID }),
            credentials: 'include', 
          });
          if (response.ok){
            console.log('request sent successfully')
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
useEffect(()=>{
if(isAuthenticated){
    const checkConnection = async()=>{
        try {
            const response = await fetch( 'https://varsitysteps-server.onrender.com/api/connectionstatus',{
                method:'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({student_id:userData.id, tutor_id:tutorID }),
                credentials: 'include', 
              })
              if(response.ok){
                const data = await response.json()
                setConnectionStatus(data.status)
                  console.log('checking connection status', data)
              }else{
                  console.log('could not fetch connection')
              }
        } catch (error) {
            console.error(error)
        }
    }
checkConnection()
}
},[])


//function to check for existing chats between tutor and student
useEffect(()=>{
    if(isAuthenticated){
        const checkChatStatus = async()=>{
            try {
               const response = await fetch(`https://varsitysteps-server.onrender.com/messages/checkchats?user1=${tutorID}&user2=${userData.id}`,{
                   credentials:'include'
               })
               if(response){
                   const data = await response.json()
                   setChatStatus(data)
                   console.log('chats status in tutor page', data);
                   
               }else{
                   console.log('cant check status')
               }
           } catch (error) {
               console.error(error)
           }
       }
          
   checkChatStatus()
    }
  
},[])

return <section className='tutor-profile-container'>
    <div className="route"> 
            <p onClick={()=>router.back()}><FontAwesomeIcon icon={faArrowAltCircleLeft}/>Tutors</p>
        </div>
    <div className="profile-wrapper">
        {/* This div will align to left on desktop view and shows basic info */}
        <div className="tutor-basic-info">
            <div className="tutor-image">
                {tutor.profile_image ? <Image alt="profile-image" src={tutor.profile_image} priority={true} width={200} height={200}/> : <div className="tutor-profile-icon"><FontAwesomeIcon className='placeholder' icon={faUser}/></div> }
          
          </div>
          <div className="basic-info">
            <p>{tutor.username}</p>
            <p>{studentCount} Student(s)</p>
            {/* <div className="rating">
                <p>Rating:</p>
                <div class="star-rating">
                <input type="radio" id="5-stars" name="rating" value="5" />
                <label for="5-stars" class="star">&#9733;</label>

                <input type="radio" id="4-stars" name="rating" value="4" />
                <label for="4-stars" class="star">&#9733;</label>
  
                <input type="radio" id="3-stars" name="rating" value="3" />
                <label for="3-stars" class="star">&#9733;</label>
  
                <input type="radio" id="2-stars" name="rating" value="2" />
                <label for="2-stars" class="star">&#9733;</label>
  
                <input type="radio" id="1-star" name="rating" value="1" />
                <label for="1-star" class="star">&#9733;</label>
            </div>
            </div> */}
            <p>Minimum Fee: <span>${tutor.base_charge}/month</span></p>
            {loading ? <div className='btn-loader'></div> :<> {userData !== null && userData.id == tutorID ? "" :connectonStatus === 'connected' ? <button onClick={()=>setShowChats(true)}>Chat</button> : connectonStatus === 'pending' ?<button>Pending</button> : <button onClick={requestConnection}>Connect</button> }</> }
            
          </div>
        </div>

        {/*--------------------------------------------------------------
         modal to show warning if user wants to connect without signing in
         ----------------------------------------------------------- */}
        {notSignedInWarning && <div className="warning-modal">
            <div className="prompt">
                <div className="close-prompt"><FontAwesomeIcon onClick={()=>{setNotSignedInWarning(!notSignedInWarning)}} icon={faClose}/></div>
            <p><Link href='/auth/login'>Login</Link> to send a connection request to a tutor</p>
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
                    return <li key={index}>-{qualy}</li>   
                }):"Nothing to show yet"}
                </ul>
                
            </div>
            <div className="detailed-info-part">
                <h3>Teaches</h3>
                <ul className="list">
                {Array.isArray(tutor.teaches) && tutor.teaches.length > 0 ?tutor.teaches.map((subject,index)=>{
                    return <li key={index}>-{subject}</li>   
                }):"Nothing to show yet"}
                </ul>
                
            </div>
            <div className="detailed-info-part">
                <h3>Teaching Method</h3>
                <p>{tutor.teaching_method?tutor.teaching_method:'Nothing to show yet'}</p>
            </div>
        </div>
    </div>  

    {/* this section is for the messages section */}
    {showChats &&  <Messages setShowChats={setShowChats} chatStatus={chatStatus} receiver={tutor}/>}    
</section>
}
export default TutorProfile