'use client'
import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope,faBookOpen,faLocationDot,faGraduationCap,faCircle, faInfoCircle,faChalkboardTeacher,faDollarSign,faUser, faCamera, faCircleCheck, faStar} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import EditImage from '../dashboard/ImageEdit';
import Link from 'next/link';
import './css/premium.css'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const TutorProfile = ({user}) => {
    const [showEditForm,setShowEditForm] = useState(false)
    const [editImage,setEditImage]=useState(false)

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
      <p>{user.email} {user.is_verified ?<span className='verified-email'>email verified <FontAwesomeIcon icon={faCircleCheck}/></span>:<Link href='/auth/verify-email' className='verify-email-link'>verify email <FontAwesomeIcon icon={faCircleCheck}/></Link>}</p>
      </div>

      {user.is_premium ? "":<button className='premium-cta-btn'><Link href='/tutordashboard/premium-checkout'><FontAwesomeIcon icon={faStar}/> Boost your profile, Get Premium for $4/month</Link></button>}
      
      
      <div className="edit-btn">
        <button><Link style={{color:'#fff'}} href='tutordashboard/editprofile'>Edit Profile</Link></button>
        <button><Link style={{color:'#fff'}}href= {`/tutoring/tutorprofile/${user.id}`}>View my profile</Link></button>
        {user.role_name.includes('student') && <button><Link href={'/dashboard'} style={{color:'#fff'}}>Back to student dashboard</Link></button> }
      </div>
      
      <div>
      {/* <div className="badge">
          <FontAwesomeIcon icon={faRibbon}/>
      </div> */}
        {/* <p>Your average rating</p> */}
      </div>
        <div>
        <p><FontAwesomeIcon icon={faInfoCircle}/> Bio</p>
        <div className="user-detail">
        {user.bio?<p>{user.bio}</p>:<button><Link href='tutordashboard/editprofile#bio'>Add Bio</Link></button>}
        </div>
      </div>
      
      <div className="user-details">
      <div className="user-detail">
        <p>Minimum Charge/month:</p>
        {user.base_charge?<p><FontAwesomeIcon icon={faDollarSign}/> {user.base_charge}</p>:<button>
          <Link href='/tutordashboard/editprofile#charge'>Add Charge</Link></button>}
      
      </div>
      <div className="user-detail">
        <p>Location:</p>
        {user.location?<p><FontAwesomeIcon icon={faLocationDot}/> {user.location}</p>:<button><Link href='/tutordashboard/editprofile#location'>Add location</Link></button>}
      </div>

      {user.is_premium ? 
      <div className="user-detail">
      <p>WhatsApp number:</p>
      {user.phone?<button>
        <Link href={`https://wa.me/+${user.phone}`}><FontAwesomeIcon icon={faWhatsapp}/> +{user.phone}</Link></button>
          :<button><Link href='/tutordashboard/editprofile#phone'>Add Number</Link></button>}
      </div>:<div className="user-detail">
      <p>WhatsApp number:</p>
      {<button><FontAwesomeIcon icon={faStar}/> <Link href='/tutordashboard/premium-checkout'>Get premium and include a direct link to your WhatsApp</Link></button>}
      </div> }
      

      <div className="user-detail">
        <p>Email:</p>
        {<p><FontAwesomeIcon icon={faEnvelope}/> {user.email}</p>}
      </div>
      <div className="user-detail">
        <p><FontAwesomeIcon icon={faBookOpen}/> Subjects/Modules you teach</p>
      {user.teaches&& user.teaches.length>0?user.teaches.map((sub,index)=>{
        return <div key={index}>
          <ul>
            <li><FontAwesomeIcon icon={faCircle} style={{fontSize:'8px'}}/> {sub}</li>
          </ul>
        </div>
      }):<button><Link href='/tutordashboard/editprofile#teaches'>Add Subjects</Link></button>}
      </div>
      <div className="user-detail">
        <p><FontAwesomeIcon icon={faGraduationCap}/> Qaulifications:</p>
        {user.qualifications && user.qualifications.length>0?user.qualifications.map((qualy,index)=>{
          return <div key={index}>
          <ul>
            <li><FontAwesomeIcon icon={faCircle} style={{fontSize:'8px'}}/> {qualy}</li>
          </ul>
        </div>
        }):<button><Link href='/tutordashboard/editprofile#qualifications'>Add Qualifications</Link></button>}
      
      </div>
      
      <div className="user-detail">
        <p><FontAwesomeIcon icon={faChalkboardTeacher}/> Teaching Method</p>
        {user.teaching_method?<p>{user.teaching_method}</p>:<button><Link href='/tutordashboard/editprofile#method'>Add Method</Link></button>}
        
      </div>
      {/* here is an option for premium users to add direct links to their social media */}
      {/* <div className="user-detail">
        <p><FontAwesomeIcon icon={faGlobe}/> Social Media Links</p>
        {user.teaching_method?<p>{user.teaching_method}</p>:<button onClick={()=> setShowEditForm(true)}>Add Links</button>}
        
      </div> */}
      </div>
      {user.is_premium?'':<div className="premium-cta">
      <p><span>Become a Premium Member</span></p>
      <ul>
        <li><FontAwesomeIcon icon={faStar}/> Upgrade to Premium for Priority Listing and Enhanced Visibility to Boost Your Profile!</li>
        <li><FontAwesomeIcon icon={faStar}/> Make your contact details visible with a direct link to your WhatsApp – no need for students to connect first to start chatting with you!</li>
        <li><FontAwesomeIcon icon={faStar}/> Unlimited subjects</li>
        <li><FontAwesomeIcon icon={faStar}/> Get Priority support and assistance</li>
        <li><FontAwesomeIcon icon={faStar}/> Remove this ad</li>
      </ul>
      <button><Link href='/tutordashboard/premium-checkout'>Get Premium for $4/month</Link></button>
      </div>}
        </div>
      
      {showEditForm && <EditTutorProfile setShowEditForm={setShowEditForm} user={user}/> }
    </section>
  )
}

export default TutorProfile