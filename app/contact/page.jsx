import React from 'react'
import './contact.css'
import '../globals.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faX } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faFacebookSquare, faInstagram, faInstagramSquare, faLinkedin, faSquareXTwitter, faWhatsapp, faWhatsappSquare, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
const Contact = () => {
  return (
    <section className='contact-page'>
      <h2>Contact Us</h2>
      <p>We’re here to help and would love to hear from you! Whether you have questions, feedback, or suggestions, feel free to reach out through any of the options below.</p><br />

      <h3>Get in Touch</h3>
      <p>Email: <span>varsitysteps@gmail.com</span></p>
      <p>Reach us directly via email for any inquiries, technical support, or general questions. We’ll get back to you as soon as possible!</p><br />

      <p>Phone: <span>+263 78 964 4097</span></p>
      <p>Prefer to speak with someone? Call us and our team will assist you promptly</p><br />
    {/* feedback form */}
    
    {/* <div className="contact-form">
      <p>Send feedback or ask questions and get in touch</p>
      <form >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            // value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@mail.com"
            // value={formData.email}
            // onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            // value={formData.message}
            // onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div> */}
    {/* feedback form */}

    
      <h3>Follow us</h3>
      <p>Stay updated with the latest features, news, and events by following us on our social media channels:</p>
      <div className="contact-socials">
        <Link href='https://wa.me/+263789644097'>
        <div className="social-link">
          <FontAwesomeIcon icon={faWhatsappSquare}/>
          <p>WhatsApp</p>
        </div>
        </Link>
        <Link href='https://web.facebook.com/profile.php?id=61569642848335'>
        <div className="social-link">
          <FontAwesomeIcon icon={faFacebookSquare}/>
          <p>Facebook</p>
        </div>
        </Link>
    <Link href='https://www.instagram.com/varsitysteps/'>
    <div className="social-link">
          <FontAwesomeIcon icon={faInstagramSquare}/>
          <p>Instagram</p>
        </div>
    </Link>
    <Link href='https://www.instagram.com/varsitysteps/'>
    <div className="social-link">
          <FontAwesomeIcon icon={faXTwitter}/>
          <p>X</p>
        </div>
    </Link>
      </div>
        
    </section>
  )
}

export default Contact