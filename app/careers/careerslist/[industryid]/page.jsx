'use client'
import React, {useEffect,useState}from 'react'
import { useParams,useRouter } from 'next/navigation'
import '../../careers.css'
import Link from 'next/link'
const CareersList = ()=>{
    const {industryid} = useParams()
    const [industry_id] = industryid.split('-');
    const [careerslist,setCareersList]=useState([])

    
    useEffect(()=>{
        const fetchList=async()=>{
            const response = await fetch(`https://varsitysteps-server.onrender.com/careers/careerslist/${industry_id}`)
            if(response.ok){
                const data = await response.json()
                setCareersList(data)
            }
        }
        fetchList()
    },[])
    
    
    return(
        <section className='careers-list'>
            <h4>{industryid.split('-')[1]}</h4>
            <div className="career-list">
                {careerslist.map((career,index)=>{
                    return <ul key={index}>
                    <Link href={``} >
                    <li>{career.career_title}</li>
                    </Link>
                  </ul>
                })}
            </div>
        </section>
    )
}
//href={`/careers/careerslist/${field.industry_id}-${encodeURIComponent(field.industry_name.replace(/\s+/g, '_'))}`}
export default CareersList