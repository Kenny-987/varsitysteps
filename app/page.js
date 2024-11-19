'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Banner from "./components/banner/Banner";
import './pages.css'
import Footer from "./components/footer/Footer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";



export default function Home() {
  return (
    <main className={styles.main}>
      <Banner/>
      {/* features */}
      <section className="feature-section">
        <h2>What VarsitySteps offers</h2>
        <div className="features">
        {/* feature card */}
          <div className="feature-card">
          <div className="feature-img">
            <Image src='/images/teacher.png' width={150} height={150}/>
          </div>
          <h4>Tutors</h4>
          <p>Connect with tutors or become one yourself</p>
          <ul>
            <li><FontAwesomeIcon icon={faCircle}/> Find personalized help in subjects you need assistance in.</li>
            <li><FontAwesomeIcon icon={faCircle}/> Earn money by teaching others and sharing your knowledge.</li>
          </ul>
          <div className="feature-cta">
            <button><Link href='/tutoring'>Find a tutor</Link></button>
            <button><Link href='/auth/tutorsignup'>Become a tutor</Link></button>
          </div>
          </div>
          {/* feature card */}
          {/* feature card */}
          <div className="feature-card">
          <div className="feature-img">
            <Image src='/images/collegecampus-bro.svg' width={150} height={150}/>
          </div>
          <h4>Colleges and Careers</h4>
          <p>Navigate your educational and professional journey with ease.</p>
          <ul>
            <li><FontAwesomeIcon icon={faCircle}/> Discover colleges and programms to help further advance your academic journey.</li>
            <li><FontAwesomeIcon icon={faCircle}/> Earn money by teaching others and sharing your knowledge.</li>
          </ul>
          <div className="feature-cta">
            <button><Link href='/institutions'>Discover Institutions</Link></button>
            <button><Link href=''>Explore Careers</Link></button>
          </div>
          </div>
          {/* feature card */}
          {/* feature card */}
          <div className="feature-card">
          <div className="feature-img">
            <Image src='/images/collegecampus-bro.svg' width={150} height={150}/>
          </div>
          <h4>Creative Outlet</h4>
          <p>Share your ideas and creativity</p>
          <ul>
            <li><FontAwesomeIcon icon={faCircle}/> Apply theory to practical work and develop your skills.</li>
            <li><FontAwesomeIcon icon={faCircle}/> Share your work.</li>
          </ul>
          <div className="feature-cta">
            <button><Link href='/auth/login'>Get Started</Link></button>
          </div>
          </div>
          {/* feature card */}
        </div>
      </section>
      <section className="brief-intro">
      <h2>About VarsitySteps</h2>
      <p>VarsitySteps is a platform designed for students and tutors to connect and help each other grow academically and financailly.</p>
      <p>It is also a place for prospective students to explore different career paths and discover institutions across the country to help them realize their career goals and ambitions</p>
      <p>The platform also serves as an Outlet for students and graduates to apply practical skills in their respective disciplines and sharing them on VarsitySteps. </p>
      <p>This can help in creating a portfolio and also going the extra mile, beyond what college and university curriculumns cover.</p>
      <Link href='/about'>
      <button>Learn More</button>
      </Link>
      </section>
      <section className="explore">
        <h2>Explore</h2>
        <p>Explore a diverse range of projects, ideas, and creations shared by fellow users.</p>
        <Link href='/posts'>
        <button>Explore</button></Link>
      </section>
{/* <Contact/> */}
{/* <Footer/> */}
    </main>
  );
}
