import React from 'react'
import './Banner.css';
import '../../globals.css';

const Banner = () => {
  return (
    <section className="banner">
    <div className="banner-content">
      <h1 className="headline">Empower Your Academic Journey with VarsitySteps</h1>
      <p className="subheadline">Discover resources, career opportunities, and support to enhance your educational experience.</p>
      <a href="#explore" className="cta-button">Join Us</a>
    </div>
    </section>
  )
}

export default Banner