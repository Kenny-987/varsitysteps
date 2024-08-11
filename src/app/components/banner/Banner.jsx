import React from 'react'
import './Banner.css';
import '../../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown,faClose,faBars} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
const Banner = () => {
  return (
    <section className="banner">
    <div className="banner-content">
      <h1 className="headline">Empower Your Academic Journey with VarsitySteps</h1>
      <p className="subheadline">Discover resources, career opportunities, and support to enhance your educational experience.</p>
      <a href="#explore" className="cta-button">Explore Now</a>
    </div>
    </section>
  )
}

export default Banner