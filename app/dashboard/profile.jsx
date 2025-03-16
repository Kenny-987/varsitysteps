'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBookOpen,faUniversity,faLocationDot,faUser,faCamera, faInfoCircle, faCircleCheck,faUserEdit, faClose,  faPen} from '@fortawesome/free-solid-svg-icons';
import EditImage from './ImageEdit';
import TutorForm from './TutorForm';
import Link from 'next/link';

const Profile = ({userData}) => {
const [editImage,setEditImage]=useState(false)
const [showTutorModal,setShowTutorModal]=useState(false)
const [showSubmitForm,setShowSubmitForm]=useState(false)




  return (
    <section className="profile">
{/* modal for tutor signup */}
{showTutorModal && <div className="creative-signup">
      <div className="creative-info"> 
        <h3>Become a tutor <FontAwesomeIcon icon={faClose} onClick={()=>{setShowTutorModal(false)}}/></h3>
        <p>Are you ready to share your knowledge and help others succeed? The VarsitySteps Tutor Program allows you to turn your skills into valuable lessons for students eager to learn. Whether you're passionate about a particular subject, a skill, or an area of expertise, becoming a tutor gives you the opportunity to make a real difference. Connect with learners, build your reputation, and earn as you teach. Take the next step in your journey by becoming a tutor and inspiring others today.</p>
        <div className="edit-btn ">
        <button className='creatives'onClick={()=> setShowSubmitForm(true)}>Get Started</button>
        <button className='creatives' onClick={()=> {setShowTutorModal(false)}}>Maybe Later</button>
        </div>
        {showSubmitForm && <div className="basic-creator-info">
          <TutorForm setShowTutorModal={setShowTutorModal} />
        </div> }
      </div>
    </div>}
    {/* modal for tutor signup */}

  {/* this modal is for editing profile image */}
  {editImage && <div className="edit-modal">
        <EditImage Id={userData.id} 
        profile_image={userData.profile_image}
         setEditImage={setEditImage}
         setProfileImage={setProfileImage}
         />
        </div>}
        {/* this modal is for editing profile image */}

      {/* code for the header section of profile page */}
      <div className="profile-header">
        <div className="background">
          <Image src='/images/Sprinkle_2.svg' alt='background-image' width={100} height={200}/>
        </div>
        <div className="profile-img-name">
        <div className="profile-img">
        {userData.profile_image ?<Image alt="profile-image" onClick={()=>setEditImage(true)} src={userData.profile_image} width={120} height={120}/>: <div className="icons">
          <FontAwesomeIcon onClick={()=>setEditImage(true)} className="icon" icon={faUser}/>
        </div> }
        <FontAwesomeIcon onClick={()=>setEditImage(true)} className="edit-profileImage-icon" icon={faCamera}/>
      </div>
        </div>
      </div>
      {/* end of code for the header section of profile page */}
     
       
        {/* profile content */}
        <div className="profile-content">
        <div className="profile-username">
           <p>{userData.username}</p>
           <p>{userData.email} {userData.is_verified ?<span className='verified-email'>email verified <FontAwesomeIcon icon={faCircleCheck}/></span>:<Link href='/auth/verify-email' className='verify-email-link'>verify email <FontAwesomeIcon icon={faCircleCheck}/></Link>}</p>
      </div>

        <div className="edit-btn">
        <button><Link style={{color:"#fff"}}href='/dashboard/editprofile'><FontAwesomeIcon icon={faUserEdit}/> Edit Profile</Link></button>
        {userData.role_name.includes('tutor') ? 
         <button><Link href={'/tutordashboard'} style={{color:'#fff'}}>Tutor Dashboard</Link></button>: 
        <button onClick={()=> setShowTutorModal(true)} className="creative"><FontAwesomeIcon icon={faPen}/> Become a tutor</button>}
        
       
        
      </div>

      <div className="user-detail">
            <p><FontAwesomeIcon icon={faInfoCircle}/> Bio</p>
        {userData.bio?<p>{userData.bio}</p>:<button><Link href='/dashboard/editprofile#bio'>Add bio</Link></button>}
      </div>
      
          <div className="user-details">
          <div className="user-detail">
        <p>Location:</p>
        {userData.location?<p><FontAwesomeIcon icon={faLocationDot}/> {userData.location}</p>:<button><Link href='/dashboard/editprofile#locstion'>Add location</Link></button>}
      </div>
      {/* <div className="user-detail">
      <p>Phone:</p>
      {userData.phone?<p><FontAwesomeIcon icon={faPhone}/> {userData.phone}</p>:<button onClick={()=> setShowEditForm(true)}>Add number</button>}
      </div> */}
      <div className="user-detail">
        <p>Programme:</p>
        {userData.programme?<p><FontAwesomeIcon icon={faBookOpen}/> {userData.programme?userData.programme:'No programme'}</p>:<button><Link href='/dashboard/editprofile#programme'>Add programme</Link></button>}
      
      </div>
      <div className="user-detail">
        <p>Institution:</p>
        {userData.institution?<p><FontAwesomeIcon icon={faUniversity}/> {userData.institution?userData.institution:'No Institution'}</p>:<button><Link href='/dashboard/editprofile#institute'>Add institution</Link></button>}
     
      </div>
          </div>
        </div>
    </section>
  )
}

export default Profile