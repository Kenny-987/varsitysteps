import React from 'react'
import './about.css'
import Footer from '../components/footer/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const About = () => {
  return (
      <section className="about-page ">
         <h1>Welcome to VarsitySteps</h1>
         <p>At VarsitySteps we are dedicated to empowering students in Zimbabwe by providing the resources and support they need to succeed in their academic and career journeys. Currently VasritySteps is designed to mainly to connect students and tutors nationwide to help both student and tutor get the best result from VarsitySteps but why stop there.</p> <br />
         <p>We plan on adding more features  that will benefit the education community in Zimbabwe and expnading VarsitySteps into an all inclusive platfomrm for students accross the country.</p><br />
         <h3>Our Story</h3>
         <p>VarsitySteps developed by a student, who had a vision to bridge the gap between students and the resources they need to excel. As students passionate about education and student success, we recognized the challenges faced by students in Zimbabwe- challenges that often hinder their academic and career ambitions, and that is our driving force, to make education enjoyable and not just bearable</p><br/>
         <p>With this in mind, we set out to create a platform that would address these issues head-on. Drawing from my own experiences and insights, We developed VarsitySteps to be more than just a tool- it's a community dedicated to empowering students. Through this platform, we aim to provide not only the information and opportunities students need but also a supportive network to guide them through their educational journeys</p><br />
         <p>VarsitySteps is the culmination of a commitment to making a meaningful difference in students' lives including alumni. Every feature and resources we plan to introduce on the platform will be designed with their needs in mind, reflecting our dedication to their success growth.</p><br />

         <h3>How to support VarsitySteps</h3>
         <h4>Financial Support</h4>
         <p>Financial contributions help us cover operational costs, enhance the platform, and roll out new features. Whether it’s through donations, sponsorships, or advertising, every contribution fuels VarsitySteps’ mission.</p> <br />

         <h4>Ideas and Feedback</h4>
         <p>Have a brilliant idea or suggestion? Your input is invaluable! Share innovative ideas for features, topics, or improvements. Constructive feedback ensures we stay aligned with what students and users truly need.</p><br />

         <h4>Skills and Expertise</h4>
         <p>If you have skills in programming, content creation, design, or marketing, consider collaborating with us. Your expertise can directly impact VarsitySteps by building tools, creating educational resources, or spreading the word about our platform.</p><br />

         <h4>Spreading the Word</h4>
         <p>Support doesn’t always have to be monetary or technical. Share VarsitySteps with your friends, family, and networks. The larger our community grows, the more opportunities we can provide to students everywhere.</p><br />

         <h4>Engage with the Platform</h4>
         <p>Use VarsitySteps regularly! Whether it’s becoming a tutor,  or being engaged with the platform motivates us to keep innovating and serving our community.</p><br />
         <p>Together, we can make VarsitySteps a leading hub for student empowerment. Every little bit counts, and your support, in any form, brings us closer to achieving this vision!</p>
         <h3>The Team</h3>
         <div className="teamgrid">
          <div className="team-member">
            <h4>Kenneth Madondo</h4>
            <div className="member-img">
              <Image alt="img" src='/images/kenny.jpg' width={150} height={150}/>
            </div>
            <p>Founder, Developer</p>
            <div className="member-socials">
              <Link href='https://wa.me/+263789644097' target='_blank'><FontAwesomeIcon icon={faWhatsapp}/></Link>
              <Link href='https://www.instagram.com/kennethmadondo3' target='_blank'><FontAwesomeIcon icon={faInstagram}/></Link>
              <Link href='https://facebook.com/Kennethmadondo2' target='_blank'><FontAwesomeIcon icon={faFacebook}/></Link>
              <Link href='https://www.linkedin.com/in/kenneth-madondo-099b26287' target='_blank'><FontAwesomeIcon icon={faLinkedin}/></Link>
            </div>
          </div>
         </div>
         </section>
    
  )
}

export default About 