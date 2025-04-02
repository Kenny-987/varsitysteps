'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import '../etutoring.css'
import './classes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useContextUser } from '../../hooks/Context'
import CreateClass from './CreateClass'



const Classes = () => {
  const [createModal,setCreateModal] = useState(false)
  const [classes,setClasses] = useState([])
  const role = localStorage.getItem('role')

    useEffect(()=>{
      fetchClasses()
    },[])
let url
role == 'tutor'? url = `/api/tutors/getclasses`:url=`/api/tutors/myclasses`
const fetchClasses = async()=>{
  try {
    const response  =  await fetch(url,{
      credentials:'include'
    })
    if(response.ok){
      const data =  await response.json()
      setClasses(data)  
    }
  } catch (error) {
    alert('cannot get classes')
  }
}


  return (
    <section className='etutoring'>
      <Navbar/>
      <h3>{role=='tutor'?"Manage Group lessons and classe":"View classes you have been added to"}</h3>
      
      <div className="class-list">
        {classes.length > 0 ? 
        <>
        {classes.map((classItem)=>{
         return <div className="classcard" key={classItem.id}>
          <div className="classdetails">
          <h3>{classItem.name}</h3>
          {classItem.description && 
          <p><span>Description:</span> {classItem.description}</p>}
          {role == 'tutor'?<p><span>Created:</span> {new Date(classItem.created_at).toLocaleDateString()}</p>:
          <p><span>Joined:</span> {new Date(classItem.joined_at).toLocaleDateString()}</p>
          }
          
          <Link href={`/etutoring/classes/class/${classItem.id}`}><button>{role == 'tutor'?'Manage':'View'}</button></Link>
          </div>
        </div>
      })}
        </>
        :<p>{role=='tutor' ? "":"You have not been added to any classes"}</p>}
      
        

      {role == 'tutor' && <div className="classcard add" onClick={()=>setCreateModal(true)}>
          <button >Create a class</button>
          <FontAwesomeIcon icon={faPlusSquare}/>
        </div> }
        
      </div>
      {createModal && <CreateClass setCreateModal={setCreateModal} setClasses={setClasses}/> }
      
    </section>
  )
}

export default Classes