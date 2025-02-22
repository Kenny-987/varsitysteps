import React from 'react'
import './Banner.css';
import '../../globals.css';
import Link from 'next/link';
import { useContextUser } from '../../hooks/Context';


const Banner = () => {
  const{isAuthenticated} = useContextUser()
  return (
    <header className="banner">
    <div className="banner-content">
      <h1 className="headline">Empower Your Academic Journey with VarsitySteps</h1>
      <p className="subheadline">Discover an array of tutors to help you with your academic journey.</p>
      {/* {isAuthenticated?<Link href="/dashboard" className="cta-button">Dashboard</Link>:<Link href="/auth/login" className="cta-button">Join Us</Link>} */}
      <div className="banner-cta">
      <Link href="/tutoring" className="cta-button">Find Tutors</Link>
      <Link href="/auth/tutorsignup" className="cta-button">Become a tutor</Link>
      </div>
      <Link href="/thearena" className="cta-button startquiz">Play a Quiz</Link>
      
    </div>
    </header>
  )
}

export default Banner