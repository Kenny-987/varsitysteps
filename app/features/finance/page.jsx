// 'use client'
// import Navbar from '@/app/components/navbar/Navbar'
// import React,{useState} from 'react'
// import "../src/app/globals.css"
// import "./pages.css"
// import Link from 'next/link'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot,faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';
// import Footer from '@/app/components/footer/Footer'


// const finance = () => {
//     const[showMore,setShowMore]=useState(false)

//   return (
//     <section>
//         <Navbar/>
//         <div className="finance">
//         <h1>Financial Services</h1>
//         <p>This page is dedicated to sharing information about financial service providers and scholarship opportunities we come across.</p>
//         <p>At the moment, VarsitySteps <span>does not have the resources or capabilities to offer direct financial assistance to students</span>. However, we strive to keep you informed about potential service providers. We will update this page if our resources change.</p>
//         <h3>Available Financial Services and Scholarships</h3>
//         <div className="providers">
//             {/* provider */}
//             <div className="provider">
//                 <div className="provider-details">
//                 <p className="title" onClick={()=>setShowMore(!showMore)}><Link href="">Econet WireLess</Link> {showMore ? <FontAwesomeIcon icon={faCaretUp}/>:<FontAwesomeIcon icon={faCaretDown}/>}</p>
//                 {showMore && <div className="more-info">
//                     <p><FontAwesomeIcon icon={faLocationDot}/> {"Harare"}</p>
//                     <h4>Info:</h4>
//                     <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias temporibus modi quas magni repudiandae soluta ad necessitatibus, culpa accusantium ea deserunt quod ab amet voluptas perferendis quae nemo. Optio, qui eligendi suscipit sed consequatur ratione, accusamus veniam, nemo id molestiae dolorem praesentium ipsum ea in vero! Aut, recusandae? Quo, saepe.</p>
//                 </div>}
//                 </div>
//             </div>
//             {/* provider */}
//             {/* provider */}
//             <div className="provider">
//                 <div className="provider-details">
//                 <p className="title"><Link href="">Econet WireLess</Link> {showMore ? <FontAwesomeIcon icon={faCaretUp}/>:<FontAwesomeIcon icon={faCaretDown}/>}</p>
//                 {showMore && <div className="more-info">
//                     <p><FontAwesomeIcon icon={faLocationDot}/> {"Harare"}</p>
//                     <h4>Info:</h4>
//                     <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias temporibus modi quas magni repudiandae soluta ad necessitatibus, culpa accusantium ea deserunt quod ab amet voluptas perferendis quae nemo. Optio, qui eligendi suscipit sed consequatur ratione, accusamus veniam, nemo id molestiae dolorem praesentium ipsum ea in vero! Aut, recusandae? Quo, saepe.</p>
//                 </div>}
//                 </div>
//             </div>
//             {/* provider */}
//         </div>
//         </div> 
//         <Footer/>
//     </section>
//   )
// }

// export default finance