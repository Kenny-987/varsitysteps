import React from 'react'
import '../pages.css'
import Footer from '../components/footer/Footer'

const About = () => {
  return (
      <section className="about-page ">
         <h1>Welcome to VarsitySteps</h1>
         <p>At VarsitySteps we are dedicated to empowering students in Zimbabwe by providing the resources and support they need to succeed in their academic and career journeys. Our platform is designed to address common challenges faced by college and university students including prospective students as well, offering a comprehensive suite of tools and information to help them navigate their educational and professional paths with confidence.</p> <br />
         <p>From career guidance to a network of tutors and other information, VarsitySteps is your go-to destinaton for everything you need to make informed decisions and achieve your goals. Join us as we strive to create a brighter future for students across Zimbabwe, one step at a time.</p><br />
         <h3>Our Story</h3>
         <p>VarsitySteps was developed by students, who had a vision to bridge the gap between students and the resources they need to excel. As students passionate about education and student success, I recognized the challenges faced by students in Zimbabwe- challenges that often hinder their academic and career ambitions.</p><br/>
         <p>With this in mind, I set out to create a platform that would address these issues head-on. Drawing from my own experiences and insights, We developed VarsitySteps to be more than just a tool- it's a community dedicated to empowering students. Through this platform, we aim to provide not only the information and opportunities students need but also a supportive network to guide them through their educational journeys</p><br />
         <p>VarsitySteps is the culminationof a commitment to making a meaningful difference in students' lives. Every feature and resources on the platform is designed with their needs in mind, reflecting our dedication to their success growth.</p><br />
         <h3>Our Values</h3>
         <p><span>Empowerment:</span> We believe in empowering students by providing them with tools, resources, and support they need to achieve their full potential.</p><br />
         <h3>The Team</h3>
         <div className="teamgrid">
          <div className="team-member">
            <h4>Kenneth Madondo</h4>
            <p>Founder, Developer</p>
          </div>
          <div className="team-member">
            <h4>Kenneth Madondo</h4>
            <p>Founder, Developer</p>
          </div>
         </div>
         <Footer/>
         </section>
    
  )
}

export default About 