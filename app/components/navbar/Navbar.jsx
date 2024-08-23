"use client"
import React, { useState, useContext  } from 'react';
import './navbar.css';
import '../../globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown,faClose,faBars, faUser} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDashContext } from '../../context/dashContext';

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [innerDropdown, setInnerDropdown] = useState(false);
 const {authStatus,showDash,setShowDash} = useDashContext()
const { isAuthenticated } = authStatus; 



  const handleDropdown = () => {
    setDropdown(!dropdown);
    setInnerDropdown(false);
  };

  const handleInnerDropdown = () => {
    setInnerDropdown(!innerDropdown);
  };

  return (
    <nav>
      <div className="logo">VarsitySteps</div>
      <div className="mobile-menu-icons">
      <button className='showmenu' onClick={()=>{ setMobileNav(!mobileNav);setShowDash(false) }}>
        <FontAwesomeIcon icon={faBars}/>
      </button>
      {isAuthenticated == true && <button className="showdash" onClick={()=>setShowDash(!showDash)} >
      <Link href="/dashboard"><FontAwesomeIcon icon={faUser}/></Link>
      </button> }
      
      </div>
      <ul className={`links-parent ${mobileNav ? 'mobile' : ''}`}>
        <div className="close" onClick={()=>{
          setMobileNav(false)
        }}><FontAwesomeIcon icon={faClose}/></div>
        <li><Link href="/" onClick={() => setMobileNav(!mobileNav)}>Home</Link></li>
        <li
          onMouseEnter={handleDropdown}
          onMouseLeave={() => setDropdown(false)}
          onClick={handleDropdown}
        >
          Tools <span><FontAwesomeIcon icon={faCaretDown}/></span>
          {dropdown && (
            <ul className="dropdown">
              
              <li><Link href="/dashboard">Dashboard</Link></li>
              {/* <li><Link href="/finance">Financial Services</Link></li> */}
              <li><Link href="">Tutoring</Link></li>
              <li><Link href="">Accomodation</Link></li>
              <li><Link href="">Events and Activities</Link></li>
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
                    <li><Link href="">Academic Resources</Link></li>
                    <li><Link href="">College and University Listings</Link></li>
                    <li><Link href="">Internships</Link></li>
                    <li><Link href="">Career Guidance</Link></li>
                    <li><Link href="">Mental-Health Resources</Link></li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        <li><Link href="/about" onClick={() => setMobileNav(!mobileNav)}>About</Link></li>
        <li><Link href="/support" onClick={() => setMobileNav(!mobileNav)}>Support Us</Link></li>
        <li><Link href="" onClick={() => setMobileNav(!mobileNav)}>Contact</Link></li>
        {isAuthenticated == true ? <div className="dashIcon">
        <button className="showdash-widescreen" onClick={()=>setShowDash(!showDash)} >
      <Link href="/dashboard"><FontAwesomeIcon icon={faUser}/></Link>
      </button>
        </div> : <div className="login-btn">
          <button><Link href="/auth/login" onClick={() => setMobileNav(!mobileNav)}>Login</Link></button>
          <button><Link href="/auth/signup" onClick={() => setMobileNav(!mobileNav)}>Sign Up</Link></button>
        </div> }
      </ul>
    </nav>
  );
};

export default Navbar;
