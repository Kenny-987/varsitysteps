'use client'
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'


const Navbar = () => {
    const [mobile,setMobile] =useState(false)
    const role = localStorage.getItem('role')

  return (
    <div className="etutoring-header">
      <button className="hamburger" onClick={() => setMobile(!mobile)}>
        {mobile ? <FontAwesomeIcon icon={faClose}/> : <FontAwesomeIcon icon={faBars}/>}
      </button>
      <ul className={`enavigation ${mobile?"mobile-nav":""}`}>
      <li className="navitem" onClick={() => setMobile(false)} ><Link href={`/etutoring`}>Overwiew</Link></li>
      <li className="navitem" onClick={() => setMobile(false)} ><Link href={'/etutoring/userslist'}>{role=='tutor'?"My Students":"My Tutors"}</Link></li>
      <li className="navitem" onClick={() => setMobile(false)} ><Link href={'/etutoring/classes'}>{role=='tutor'?"Group Classes":"My Classes"}</Link></li>
      <li className="navitem" onClick={() => setMobile(false)} ><Link href='/messages'>Messages</Link></li>
      {/* <li className="navitem"><Link href={''}>Schedule</Link></li> */}
          </ul>
      <p className='title'>eTutoring Dashboard</p>
      </div>
  )
}

export default Navbar