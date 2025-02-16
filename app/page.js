'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Banner from "./components/banner/Banner";
import './pages.css'
import Footer from "./components/footer/Footer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import Faq from "./components/faq/Faq";
import Feedback from "./components/feedbackform/Feedback";
// import FeaturedTutors from "./tutoring/FeaturedTutors";


export default function Home() {
  return (
    <main className={styles.main}>
      <Banner/>
      <section className="brief-intro">
      <h2>About VarsitySteps</h2>
      <p>VarsitySteps is a platform designed for students and tutors to connect and help each other grow academically and financailly.</p>
      <p>It is also a place for prospective students to explore different career paths and discover institutions across the country to help them realize their career goals and ambitions</p>
      {/* <p>The platform also serves as an Outlet for students and graduates to apply practical skills in their respective disciplines and sharing them on VarsitySteps. </p>
      <p>This can help in creating a portfolio and also going the extra mile, beyond what college and university curriculumns cover.</p> */}
      <Link href='/about'>
      <button>Learn More</button>
      </Link>
      </section>
      {/* <FeaturedTutors/> */}
      {/* features */}
      <section className="feature-section">
        <h2>What VarsitySteps offers</h2>
        <div className="features">
        {/* feature card */}
          <div className="feature-card">
          <div className="feature-img">
            <Image alt="feature-img" src='/images/Teacher_student.svg' width={150} height={150}/>
          </div>
          <h4>Tutors</h4>
          <p>Connect with tutors or become one yourself.</p>
            <p>Find personalized help in subjects you need assistance in.</p>
             <p>Earn money by teaching others and sharing your knowledge.</p>
          <div className="feature-cta">
            <button><Link href='/tutoring'>Find a tutor</Link></button>
            <button><Link href='/auth/tutorsignup'>Become a tutor</Link></button>
          </div>
          </div>
          {/* feature card */}
          {/* feature card */}
          <div className="feature-card">
          <div className="feature-img">
            <Image alt='feature-img' src='/images/collegecampus-bro.svg' width={150} height={150}/>
          </div>
          <h4>Institutions</h4>
          <p>Navigate your educational and professional journey with ease.</p>
            <p> Discover universities and colleges and the programs they offer to help further advance your academic journey.</p>
          <div className="feature-cta">
            <button><Link href='/institutions'>Discover Institutions</Link></button>
          </div>
          </div>
          {/* feature card */}
          {/* feature card */}
          <div className="feature-card">
          <div className="feature-img">
            <Image alt='feature-img' src='/images/Gaming-amico.svg' width={150} height={150}/>
          </div>
          <h4>The Arena</h4>
          <p>Join the competition on educational quizzes and challenges</p>
          <p>Earn points and climb up the leaderboard, become the VarsitySteps Champion.</p>
          <div className="feature-cta">
            <button><Link href='/thearena'>Take me to the Arena</Link></button>
          </div>
          </div>
          {/* feature card */}
        </div>
      </section>
      {/* end of features */}

      {/* section for faq */}
        <Faq/>
      
      {/* section for feedback */}
      <Feedback/>
{/* <Contact/> */}
    </main>
  );
}
