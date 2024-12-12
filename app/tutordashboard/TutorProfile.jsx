'use client'
import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhone,faEnvelope,faBookOpen,faLocationDot, faUserAlt, faGraduationCap, faInfoCircle,faChalkboardTeacher,faDollarSign,faUser, faCamera,faClose, faDotCircle, faMinus, faListSquares, faCaretRight, faCircle, faGlobe, faRibbon, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import EditTutorProfile from './EditTutorProfile';
import EditImage from '../dashboard/ImageEdit';
import Link from 'next/link';
import PremiumModal from './PremiumModal';



const TutorProfile = ({user}) => {
    const [showEditForm,setShowEditForm] = useState(false)
    const [editImage,setEditImage]=useState(false)
    const [showPremiumModal,setShowPremiumModal]=useState(false)
    console.log(user);
    

  return (
    <section className="profile">
         {/* code for the header section of profile page */}
         <div className="profile-header">
        <div className="background">
          <Image src='/images/Sprinkle_2.svg' alt='background' width={100} height={200}/>
        </div> 
        <div className="profile-img-name">
        <div className="profile-img">
        {user.profile_image ?<Image alt="profile-image" onClick={()=>setEditImage(true)} src={user.profile_image} width={120} height={120}/>: <div className="icons">
          <FontAwesomeIcon onClick={()=>setEditImage(true)} className="icon" icon={faUser}/>
        </div> }
        <FontAwesomeIcon onClick={()=>setEditImage(true)} className="edit-profileImage-icon" icon={faCamera}/>
      </div>
      
        </div>
      </div>
      {/* end of code for the header section of profile page */}
      
      {editImage && <div className="edit-modal">
        <EditImage 
          Id={user.id} 
          profile_image={user.profile_image} 
          setEditImage={setEditImage}/>
        </div>}
        
        <div className="profile-content">
        <div className="profile-username">
      <p>{user.username} </p>
      <p>{user.email}</p>
      </div>

      {/* {user.is_verified ?<span className='verified-email'>email verified<FontAwesomeIcon icon={faCircleCheck}/></span>:<Link href='/auth/verify-email' className='verify-email-link'>verify email<FontAwesomeIcon icon={faCircleCheck}/></Link>} */}

      <div className="edit-btn">
        <button onClick={()=> setShowEditForm(true)}>Edit Profile</button>
        {user.role_name.includes('student') && <button><Link href={'/dashboard'} style={{color:'#fff'}}>Back to student dashboard</Link></button> }
      </div>
      
      <div>
      {/* <div className="badge">
          <FontAwesomeIcon icon={faRibbon}/>
      </div> */}
        <p>Your average rating</p>
      </div>
        <div>
        <p><FontAwesomeIcon icon={faInfoCircle}/> Bio</p>
        <div className="user-detail">
        {user.bio?<p>{user.bio}</p>:<button onClick={()=> setShowEditForm(true)}>Edit Bio</button>}
        </div>
      </div>
      
      <div className="user-details">
      <div className="user-detail">
        <p>Minimum Charge/month:</p>
        {user.base_charge?<p><FontAwesomeIcon icon={faDollarSign}/> {user.base_charge}</p>:<button onClick={()=> setShowEditForm(true)}>Edit Charge</button>}
      
      </div>
      <div className="user-detail">
        <p>Location:</p>
        {user.location?<p><FontAwesomeIcon icon={faLocationDot}/> {user.location}</p>:<button onClick={()=> setShowEditForm(true)}>Edit location</button>}
      </div>

      <div className="user-detail">
      <p>Phone:</p>
      {user.phone?<p><FontAwesomeIcon icon={faPhone}/> {user.phone}</p>:<button onClick={()=> setShowEditForm(true)}>Edit Phone</button>}
      </div>

      <div className="user-detail">
        <p>Email:</p>
        {user.email?<p><FontAwesomeIcon icon={faEnvelope}/> {user.email}</p>:<button onClick={()=> setShowEditForm(true)}>Edit Email</button>}
      </div>
      <div className="user-detail">
        <p><FontAwesomeIcon icon={faBookOpen}/> Subjects/Modules you teach</p>
      {user.teaches&& user.teaches.length>0?user.teaches.map((sub,index)=>{
        return <div key={index}>
          <ul>
            <li><FontAwesomeIcon icon={faCircle} style={{fontSize:'8px'}}/> {sub}</li>
          </ul>
        </div>
      }):<button onClick={()=> setShowEditForm(true)}>Edit Subjects</button>}
      </div>
      <div className="user-detail">
        <p><FontAwesomeIcon icon={faGraduationCap}/> Qaulifications:</p>
        {user.qualifications && user.qualifications.length>0?user.qualifications.map((qualy,index)=>{
          return <div key={index}>
          <ul>
            <li><FontAwesomeIcon icon={faCircle} style={{fontSize:'8px'}}/> {qualy}</li>
          </ul>
        </div>
        }):<button onClick={()=> setShowEditForm(true)}>Edit Qualifications</button>}
      
      </div>
      
      <div className="user-detail">
        <p><FontAwesomeIcon icon={faChalkboardTeacher}/> Teaching Method</p>
        {user.teaching_method?<p>{user.teaching_method}</p>:<button onClick={()=> setShowEditForm(true)}>Edit Method</button>}
        
      </div>
      {/* here is an option for premium users to add direct links to their social media */}
      {/* <div className="user-detail">
        <p><FontAwesomeIcon icon={faGlobe}/> Social Media Links</p>
        {user.teaching_method?<p>{user.teaching_method}</p>:<button onClick={()=> setShowEditForm(true)}>Add Links</button>}
        
      </div> */}
      </div>
      {/* <div className="premium-cta">
      <p><span>Become a Premium Member</span></p>
      <ul>
        <li>Boost your profile</li>
        <li>Priority Listing & Increased Visibility</li>
        <li>Exclusive Advertising</li>
        <li>Share social media links</li>
        <li>Unlock detailed analysis</li>
      </ul>
      <button onClick={()=>setShowPremiumModal(true)}>Get Premium</button>
      </div> */}
        </div>
      
      {showPremiumModal && <PremiumModal/>}
      {showEditForm && <EditTutorProfile setShowEditForm={setShowEditForm} user={user}/> }
    </section>
  )
}

export default TutorProfile