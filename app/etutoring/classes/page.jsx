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
  const {eTutotingRole}=useContextUser()
    const role = eTutotingRole

    useEffect(()=>{
      fetchClasses()
    },[])
const fetchClasses = async()=>{
  try {
    const response  =  await fetch(`http:localhost:3000/tutors/getclasses`,{
      credentials:'include'
    })
    if(response.ok){
      const data =  await response.json()
      setClasses(data)
      console.log(data);
      
    }
  } catch (error) {
    alert('cannot get classes')
  }
}


  return (
    <section className='etutoring'>
      <Navbar role={role}/>
      <h3>Manage Group lessons and classes</h3>
      
      <div className="class-list">
        {classes.length > 0 && 
        <>
        {classes.map((classItem)=>{
         return <div className="classcard" key={classItem.id}>
          <div className="classdetails">
          <h3>{classItem.name}</h3>
          {classItem.description && 
          <p><span>Description:</span> {classItem.description}</p>}
          <p><span>Created:</span> {new Date(classItem.created_at).toLocaleDateString()}</p>
          <Link href={`/etutoring/classes/class/${classItem.id}`}><button>Manage</button></Link>
          </div>
        </div>
      })}
        </>
        }
      
        

      
        <div className="classcard add" onClick={()=>setCreateModal(true)}>
          <button >Create a class</button>
          <FontAwesomeIcon icon={faPlusSquare}/>
        </div>
      </div>
      {createModal && <CreateClass setCreateModal={setCreateModal} setClasses={setClasses}/> }
      
    </section>
  )
}

export default Classes