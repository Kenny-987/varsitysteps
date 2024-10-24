'use client'
import React,{useState,useEffect} from 'react'
import '../globals.css'
import './tutors.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

const Tutors = () => {
const [tutors,setTutors] = useState([])
const [filteredTutors,setFilteredTutors]=useState([])
const [query,setQuery]=useState('')
const [cityQuery,setCityQuery]=useState('')
const [citySearch,setCitySearch]=useState(false)
useEffect(()=>{
  const fetchTutors = async()=>{
    try{
      const response = await fetch('http://10.1.10.89:3000/tutors')
      const data =  await response.json()
      if(response.ok){
        setTutors(data.tutors)
        setFilteredTutors(data.tutors)
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

  if(query.trim()!==''){
    try {
      const response = await fetch(`http://10.1.10.89:3000/tutors/search?query=${query}`)
      if(response.ok){
        const data = await response.json()
        console.log(data);
        setFilteredTutors(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
     
}


const cityFilterFunc = (city)=>{
  if(city!==''){
    const filtered = tutors.filter((tutor)=>tutor.location?.toLowerCase() == city)
    console.log(filtered)
    setFilteredTutors(filtered)
  }else{
    setFilteredTutors(tutors)
  }
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
            placeholder = 'Maths, English, C++, Chemistry'
            />
            <FontAwesomeIcon onClick={searchBySubject} className='search-icon' icon={faSearch}/>
            </div>
          </form>
          {citySearch &&<div className="city-filter">
            <form>
            <div className="search-bar">
            <input type="text" 
            value={cityQuery}
            onChange={(e)=>setCityQuery(e.target.value)}
            placeholder = 'Enter city'
            />
            <FontAwesomeIcon onClick={()=>cityFilterFunc(cityQuery)} className='search-icon' icon={faSearch}/>
            </div>
          </form>
            </div> }
          </div>
          
          <div className="filter">
            {citySearch ? 
            <button onClick={()=>{setCitySearch(false),cityFilterFunc(''),setCityQuery('')}}>Cancel</button>:
            <button onClick={()=>setCitySearch(!citySearch)}>Filter by city</button>}
           
            
            </div>
        </div>
        </div>
    
    <div className="tutor-list">
      {/* tutor */}
      {filteredTutors.length > 0 ?filteredTutors.map((tutor)=>{
        return <div className="tutor" key={tutor.id}>
          <Link href= {`/tutoring/tutorprofile/${tutor.id}`}>
          <div className="tutor-image">
          {tutor.profile_image ? <Image alt="profile-image" src={tutor.profile_image} priority={true} width={200} height={200}/>: <div className="tutor-profile-icon"><FontAwesomeIcon className='placeholder' icon={faUser}/></div>  }
          </div>
          <div className="tutor-details">
           <p className='name'>{tutor.username}<span>{tutor.location?tutor.location:""}</span></p>
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

