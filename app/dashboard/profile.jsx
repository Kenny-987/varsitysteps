import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faPhone,faEnvelope,faUserGraduate,faBookOpen,faCalendar,faUniversity, faInfoCircle} from '@fortawesome/free-solid-svg-icons';


const Profile = ({user}) => {

  return (
    <section className="profile">
      <div className="profile-img">
      {/* <FontAwesomeIcon icon={faUser}/> */}
      <Image alt="profile-image" src={"/images/kenny.jpg"} width={200} height={200}/>
      </div>
      <div className="user-detail">
        <p>Name:</p>
      <p><FontAwesomeIcon icon={faUserGraduate}/> {user.username}</p>
      </div>
      <div className="user-detail">
      <p>Phone:</p>
      <p><FontAwesomeIcon icon={faPhone}/> 0719551509</p>
      </div>
      <div className="user-detail">
        <p>Email:</p>
      <p><FontAwesomeIcon icon={faEnvelope}/> {user.email}</p>
      </div>
      <div className="user-detail">
        <p>Programme:</p>
      <p><FontAwesomeIcon icon={faBookOpen}/> Information Technology</p>
      </div>
      <div className="user-detail">
        <p>Institution:</p>
      <p><FontAwesomeIcon icon={faUniversity}/> Bulawayo Poly</p>
      </div>
      <div className="user-detail">
        <p>Duration:</p>
      <p><FontAwesomeIcon icon={faCalendar}/> 2022-2025</p>
      </div>
      <div className="user-detail">
        <p><FontAwesomeIcon icon={faInfoCircle}/> Bio</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus voluptatum consequatur excepturi a magni beatae quia doloribus laborum quod sequi asperiores facere quaerat impedit vero at nemo, sit corporis placeat? Quo nihil nemo vero. Beatae et perferendis, earum laudantium iure modi saepe a autem, labore praesentium non qui voluptatum consequatur!</p>
      </div>
      
      <div className="edit-btn">
        <button>Edit Profile</button>
      </div>
    </section>
  )
}

export default Profile