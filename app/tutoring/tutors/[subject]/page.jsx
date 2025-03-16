'use client'
import React,{useState,useEffect} from 'react'
import '../../tutors.css'
import '../../../globals.css'
import Image from 'next/image'
import { useParams } from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser,faStar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Tutors = () => {
    const {subject} = useParams()
    const [query,setQuery]=useState(subject)
    const [tutors,setTutors]=useState([])
    const [filteredTutors,setFilteredTutors]=useState([])
    const [filters,setFilters]=useState(false)
    const [city,setCity]=useState('')
    const [sortOption,setSortOption]=useState('')

    useEffect(()=>{
        const fetchTutors = async()=>{
            if(query.trim()!==''){
            try {
              const response = await fetch(`/testing/tutors/search?query=${query}`)
              if(response.ok){
                const data = await response.json()
                setTutors(data)
                setFilteredTutors(data)
              }
            } catch (error) {
              console.error(error)
            }
          }
                }
        fetchTutors()
    },[])

    const searchBySubject = async(e)=>{
        e.preventDefault()
        if(query.trim()!==''){
          window.location.href = `/tutoring/tutors/${query}`   
        }
      }

const filterTutors =(location,sort)=>{
if(sort==='ascending' && location.trim()!==''){
  const filtered = filteredTutors.filter((city)=>city.location.toLowerCase() == location.toLowerCase())
  filtered.sort((a,b)=>a.base_charge-b.base_charge)
  setFilteredTutors(filtered)
}else if(sort==='descending' && location.trim()!==''){
  const filtered = filteredTutors.filter((city)=>city.location.toLowerCase() == location.toLowerCase())
 filtered.sort((a,b)=>b.base_charge-a.base_charge)
  setFilteredTutors(filtered)
}else if(sort==='descending'){
filteredTutors.sort((a,b)=>b.base_charge-a.base_charge)
}
else if(sort==='ascending'){
filteredTutors.sort((a,b)=>a.base_charge-b.base_charge)
}
else if(location.trim()!==''){
  const filtered = filteredTutors.filter((city)=>city.location.toLowerCase() == location.toLowerCase())
  setFilteredTutors(filtered)
}
}

const clearFilters = ()=>{
  setFilteredTutors(tutors)
  setSortOption('')
}
  return (
    <section className='tutors'>
<div className="tutor-nav">
        <h2>{tutors.length} {subject[0].toUpperCase()+ subject.slice(1,subject.length)} Tutors</h2>
        <div className="tutor-search-filter">
          <div className="search-bars">
          <form onSubmit={searchBySubject}>
            <div className="search-bar">
            <input type="text" 
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder = {subject}
            />
            <FontAwesomeIcon onClick={searchBySubject} className='search-icon' icon={faSearch}/>
            </div>
          </form>
          {/* filter section */}
          {filters &&<div className="filters-div">
            <h2>Filters</h2>
            <div className="search-bar">
            <input type="text" 
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            placeholder = 'Enter city'
            />
            </div>
            <div className="sort">
                <p>Sort by Price</p>
                <p><input type="radio"
                 name='option'
                 value='ascending'
                onChange={(e)=>setSortOption(e.target.value)}/> Lowest to Highest</p>
                <p><input type="radio" 
                name='option'
                value='descending' 
                onChange={(e)=>setSortOption(e.target.value)}/> Highest to lowest </p>
            </div>
            <button onClick={()=>{clearFilters();setFilters(false)}}>Clear filters</button>
            <div className="filter-btns">
            <button onClick={()=>{filterTutors(city,sortOption);setFilters(false)}}>Apply</button>
            <button onClick={()=>setFilters(false)}>Cancel</button>
            </div>
            </div> }
          </div>
          
          <div className="filter">
            <button onClick={()=>setFilters(true)}>Filters</button>
            </div>
        </div>
        </div>
        <div className="tutor-list">
      {/* tutor */}
      {filteredTutors.length > 0 ? filteredTutors.map((tutor)=>{
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