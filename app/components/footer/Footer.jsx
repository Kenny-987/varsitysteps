import React from 'react'
import './footer.css'
import '../../globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faInstagram,faXTwitter,faWhatsapp,faLinkedin} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
      <footer>
        {/* <h3>Quick Links</h3> */}
        <div className="quicklinks">
        <div className="primary-links a">
                <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
        {/* <li><Link href="">Support Us</Link></li> */}
        <li><Link href="">Terms and Policies</Link></li>
        {/* <li><Link href="">FAQ</Link></li> */}
        {/* <li><Link href="">Blog</Link></li> */}
        <li><Link href="">Advertise</Link></li>
                </ul>
            </div>
            <div className="primary-links">
                <ul>
                <li><Link href="/dashboard">Dashboard</Link></li>
              {/* <li><Link href="/finance">Financial Services</Link></li> */}
              <li><Link href="/tutoring">Tutoring</Link></li>
              <li><Link href="/institutions">Institutions</Link></li>
              <li><Link href="/institutions">Explore Careers</Link></li>
              {/* <li><Link href="">Accomodation</Link></li> */}
              {/* <li><Link href="">Events and Activities</Link></li> */}
                </ul>
            </div>
            <div className="secondary-links">
                <p><FontAwesomeIcon icon={faPhone}/> <Link href='tel:+263789644097'>+263789644097</Link></p>
                <p><FontAwesomeIcon icon={faEnvelope}/> <Link href='mailto:varsitysteps@gmail.com'>varsitysteps@gmail.com</Link></p>
            </div>
        </div>
        
        <div className="socials">
            <Link href="https://wa.me/+263789644097"><FontAwesomeIcon icon={faWhatsapp}/></Link>
            <Link href="https://www.instagram.com/varsitysteps/"><FontAwesomeIcon icon={faInstagram}/></Link>
            <Link href="https://web.facebook.com/profile.php?id=61569642848335"><FontAwesomeIcon icon={faFacebook}/></Link>
            <Link href="https://x.com/varsitysteps"><FontAwesomeIcon icon={faXTwitter}/></Link>
            {/* <Link href=""><FontAwesomeIcon icon={faLinkedin}/></Link> */}
        </div>
        <div className="copyright">
            © VarsitySteps - 2024
        </div>
    </footer>
  )
}

export default Footer