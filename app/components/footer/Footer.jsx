import React from 'react'
import './footer.css'
import '../../globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faInstagram,faXTwitter,faWhatsapp,faLinkedin} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
  return (
      <footer>
        <h3>Quick Links</h3>
        <div className="quicklinks">
        <div className="primary-links a">
                <ul>
                <li><Link href="">Home</Link></li>
                <li><Link href="">About</Link></li>
        <li><Link href="">Support Us</Link></li>
        <li><Link href="">Terms and Policies</Link></li>
        <li><Link href="">FAQ</Link></li>
        <li><Link href="">Blog</Link></li>
        <li><Link href="">Advertise</Link></li>

                </ul>
            </div>
            <div className="primary-links">
                <ul>
                <li><Link href="">Dashboard</Link></li>
              <li><Link href="/finance">Financial Services</Link></li>
              <li><Link href="">Tutoring</Link></li>
              <li><Link href="">Accomodation</Link></li>
              <li><Link href="">Events and Activities</Link></li>
                </ul>
            </div>
            <div className="secondary-links">
                <ul>
                <li><Link href="">Academic Resources</Link></li>
                    <li><Link href="">College and University Listings</Link></li>
                    <li><Link href="">Internships</Link></li>
                    <li><Link href="">Career Guidance</Link></li>
                    <li><Link href="">Mental-Health Resources</Link></li>
                    
                </ul>
            </div>
        </div>
        
        <div className="socials">
            <Link href=""><FontAwesomeIcon icon={faWhatsapp}/></Link>
            <Link href=""><FontAwesomeIcon icon={faInstagram}/></Link>
            <Link href=""><FontAwesomeIcon icon={faFacebook}/></Link>
            <Link href=""><FontAwesomeIcon icon={faXTwitter}/></Link>
            <Link href=""><FontAwesomeIcon icon={faLinkedin}/></Link>
        </div>
        <div className="copyright">
            © VarsitySteps - 2024
        </div>
    </footer>
  )
}

export default Footer