"use client"
import React, { useState } from 'react';
import './navbar.css';
import '../../../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown,faClose} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [innerDropdown, setInnerDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
    setInnerDropdown(false); // Close inner dropdown when main dropdown toggles
  };

  const handleInnerDropdown = () => {
    setInnerDropdown(!innerDropdown);
  };

  return (
    <nav>
      <div className="logo">VarsitySteps</div>
      <button className='showmenu' onClick={() => setMobileNav(!mobileNav)}>
        ☰
      </button>
      <ul className={`links-parent ${mobileNav ? 'mobile' : ''}`}>
        <div className="close" onClick={()=>{
          setMobileNav(false)
        }}><FontAwesomeIcon icon={faClose}/></div>
        <li><a href="">Home</a></li>
        <li
          onMouseEnter={handleDropdown}
          onMouseLeave={() => setDropdown(false)}
          onClick={handleDropdown}
        >
          Tools <span><FontAwesomeIcon icon={faCaretDown}/></span>
          {dropdown && (
            <ul className="dropdown">
              <li><a href="">Dashboard</a></li>
              <li><a href="">Financial Services</a></li>
              <li><a href="">Tutoring</a></li>
              <li><a href="">Accomodation</a></li>
              <li><a href="">Events and Activities</a></li>
              <li
                onMouseEnter={handleInnerDropdown}
                onMouseLeave={() => setInnerDropdown(false)}
                onClick={(event)=>{
                  event.stopPropagation();
                 setInnerDropdown(!innerDropdown)
                }}
              >
                Skills and Career Development <span><FontAwesomeIcon icon={faCaretDown}/></span>
                {innerDropdown && (
                  <ul className='inner-dropdown'>
                    <li><a href="">Academic Resources</a></li>
                    <li><a href="">College and University Listings</a></li>
                    <li><a href="">Internships</a></li>
                    <li><a href="">Career Guidance</a></li>
                    <li><a href="">Mental-Health Resources</a></li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        <li><a href="">About</a></li>
        <li><a href="">Support Us</a></li>
        <li><a href="">Contact</a></li>
        <div className="login-btn">
          <button><a href="">Login</a></button>
          <button><a href="">Sign Up</a></button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
