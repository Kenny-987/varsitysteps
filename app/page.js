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
      {/* <section className={styles.aboutus}>
        <h2>What on earth is VarsitySteps</h2>
        <p>VarsitySteps is web-based platform that empowers Zimbabwean students by providing a supportive environment to connect, share, and thrive offering resources for academic, career, and personal growth and with a range of features to help students succeed.</p>
        <p>We bring together, students, tutors and mentors along with resources to create a vibrant Community that supports each other so everyone reaches their full potential.</p>
        <div className={styles.cta_btn}>
        <button>Learn More</button>
        </div>
      </section> */}

      {/* features */}
  
{/* <Contact/>
<Footer/> */}
    </main>
  );
}
