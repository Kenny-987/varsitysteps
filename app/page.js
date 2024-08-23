'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Banner from "./components/banner/Banner";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/contact";



export default function Home() {
 

  return (
    <main className={styles.main}>
      <Banner/>
      <section className={styles.aboutus}>
        <h2>What on earth is VarsitySteps</h2>
        <p>VarsitySteps is your ultimate companion on the academic journey, tailored specifically for prospective and current college and university students in Zimbabwe. But what does that mean for you?</p>
        <br></br>
        <p>VarsitySteps is dedicated to enhancing your educational experience with a range of powerful tools and resources. Our platform offers a comprehensive dashboard to manage your coursework efficiently, a digital library brimming with essential materials, and career guidance and skill development resources to help you excel.</p>
        <br></br>
        <p>We’re here to streamline your academic life, making it more connected, informed, and successful. Join us and let VarsitySteps support you every step of the way.</p>

        <h2>Our Mission</h2>
        <p>At VarsitySteps, our mission is to bridge the gap between students and the essential support they need. From discovering the right scholarships and accessing mental health services to finding exciting events and opportunities, we are dedicated to guiding you through your academic and personal journey with ease and confidence.</p>
      </section>

      {/* features */}
      <section id="explore" className={styles.features}>
  <h2>Explore Our Key Features</h2>
  {/* features grid */}
  <div className={styles.feature_grid}>
    {/* feature card */}
    <div className={styles.feature_card}> 
      <div className={styles.feature_img}>
        <Image alt="image" src={"/images/dashboard.png"} width={100} height={100}/>
      </div>
      <h3>Dashboard</h3>
      <p>Manage your course work efficiently with our intuitive dashboard.</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/book.png"} width={100} height={100}/>
      </div>
      <h3>Digital Library</h3>
      <p>Access a wealth of educational materials and resources anytime.</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/information.png"} width={100} height={100}/>
      </div>
      <h3>Academic Institutes Directory</h3>
      <p>Find and compare different Institutions from all over the country</p>
    </div>
     {/* feature card */}
     <div className={styles.feature_card}>
     <div className={styles.feature_img}>
        <Image alt="image" src={"/images/sign.png"} width={100} height={100}/>
      </div>
      <h3>Career Guidance</h3>
      <p>Detailed Career guidance and degree or certificate information</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/job-board.png"} width={80} height={100}/>
      </div>
      <h3>Job Board</h3>
      <p>Find attachment/internship opportunities</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/mental-health.png"} width={100} height={100}/>
      </div>
      <h3>Mental-well Being Support</h3>
      <p>Get quick access to mental health specialists</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/teacher.png"} width={100} height={100}/>
      </div>
      <h3>Tutoring Services</h3>
      <p>Find tutors and academic support</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/accommodation.png"} width={100} height={100}/>
      </div>
      <h3>Accommodation</h3>
      <p>Find housing and accommodation deals near your campus</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/income.png"} width={100} height={100}/>
      </div>
      <h3>Financial Service Providers</h3>
      <p>Discover agencies offering Scholarships and Loan Providers</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/group.png"} width={100} height={100}/>
      </div>
      <h3>Community</h3>
      <p>Connect with other students, share experiences, tips and advice</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/appointment.png"} width={100} height={100}/>
      </div>
      <h3>Events and Activities</h3>
      <p>Discover events, workshops, and activities regarding academics </p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image alt="image" src={"/images/blog.png"} width={100} height={100}/>
      </div>
      <h3>Blogs</h3>
      <p>Read trending stories and articles sorrounding the Zim academic sphere</p>
    </div>
  </div>
  <a href="#" className="cta-button">Learn More</a>
</section>
<Contact/>
<Footer/>
    </main>
  );
}
