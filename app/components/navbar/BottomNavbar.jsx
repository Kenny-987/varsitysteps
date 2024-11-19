"use client"
import React, { useState} from 'react';
import './navbar.css';
import '../../globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCaretUp, faCaretDown, faBell, faUser,faGears, faSignIn, faInfo, faInfoCircle, faArchive, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContextUser } from '../../hooks/Context';
import Notifications from '../notifications/Notifications';


const BottomNavbar = () => {
    const [mobileNav, setMobileNav] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [innerDropdown, setInnerDropdown] = useState(false);
   const {userData,isAuthenticated,setShowDash,showDash,notificationCount} = useContextUser()
    const [showNotifications,setShowNotifications]=useState(false)
    
  return (
    <nav className="bottom-navbar">
      <ul className="bottom-nav-links">
        <li>
          <Link href="/" onClick={() => setDropdown(false)}>
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
        </li>
        <li className='mobile-tools' onClick={() => setDropdown(!dropdown)}>
        {/* //   onClick={handleDropdown} */}
        <button>
            <FontAwesomeIcon icon={faGears} />
            <span>Tools</span>
          </button>
          {dropdown && (
            <ul className="dropdown">
              {/* <li><Link href="/finance">Financial Services</Link></li> */}
              <li><Link href="/tutoring">Tutoring</Link></li> 
              {/* <li><Link href="">Accomodation</Link></li>
              <li><Link href="">Events and Activities</Link></li> */}
              {/* <li><Link href="">Library</Link></li> */}
              <li><Link href="/institutions" >College and University Listings</Link></li>
               {/* <li><Link href="">Internships</Link></li> */}
              <li><Link href="/careers">Career Guidance</Link></li>
               {/* <li><Link href="">Mental-Health Resources</Link></li> */}
            </ul>
          )}
        </li>
        <li>
        <Link href='/posts' onClick={() => setDropdown(false)}>
          <FontAwesomeIcon icon={faLayerGroup} />
          <span>Explore</span>
        </Link>
      </li>
        {userData && isAuthenticated ? <>
        <li>
        <button onClick={() => setShowNotifications(!showNotifications)}>
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
        </button>
        {showNotifications && 
        <div className="mobile-notifications">
          <Notifications setShowNotifications={setShowNotifications}/>
          </div>}
      </li>
      <li onClick={()=>{setShowDash(!showDash);setShowNotifications(false)}}>
        <Link href={userData?.role_name.includes("student") ? "/dashboard" : "/tutordashboard"}>
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </Link>
      </li>
      </>:
        <>
        
      <li>
        <Link href='/'>
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>About</span>
        </Link>
      </li>
        </>
        }
        
      </ul>
    </nav>
  );
};

export default BottomNavbar;
