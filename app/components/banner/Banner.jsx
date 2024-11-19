import React from 'react'
import './Banner.css';
import '../../globals.css';
import Link from 'next/link';
import { useContextUser } from '../../hooks/Context';


const Banner = () => {
  const{isAuthenticated} = useContextUser()
  return (
    <section className="banner">
    <div className="banner-content">
      <h1 className="headline">Empower Your Academic Journey with VarsitySteps</h1>
      <p className="subheadline">Discover resources, career opportunities, and support to enhance your educational experience.</p>
      {isAuthenticated?<Link href="/dashboard" className="cta-button">Dashboard</Link>:<Link href="/auth/login" className="cta-button">Join Us</Link>}
      
    </div>
    </section>
  )
}

export default Banner