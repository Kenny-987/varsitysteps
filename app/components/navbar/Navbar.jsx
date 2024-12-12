"use client"
import React, { useState,useMemo  } from 'react';
import './navbar.css';
import '../../globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown,faClose,faBars, faUser, faBell, faArchive} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContextUser } from '../../hooks/Context';
import Notifications from '../notifications/Notifications';
import BottomNavbar from './BottomNavbar';

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [innerDropdown, setInnerDropdown] = useState(false);
 const {userData,isAuthenticated,setShowDash,showDash,notificationCount} = useContextUser()
  const [showNotifications,setShowNotifications]=useState(false)
  const handleDropdown = () => {
    setDropdown(!dropdown);
    setInnerDropdown(false);
  };

  const handleInnerDropdown = () => {
    setInnerDropdown(!innerDropdown);
  };
  return (
    <nav className='navigation'>
      <div className="logo"><Link href='/'>varsitysteps</Link></div>
      <div className="mobile-menu-icons">

      <button className='showmenu' onClick={()=>{ setMobileNav(!mobileNav);setShowDash(false) }}>
        <FontAwesomeIcon icon={faBars}/>
      </button>

      
      {showNotifications &&
      <div className="notification-container">
      <Notifications setShowNotifications={setShowNotifications}/>
    </div> }
      </div>
      
      
      <ul className={`links-parent ${mobileNav ? 'mobile' : ''}`}>
        <div className="link-close" onClick={()=>{
          setMobileNav(false)
        }}><FontAwesomeIcon icon={faClose}/></div>
        <li><Link href="/" onClick={() => setMobileNav(!mobileNav)}>Home</Link></li>
        {/* <li><Link href='/posts'>Explore</Link></li> */}
        <li><Link href='/tutoring'>Tutors</Link></li>
        <li><Link href='/institutions'>Institutions</Link></li>
        {/* <li><Link href='/careers'>Careers</Link></li> */}
        {/* <li
          onMouseEnter={handleDropdown}
          onMouseLeave={() => setDropdown(false)}
          onClick={handleDropdown}
          className='tools-list'
        >
          Tools <span><FontAwesomeIcon icon={faCaretDown}/></span>
          {dropdown && (
            <ul className="dropdown">
              
              
              <li><Link href="/finance">Financial Services</Link></li>
              <li><Link href="/tutoring" onClick={() => setMobileNav(!mobileNav)}>Tutoring</Link></li> 
              
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
                    <li><Link href="/institutions" onClick={() => setMobileNav(!mobileNav)}>College and University Listings</Link></li>
                    <li><Link href="">Internships</Link></li>
                    <li><Link href="/careers">Career Guidance</Link></li>
                    <li><Link href="">Mental-Health Resources</Link></li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li> */}
        <li><Link href="/about" onClick={() => setMobileNav(!mobileNav)}>About</Link></li>
        {/* <li><Link href="/support" onClick={() => setMobileNav(!mobileNav)}>Support Us</Link></li>s */}
        <li><Link href="/contact" onClick={() => setMobileNav(!mobileNav)}>Contact</Link></li>
        
        {isAuthenticated == true && userData ? <div className="dashIcon">
        <button className="showdash-widescreen" onClick={()=>setShowDash(!showDash)} >
        {userData.role_name.includes("student")?<Link href="/dashboard"><FontAwesomeIcon icon={faUser}/></Link>:<Link href="/tutordashboard"><FontAwesomeIcon icon={faUser}/></Link>}
      </button>

      {isAuthenticated == true && userData && <button onClick={()=>setShowNotifications(true)} className='notification-icon'><FontAwesomeIcon icon={faBell}/><span>{notificationCount>0?notificationCount:''}</span></button>}

        </div> : <div className="login-btn">
          <button><Link href="/auth/login" onClick={() => setMobileNav(!mobileNav)}>Login</Link></button>
          <button><Link href="/auth/signup" onClick={() => setMobileNav(!mobileNav)}>Sign Up</Link></button>
        </div> }
      </ul>
      <BottomNavbar/>
    </nav>
  );
};

export default Navbar;
