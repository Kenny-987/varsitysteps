'use client'
import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar'
import '../etutoring.css'
import './mystudents.css'
import Link from 'next/link'
import Image from 'next/image'

const MyStudents = () => {
const [users,setUsers]=useState([]) //user here are either students or tutors
const [loading,setLoading]=useState(false)
const role = localStorage.getItem('role')
let url

if(role=='tutor'){
  url = `/api/user/mystudents`
}else{
  url = `/api/user/mytutors`
}
const fetchUsers = async()=>{
  setLoading(true)
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
  }finally{
    setLoading(false)
  }
}
useEffect(()=>{

fetchUsers()
},[])

  return (
    <section  className='etutoring'>
        <Navbar/>
        {loading?<div className='btn-loader'></div>:
        <div className="mystudents-container">
        <h3>{role=='tutor'?'Your Students':'Your Tutors'}</h3>
        <div className="studentlist">
          {users.length > 0 ? users.map((user)=>{
            return <Link href={`/etutoring/userslist/user/${user.user_id}`} key={user.user_id}>
            <div className="users">
            <div className="profile-image">
                            {user.profile_image?<Image alt='person-image' src={user.profile_image} width={50} height={50}/>: <div className='initials'>{user.username.slice(0,1)}</div>}
                        </div>
            <p>{user.username} <small>click to manage</small></p>
          </div>
            </Link> 
            
          }): <p>{role == 'tutor' ? "You do not have any students yet":"You have not connected to any tutors"}</p>}
          
        </div>
        </div>
        }
        
    </section>
  )
}

export default MyStudents