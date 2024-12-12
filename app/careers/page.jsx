'use client'
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import './careers.css'

const Careers = () => {
const [industries,setIndustries] = useState([])

// useEffect(()=>{
//   const fetchIndustryList = async()=>{
//     try {
//       const response = await fetch('https://varsitysteps-server.onrender.com/careers/industries')
//       if(response.ok){
//         const data = await response.json()
//         setIndustries(data)
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }
//   fetchIndustryList()
// },[])


  return (
    <section className="careers">
        <h3>Coming Soon</h3>
        {/* search career*/}
        {/* career categories */}
        {/* <div className="career-categories">
        <h4>Career Categories</h4>
      {industries.map((field,index)=>{
        return <ul key={index}>
          <Link href={`/careers/careerslist/${field.industry_id}-${encodeURIComponent(field.industry_name.replace(/\s+/g, '_'))}`}>
          <li>{field.industry_name}</li>
          </Link>
        </ul>
      })}
        </div> */}
    </section>
  )
}

export default Careers