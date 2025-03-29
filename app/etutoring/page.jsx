'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose, faEnvelope, faHamburger, faSchool, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import './etutoring.css'
import Link from 'next/link'
import Navbar from './Navbar'



const eTutoring = () => {
  const role = localStorage.getItem('role')
  
  return (
    <section className='etutoring'>
      <Navbar/>
      <div className="dashboard-container">
        <h3>Manage your online {role=='tutor'?'Tutoring':'Learning'}</h3>

        <div className="dashboard-grid">
          {/* Quick Access Links */}
          <div className="dashboard-card">
            <h3>My {role=='tutor'?'Students':'Tutors'}</h3>
            {role=='tutor'?<p>Manage your students and track their progress.</p>:<p>View your tutors, start lessons and view resources and assignments</p>}
            
            <button><Link href='/etutoring/userslist'>{role=='tutor'?'View Students':'View Tutors'}</Link> </button>
          </div>

          <div className="dashboard-card">
            <h3>{role=='tutor'?"Group Classes":"My Classes"}</h3>
            <p>{role=='tutor'?'Schedule,manage and send files to several students in one place,and manage your classes':'Open and view classes you have been added to by your tutors'}.</p>
            <button><Link href='/etutoring/classes'>View Classes</Link></button>
          </div>

          <div className="dashboard-card">
            <h3>Messages</h3>
            <p>Communicate with your {role=='tutor'?'students':'tutors'} using our messaging system. No need to share external contacts if you don't have to.</p>
            <button><Link href='/messages'>Go to Messages</Link></button>
          </div>

          {/* Upcoming Lessons */}
          {/* <div className="dashboard-card">
            <h3>Upcoming Lesson</h3>
            <p>Next lesson: Web Development (Tomorrow at 4 PM)</p>
            <button><Link href={''}>View Schedule</Link></button>
          </div> */}
        </div>
        </div>
      </section>
  )
}

export default eTutoring