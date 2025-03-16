'use client'
import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar'
import '../etutoring.css'
import './mystudents.css'
import Link from 'next/link'
import Image from 'next/image'

const MyStudents = () => {
const [users,setUsers]=useState([]) //user here are either students or tutors
const role = localStorage.getItem('role')
let url

if(role=='tutor'){
  url = `http:localhost:3000/user/mystudents`
}else{
  url = `http:localhost:3000/user/mytutors`
}
const fetchUsers = async()=>{
  try {
      const response =  await fetch(url,{
          credentials:'include'
      })
      if(response.ok){
          const data =  await response.json()
          setUsers(data)
          console.log(data);
          
      }else{
          console.log('cant get user');
          
      }
  } catch (error) {
      console.error(error)
  }
}
useEffect(()=>{

fetchUsers()
},[])

  return (
    <section  className='etutoring'>
        <Navbar/>
        <div className="mystudents-container">
        <h3>{role=='tutor'?'Your Students':'Your Tutors'}</h3>
        <div className="studentlist">
          {users.map((user)=>{
            return <Link href={`/etutoring/userslist/user/${user.user_id}`} key={user.user_id}>
            <div className="users">
            <div className="profile-image">
                            {user.profile_image?<Image alt='person-image' src={user.profile_image} width={50} height={50}/>: <div className='initials'>{user.username.slice(0,1)}</div>}
                        </div>
            <p>{user.username} <small>click to manage</small></p>
          </div>
            </Link> 
            
          })}
          
        </div>
        </div>
    </section>
  )
}

export default MyStudents