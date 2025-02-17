import React from 'react';
import './footer.css';
import '../../globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useContextUser } from '../../hooks/Context';

const Footer = () => {
    const {setShowAchPopup,setGlobalAchievement}=useContextUser()
  const followed = async (socialApp) => {
    try {
      const response = await fetch(`/api/gamedata/follower`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ socialApp }),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.length>0){
            setGlobalAchievement(data)
        setShowAchPopup(true)
        }
        
      } else {
        console.log(error);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <footer>
      <div className="quicklinks">
        <div className="primary-links">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/thearena">Play</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/terms-and-conditions">Terms and Policies</Link></li>
          </ul>
        </div>
        <div className="secondary-links">
          <p>Call us: <Link href="tel:+263789644097">+263789644097</Link></p>
          <p><FontAwesomeIcon icon={faEnvelope} /> <Link href="mailto:varsitysteps@gmail.com">varsitysteps@gmail.com</Link></p>
        </div>
      </div>

      <div className="socials">
        <Link href="https://wa.me/+263789644097" target="_blank"><FontAwesomeIcon icon={faWhatsapp} /></Link>

        <span onClick={() => followed('Instagram Explorer')}>
          <Link href="https://www.instagram.com/varsitysteps/" target="_blank"><FontAwesomeIcon icon={faInstagram} /></Link>
        </span>

        <span onClick={() => followed('Facebook Follower')}>
          <Link href="https://web.facebook.com/profile.php?id=61569642848335" target="_blank"><FontAwesomeIcon icon={faFacebook} /></Link>
        </span>

        <span onClick={() => followed('X (Twitter) Supporter')}>
          <Link href="https://x.com/varsitysteps" target="_blank"><FontAwesomeIcon icon={faXTwitter} /></Link>
        </span>
      </div>

      <div className="copyright">
        © VarsitySteps - 2025
      </div>
    </footer>
  );
};

export default Footer;
