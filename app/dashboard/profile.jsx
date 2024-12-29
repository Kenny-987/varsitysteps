'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhone,faBookOpen,faUniversity,faLocationDot,faUser,faCamera, faInfoCircle, faCircleCheck,faUserEdit, faClose,  faPen} from '@fortawesome/free-solid-svg-icons';
import EditProfile from './EditProfile';
import EditImage from './ImageEdit';
import CreativeForm from './CreativeForm';
import TutorForm from './TutorForm';
import Link from 'next/link';

const Profile = ({userData,creatorData,setContent}) => {
const [showEditForm,setShowEditForm] = useState(false)
const [editImage,setEditImage]=useState(false)
const [profileImage, setProfileImage] = useState(userData.profile_image)
const [loadingImage,setLoadingImage]=useState(false)
const [showCreative,setShowCreative]=useState(false)
const [showTutorModal,setShowTutorModal]=useState(false)
const [showSubmitForm,setShowSubmitForm]=useState(false)
const [tutorOption,setTutorOption]=useState(false)



  return (
    <section className="profile">

    {/* modal for creative signup */}
    {showCreative && <div className="creative-signup">
      <div className="creative-info"> 
        <h3>Discover the Creative Section <FontAwesomeIcon icon={faClose} onClick={()=>setShowCreative(false)}/></h3>
        <p>The Creative Section on VarsitySteps is your space to showcase, explore, and celebrate creativity in all its forms. Whether you're an artist, designer, writer, journalist, or an innovator in any field, this is where you share your work with a community that values expression and originality. From art to stories, designs to innovations, the Creative Section is where ideas come to life, talents are discovered, and collaboration thrives. Share your passion, get inspired, and connect with like-minded creatives today.</p>
        <div className="edit-btn ">
        <button className='creatives'onClick={()=> setShowSubmitForm(true)}>Get Started</button>
        <button className='creatives' onClick={()=> setShowCreative(false)}>Maybe Later</button>
        </div>
        {/* sub modal to submit basic creator info  */}
        {showSubmitForm && <div className="basic-creator-info">
          <CreativeForm setShowCreative={setShowCreative}/>
        </div> }
        {/* sub modal to submit basic creator info  */}
      </div>
    </div>}
    {/* modal for creative signup */}

{/* modal for tutor signup */}
{showTutorModal && <div className="creative-signup">
      <div className="creative-info"> 
        <h3>Become a tutor <FontAwesomeIcon icon={faClose} onClick={()=>{setShowTutorModal(false);setTutorOption(false)}}/></h3>
        <p>Are you ready to share your knowledge and help others succeed? The VarsitySteps Tutor Program allows you to turn your skills into valuable lessons for students eager to learn. Whether you're passionate about a particular subject, a skill, or an area of expertise, becoming a tutor gives you the opportunity to make a real difference. Connect with learners, build your reputation, and earn as you teach. Take the next step in your journey by becoming a tutor and inspiring others today.</p>
        <div className="edit-btn ">
        <button className='creatives'onClick={()=> setShowSubmitForm(true)}>Get Started</button>
        <button className='creatives' onClick={()=> {setShowTutorModal(false);setTutorOption(false)}}>Maybe Later</button>
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
        <button onClick={()=> setShowEditForm(true)}><FontAwesomeIcon icon={faUserEdit}/> Edit Profile</button>
        <button onClick={()=> setShowTutorModal(true)} className="creative"><FontAwesomeIcon icon={faPen}/> Become a tutor</button>
        {/* {!creatorData ? <button onClick={()=> setShowCreative(true)} className="creative"><FontAwesomeIcon icon={faStar}/> Showcase your talent</button>:<button onClick={()=> setContent('Creator')} className="creative"><FontAwesomeIcon icon={faStar}/> Creator Panel</button>}
        {!userData.role_name.includes('tutor') ?
        <div className="tutor-option">
        <button style={{borderRadius:"50%"}} onClick={()=>{setTutorOption(!tutorOption)}}><FontAwesomeIcon icon={faEllipsis}/></button>
        {tutorOption &&<button onClick={()=> setShowTutorModal(true)} className='tutor'>Become a tutor</button> }
        </div> : <p><Link href='/tutordashboard'>Tutor Dashboard</Link></p>} */}
        
      </div>

      <div className="user-detail">
            <p><FontAwesomeIcon icon={faInfoCircle}/> Bio</p>
        {userData.bio?<p>{userData.bio}</p>:<button onClick={()=> setShowEditForm(true)}>Add bio</button>}
      </div>
      
          <div className="user-details">
          <div className="user-detail">
        <p>Location:</p>
        {userData.location?<p><FontAwesomeIcon icon={faLocationDot}/> {userData.location}</p>:<button onClick={()=> setShowEditForm(true)}>Add location</button>}
      </div>
      <div className="user-detail">
      <p>Phone:</p>
      {userData.phone?<p><FontAwesomeIcon icon={faPhone}/> {userData.phone}</p>:<button onClick={()=> setShowEditForm(true)}>Add number</button>}
      </div>
      <div className="user-detail">
        <p>Programme:</p>
        {userData.programme?<p><FontAwesomeIcon icon={faBookOpen}/> {userData.programme?userData.programme:'No programm'}</p>:<button onClick={()=> setShowEditForm(true)}>Add programme</button>}
      
      </div>
      <div className="user-detail">
        <p>Institution:</p>
        {userData.institution?<p><FontAwesomeIcon icon={faUniversity}/> {userData.institution?userData.institution:'No Institution'}</p>:<button onClick={()=> setShowEditForm(true)}>Add institution</button>}
     
      </div>
          </div>
          {/* creator data section */}
        {/* {creatorData && 
        <>
        <h3>Creator Info</h3>
        <div className="user-details">
          <div className="user-detail">
        <p>Field:</p>
        {creatorData.field?<p><FontAwesomeIcon icon={faLocationDot}/> {creatorData.field}</p>:<button onClick={()=> setShowEditForm(true)}>Edit Field</button>}
      </div>
      <div className="user-detail">
        <p><FontAwesomeIcon icon={faBriefcase}/> Specializations:</p>
        {creatorData.specializations&& creatorData.specializations.length>0?creatorData.specializations.map((spec,index)=>{
        return <div key={index}>
          <ul>
            <li>{spec}</li>
          </ul>
        </div>
      }):<button onClick={()=> setShowEditForm(true)}>Add Skills</button>}
      </div>
      <div className="user-detail">
      <p><FontAwesomeIcon icon={faGears}/> Skills:</p>
      {creatorData.skills&& creatorData.skills.length>0?creatorData.skills.map((skill,index)=>{
        return <div key={index}>
          <ul>
            <li>{skill}</li>
          </ul>
        </div>
      }):<button onClick={()=> setShowEditForm(true)}>Add Skills</button>}
      </div>
  
          </div>
        </>
        } */}
      {showEditForm && <EditProfile setShowEditForm={setShowEditForm} creatorData={creatorData} user={userData}/> }
        </div>
    </section>
  )
}

export default Profile