import Image from "next/image";
import styles from "./page.module.css";
import Banner from "./components/banner/Banner";
export default function Home() {
  return (
    <main className={styles.main}>
      <Banner/>
      <section className={styles.aboutus}>
        <h2>What on earth is VarsitySteps</h2>
        <p>VarsitySteps is a platform developed for Zimbabwean prospective and current College & University students to make the academic journey that much more bearable. But what exactly does that mean for you?</p>
        <br></br>
        <p>We’re here to streamline your educational experience by offering a range of tools and resources that cover all your needs. From a comprehensive dashboard to manage your coursework, a digital library packed with essential materials, to career guidance and skill development resources, VarsitySteps is designed to be your one-stop resource hub.</p>
        <br></br>
        <p>Join us in making your educational experience more connected, informed, and successful. VarsitySteps is here to support you every step of the way.</p>

        <h2>Our Mission</h2>
        <p>Our mission is to bridge the gap between students and the support they need. Whether it’s finding the right scholarship, connecting with mental health services, or discovering exciting events and opportunities, we’re committed to helping you navigate your academic and personal journey with ease.</p>
      </section>

      {/* features */}
      <section className={styles.features}>
  <h2>Explore Our Key Features</h2>
  {/* features grid */}
  <div className={styles.feature_grid}>
    {/* feature card */}
    <div className={styles.feature_card}> 
      <div className={styles.feature_img}>
        <Image src={"/images/dashboard.png"} width={100} height={100}/>
      </div>
      <h3>Dashboard</h3>
      <p>Manage your course work efficiently with our intuitive dashboard.</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/book.png"} width={100} height={100}/>
      </div>
      <h3>Digital Library</h3>
      <p>Access a wealth of educational materials and resources anytime.</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/information.png"} width={100} height={100}/>
      </div>
      <h3>Academic Institutes Directory</h3>
      <p>Find different Institutions from all over the country</p>
    </div>
     {/* feature card */}
     <div className={styles.feature_card}>
     <div className={styles.feature_img}>
        <Image src={"/images/sign.png"} width={100} height={100}/>
      </div>
      <h3>Career Guidance</h3>
      <p>Know courses needed for different Careers</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/job-board.png"} width={80} height={100}/>
      </div>
      <h3>Job Board</h3>
      <p>Find attachment/internship opportunities</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/mental-health.png"} width={100} height={100}/>
      </div>
      <h3>Mental-well Being Support</h3>
      <p>Get quick access to mental health specialists</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/teacher.png"} width={100} height={100}/>
      </div>
      <h3>Tutoring Services</h3>
      <p>Find tutors to assist with your academic challenges</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/accommodation.png"} width={100} height={100}/>
      </div>
      <h3>Accommodation</h3>
      <p>View available rooms near your campus</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/income.png"} width={100} height={100}/>
      </div>
      <h3>Financial Service Providers</h3>
      <p>Discover agencies offering Scholarships and Loan Providers</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/group.png"} width={100} height={100}/>
      </div>
      <h3>Community</h3>
      <p>Connect with other students, share experiences, tips</p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/appointment.png"} width={100} height={100}/>
      </div>
      <h3>Events and Activities</h3>
      <p>Discover events, workshops, and activities regarding academics </p>
    </div>
    {/* feature card */}
    <div className={styles.feature_card}>
    <div className={styles.feature_img}>
        <Image src={"/images/blog.png"} width={100} height={100}/>
      </div>
      <h3>Blogs</h3>
      <p>Read trending stories and articles sorrounding the Zim academic sphere</p>
    </div>
  </div>
</section>

    </main>
  );
}
