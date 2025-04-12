'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import '../etutoring.css'
import './classes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faChalkboardUser, faInfoCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useContextUser } from '../../hooks/Context'
import CreateClass from './CreateClass'
import Image from 'next/image'



const Classes = () => {
  const [createModal,setCreateModal] = useState(false)
  const [classes,setClasses] = useState([])
  const role = localStorage.getItem('role')
  const [loading,setLoading] = useState(false)

    useEffect(()=>{
      fetchClasses()
    },[])
let url
role == 'tutor'? url = `http://localhost:3000/tutors/getclasses`:url=`http://localhost:3000/tutors/myclasses`
const fetchClasses = async()=>{
  setLoading(true)
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
  }finally{
    setLoading(false)
  }
}


  return (
    <section className='etutoring'>
      <Navbar/>
      <h3>{role=='tutor'?"Manage Group lessons and classes":"View classes you have been added to"}</h3>
      
      {loading?<div className='btn-loader'></div>:
      <>
      <div className="class-list">
        {classes.length > 0 ? 
        <>
        {classes.map((classItem)=>{
         return <div className="classcard" key={classItem.id}>
          <div className="classdetails">
            <div className="classheader">
            <span className='class-icon'><FontAwesomeIcon icon={faChalkboardUser}/></span>
            <p className='class-title'>{classItem.name}</p>
            </div>
          {classItem.description && 
          <p className='class-desc'><span>Description:</span> {classItem.description}</p>}
          {role == 'tutor'?<p className='class-desc'><span>Created:</span> {new Date(classItem.created_at).toLocaleDateString()}</p>:
          <p><span>Joined:</span> {new Date(classItem.joined_at).toLocaleDateString()}</p>
          }
          
          <Link href={`/etutoring/classes/class/${classItem.id}`}><button>{role == 'tutor'?'manage':'view'}</button></Link>
          </div>
        </div>
      })}
        </>
        : <>
        {role=='tutor' ? "":
        <div className='no-class'>
          <Image alt='empty' src="/images/Empty-amico.svg" width={250} height={250}/>
          <p><FontAwesomeIcon icon={faInfoCircle}/> You have not been added to any classes </p>
          </div>}
        </>}

      {role == 'tutor' && <div className="classcard add" onClick={()=>setCreateModal(true)}>
          <button >Create a class</button>
          <FontAwesomeIcon icon={faPlusSquare}/>
        </div> }
        
      </div>
      </>
      }
      
      {createModal && <CreateClass setCreateModal={setCreateModal} setClasses={setClasses}/> }
      
    </section>
  )
}

export default Classes