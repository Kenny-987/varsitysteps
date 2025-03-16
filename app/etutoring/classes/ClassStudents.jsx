import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import '../userslist/mystudents.css'


const ClassStudents = ({setContent,classStudents}) => {

  return (
    <div>
        <h4><FontAwesomeIcon icon={faArrowCircleLeft} onClick={()=>setContent('dashboard')}/> Students in this class</h4>
        {classStudents.map((student)=>{
          return <div className="users" key={student.student_id}>
          <div className="profile-image">
                            {student?.profile_image?<Image alt='person-image' src={student.profile_image} width={50} height={50}/>: <div className='initials'>{student.username.slice(0,1)}</div>}
                        </div>
          <h3>{student?student.username:'loading'}</h3>
          <div className="student-action">
            remove
          </div>
          </div>
        })}
    </div>
  )
}

export default ClassStudents