import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const TutorForm = ({setShowTutorModal}) => {
    const [loading,setLoading]=useState(false)
    const [teaches,setTeaches]=useState([])
    const [tempSubject,setTempSubject]=useState("")
    const [qualifications,setQualifications]=useState([])
    const [tempQualifications,setTempQualifications] = useState("")

    const addtolist=()=>{
      const updatedSubjects = [...teaches,tempSubject]
      setTeaches(updatedSubjects)
      setTempSubject("")
    }
    const removeFromList=(index)=>{
      const updatedSubjects = [...teaches]
      updatedSubjects.splice(index,1)
      setTeaches(updatedSubjects)
    }

    const addtoQaulifications=()=>{
      const updatedQalifications = [...qualifications,tempQualifications]
      setQualifications(updatedQalifications)
      setTempQualifications("")
    }
    const removeFromQaulifications=(index)=>{
      const updatedQalifications = [...qualifications]
      updatedQalifications.splice(index,1)
      setQualifications(updatedQalifications)
    }

    const createTutor= async(e)=>{
      if(teaches.length===0){
        return
      }
        e.preventDefault()
        setLoading(true)
      try {
        const response =  await fetch(`http://localhost:3000/user/tutor-account`,{
          method:'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({teaches,qualifications})
        })
        if(response.ok){
          setShowTutorModal(false)
          setLoading(false)
          console.log('tutor created');
          
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
      
      }
    
  return (
    <>
    <h3>One Last step <FontAwesomeIcon icon={faClose} onClick={()=>setShowTutorModal(false)}/></h3>
          <form onSubmit={createTutor}>
          <div className="form-group">
          <label htmlFor="teaches">What do you Teach</label>
          <input 
          type="text" 
          id="teaches" 
          name="teaches" 
          value={tempSubject}
          placeholder ='eg mathematics'
          onChange={(e)=> setTempSubject(e.target.value)}
           />
           {tempSubject!=='' &&<button type='button' onClick={addtolist}>Add</button> }
           <div className="form-list">
            {teaches.map((sub,index)=>{
              return <div className="item" key={index}>
              <small>{sub}</small>
              <FontAwesomeIcon icon={faClose} className='remove-item' onClick={()=>removeFromList(index)}/>
              </div>
            })}
           </div>
        </div>
  
            <div className="form-group">
          <label htmlFor="qaulifications">Qualifications if any</label>
          <input 
          type="text" 
          id="qaulifications" 
          name="qaulifications" 
          value={tempQualifications}
          placeholder ="eg Bs in Mathematics"
          onChange={(e) => setTempQualifications(e.target.value)}
           />
           {tempQualifications!=='' && <button type='button' onClick={addtoQaulifications}>Add</button>}
           <div className="form-list">
            {qualifications.map((qualy,index)=>{
              return <div className="item" key={index}>
              <small>{qualy}</small>
              <FontAwesomeIcon icon={faClose} className='remove-item' onClick={()=>removeFromQaulifications(index)}/>
              </div>
            })}
           </div>
        </div>
            {loading?<div className='btn-loader'></div>:<button type="submit">Submit</button>}
          </form>
    </>
  )
}

export default TutorForm