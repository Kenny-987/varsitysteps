'use client'
import React, {useEffect,useState}from 'react'
import { useParams,useRouter } from 'next/navigation'

const CareersList = ()=>{
    const {industryid} = useParams()
    const [careerslist,setCareersList]=useState([])
    console.log(industryid);
    
    useEffect(()=>{
        const fetchList=async()=>{
            const response = await fetch(`https://varsitysteps-server.onrender.com/careers/careerslist/${industryid}`)
            if(response.ok){
                const data = await response.json()
                setCareersList(data)
            }
        }
        fetchList()
    },[])
    
    return(
        <section>
            
        </section>
    )
}
export default CareersList