'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope,faSchool, faUsers } from '@fortawesome/free-solid-svg-icons'
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
            <div className="dash-cardheader">
              <span className='dash-icon'><FontAwesomeIcon icon={faUsers}/></span>
            <p className='dash-title'>My {role=='tutor'?'Students':'Tutors'}</p>
            </div>
           <p className='dash-desc'>  {role=='tutor'?"Manage your students and track their progress":"View your tutors, start lessons and view resources and assignments"}</p>
            
           <Link href='/etutoring/userslist'><button>{role=='tutor'?'View Students':'View Tutors'}</button></Link> 
          </div>

          <div className="dashboard-card">
            <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faSchool}/></span>
            <p className='dash-title'>{role=='tutor'?"Group Classes":"My Classes"}</p>
            </div>
            <p className='dash-desc'>{role=='tutor'?'Schedule,manage and send files to several students in one place,and manage your classes':'Open and view classes you have been added to by your tutors'}.</p>
           <Link href='/etutoring/classes'><button>View Classes</button></Link>
          </div>

          <div className="dashboard-card">
            <div className="dash-cardheader">
            <span className='dash-icon'><FontAwesomeIcon icon={faEnvelope}/></span>
            <p className='dash-title'>Messages</p>
            </div>
            <p className='dash-desc'>Communicate with your {role=='tutor'?'students':'tutors'} using our messaging system. No need to share external contacts if you don't have to.</p>
            <Link href='/messages'><button>Go to Messages</button></Link>
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