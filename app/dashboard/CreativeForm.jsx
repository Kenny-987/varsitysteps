import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'




const CreativeForm = ({setShowCreative}) => {
  const [loading,setLoading]=useState(false)
    const [field,setField]=useState('')
    const [specializations,setSpecialization]=useState([])
    const [skills,setSkills]=useState([])
    const [tempSpecialization,setTempSpecialization] = useState('')
    const [tempSkills,setTempSkills]=useState('')
    

    const addSpecializations=()=>{
        const updatedSpecialization = [...specializations,tempSpecialization]
        setSpecialization(updatedSpecialization)
        setTempSpecialization("")
      }
      const removeFromList=(index)=>{
        const updatedSpecialization = [...specializations]
        updatedSpecialization.splice(index,1)
        setSpecialization(updatedSpecialization)
      }
      
      const addSkills=()=>{
        const updatedSkills = [...skills,tempSkills]
        setSkills(updatedSkills)
        setTempSkills("")
      }
      const removeSkill=(index)=>{
        const updatedSkills = [...skills]
        updatedSkills.splice(index,1)
        setSkills(updatedSkills)
      }

      // FUNCTION TO CREATE CREATIVE ACCOUNT
const createCreative= async(e)=>{
  if(field.trim()===""){
    return
  }
    e.preventDefault()
    setLoading(true)
    // console
  try {
    const response = await fetch(`https://varsitysteps-server.onrender.com/user/creator-account`,{
      method:'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({field,skills,specializations})
    })
    if(response.ok){
      setShowCreative(false)
      setLoading(false)
    }
  } catch (error) {
    console.error(error)
    setLoading(false)
  }
  
  }


  return (
    <>
    <h3>One Last step <FontAwesomeIcon icon={faClose} onClick={()=>setShowCreative(false)}/></h3>
          <form onSubmit={createCreative}>
            <div>
              <label htmlFor="">Your Field</label>
              <input type="text"
              value = {field}
              required
              placeholder='Art, Journalism, Tech, Design, Photography... etc'
              onChange={(e)=>setField(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Specializations</label>
              <input type="text"
              placeholder='Web Dev, Photoshop, UI, Portraits  ... etc'
              value={tempSpecialization}
              onChange={(e)=> setTempSpecialization(e.target.value)}
              />
              {tempSpecialization!=='' &&<button type='button' onClick={addSpecializations}>Add</button> }
              <div className="form-list">
            {specializations.map((spec,index)=>{
              return <div className="item" key={index}>
              <small>{spec}</small>
              <FontAwesomeIcon icon={faClose} className='remove-item' onClick={()=>removeFromList(index)}/>
              </div>
            })}
           </div>
            </div>

            <div>
              <label htmlFor="">Your Skills</label>
              <input type="text"
              placeholder='Java, Adobe, creative writing ... etc'
              value={tempSkills}
              onChange={(e)=>{setTempSkills(e.target.value)}}
              />
              {tempSkills!=='' &&<button type='button' onClick={addSkills}>Add</button> }
              <div className="form-list">
            {skills.map((skill,index)=>{
              return <div className="item" key={index}>
              <small>{skill}</small>
              <FontAwesomeIcon icon={faClose} className='remove-item' onClick={()=>removeSkill(index)}/>
              </div>
            })}
           </div>
            </div>
            {loading?<div className='btn-loader'></div>:<button type="submit">Submit</button>}
          </form>
    </>
  )
}

export default CreativeForm