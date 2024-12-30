'use client'
import React,{useState,useEffect} from 'react'
import '../globals.css'
import './tutors.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faGrinTongueWink, faSearch, faStar, faUser} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

const Tutors = () => {
const [tutors,setTutors] = useState([])
const [query,setQuery]=useState('')


//function to fetch premium or featured tutors who will be displayed in main tutors page
useEffect(()=>{
  const fetchTutors = async()=>{
    try{
      const response = await fetch('http://13.48.59.51:3000/tutors')
      const data =  await response.json()
      if(response.ok){
        setTutors(data.tutors)
        console.log(data.tutors);
        
      }else{
        console.log('error getting tutors')
      }
    }catch(error){
      console.error(error)
    }
    
  }
  fetchTutors()
},[])
 
const searchBySubject = async(e)=>{
  e.preventDefault()
window.location.href = `/tutoring/tutors/${query}`   
}


// console.log('these are tutors coming from server ', tutors)
  return (
    <section className="tutors">
        <div className="tutor-nav">
        <h2>Find a Tutor</h2>
        <div className="tutor-search-filter">
          <div className="search-bars">
          <form onSubmit={searchBySubject}>
            <div className="search-bar">
            <input type="text" 
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder = 'Maths, English, Programming, Chemistry'
            />
            <FontAwesomeIcon onClick={searchBySubject} className='search-icon' icon={faSearch}/>
            </div>
          </form>
          </div>
        </div>
        </div>
    
    <div className="tutor-list">
      {/* tutor */}
      {tutors.length > 0 ?tutors.map((tutor)=>{
        return <div className="tutor" key={tutor.id}>
          <Link href= {`/tutoring/tutorprofile/${tutor.id}`}>
          <div className="tutor-image">
          {tutor.profile_image ? <Image alt="profile-image" src={tutor.profile_image} priority={true} width={200} height={200}/>: <div className="tutor-profile-icon"><FontAwesomeIcon className='placeholder' icon={faUser}/></div>  }
          {tutor.is_premium &&<p className='feature-icon'>Featured</p>}
          </div>
          <div className="tutor-details">
           <p className='name'>{tutor.username}<span>{tutor.location?tutor.location:""}</span></p>
           <p><FontAwesomeIcon className='star filled' icon={faStar}/>{Math.round(Number(tutor.average_rating)* 10)/10} ({tutor.total_ratings} ratings)</p>
           <p className='charge'>{tutor.base_charge?`$${tutor.base_charge}/month`:""}</p>
          <p>{tutor.bio?tutor.bio.substring(0,50)+'...':'No bio'}</p>
          <div className="categoty">
          <ul className="subjects">
          {tutor.teaches? tutor.teaches.slice(0,3).map((subject,index)=>{
            return  <li className="subject" key={index}>{subject.substring(0,20)}</li>
            }):""}
          </ul>
        </div>
          </div>
          </Link>
        </div>
      }) : <p>No tutors found</p>}
      {/* tutor */}
    
    
    
    </div>
    </section>
  )
}

export default Tutors

