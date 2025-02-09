'use client'
import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import './dashboadcss/edit.css'
import '../globals.css'
import { useContextUser } from '../hooks/Context';


const EditProfile = ({setShowEditForm,user,creatorData}) => {
    const [username,setUsername]=useState('')
    const [bio,setBio]=useState(user.bio||'')
    const [location,setLocation]=useState('') 
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [programme,setProgramme]=useState('')
    const [institution,setInstitution]=useState('')
    const [loading,setLoading]=useState(false)
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const {setUserData,userData,setCreatorData} = useContextUser()
    const userId = user.id
    const [field,setField]=useState('')
    const [specializations,setSpecialization]=useState(creatorData?.specializations||[])
    const [skills,setSkills]=useState(creatorData?.skills||[])
    const [tempSpecialization,setTempSpecialization] = useState('')
    const [tempSkills,setTempSkills]=useState('')
 
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
     
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

    
    
const updateInfo = async(e)=>{
  e.preventDefault();
  setLoading(true)
  let updatedData
  if(userData.role_name.includes('creator')){
     updatedData={
      username,
      location,
      email,
      phone,
      programme,
      institution,
      bio,
      field,
      skills,
      specializations
    }
  }else{
    updatedData={
      username,
      location,
      email,
      phone,
      programme,
      institution,
      bio
    }
  }

let newUserData={}
Object.keys(updatedData).forEach((key)=>{
  if(updatedData[key]!==null && updatedData[key]!==''){
    newUserData[key]=updatedData[key]
  }
})

try {

  if(Object.keys(newUserData).length ===0){
    setShowMessage(true)
    setLoading(false)
    return setMessage('Update at least 1 field'); 
  }
  
  const response = await fetch(`https://varsitysteps-server.onrender.com/user/update/${userId}`,{
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
    credentials: 'include',
  })
  if(response.ok){
    const data = await response.json()
    console.log(data);
    
    if(data){
      console.log(data.creator);
      
      const updatedData = {...userData,...data.user}
      setUserData(updatedData)
      
      if(data.creator ){
        const updatedCreatorData = {...creatorData,...data.creator}
        setCreatorData(updatedCreatorData)
      }
    }
    setLoading(false)
     setShowEditForm(false)
  }else{
       setShowMessage(true)
        setMessage('update failed');
        setLoading(false)
  }
} catch (error) {
  console.error(error)
      setShowMessage(true)
      setMessage('Error failed to update');
      setLoading(false)

}

}
  return (
    <div className='edit-profile'>
      <div className='edit-profile-content'>
      <form onSubmit={updateInfo} >
        <h3>Edit Your Profile <FontAwesomeIcon onClick={()=>setShowEditForm(false)} icon={faClose}/></h3>
      <div className="form-group">
          <label htmlFor="name">Fullname</label>
          <input 
          type="name" 
          id="name" 
          name="name"
          value={username}
          placeholder ={user.username}
          onChange={(e) => setUsername(e.target.value)} 
           />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea 
          id="bio" 
          name="bio" 
          value={bio}
          placeholder ='Tell us a bit about yourself.'
          onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input 
          type="location" 
          id="location" 
          name="location" 
          value={location}
          placeholder ={user.location}
          onChange={(e) => setLocation(e.target.value)}
           />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type='email'
           id="email" 
           name="email"
           value={email}
           placeholder ={user.email}
          onChange={(e) => setEmail(e.target.value)} 
            />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type='phone'
           id="phone" 
           name="phone"
           value={phone}
           placeholder ={user.phone}
          onChange={(e) => setPhone(e.target.value)} 
            />
        </div>

        

        <div className="form-group">
          <label htmlFor="programme">Programme</label>
          <input 
          type="programme" 
          id="programme" 
          name="programme" 
          value={programme}
          placeholder ={user.programme}
          onChange={(e) => setProgramme(e.target.value)}
           />
        </div>

        <div className="form-group">
          <label htmlFor="institute">Your College/University</label>
          <input 
          type="institute" 
          id="institute" 
          name="institute" 
          value={institution}
          placeholder ={user.institution}
          onChange={(e) => setInstitution(e.target.value)}
           />
        </div>

        {/* {creatorData && 
          <div className="form-group">
          <label htmlFor="field">Field</label>
          <input 
          type="field" 
          id="field" 
          name="field" 
          value={field}
          placeholder ={creatorData.field}
          onChange={(e) => setField(e.target.value)}
           />
        </div>
        } */}

{/* {creatorData &&  <div className='form-group list-parent'>
              <label htmlFor="">Specializations</label>
              <input type="text"
              placeholder='Web Dev, Photoshop, UI, Portraits  ... etc'
              value={tempSpecialization}
              onChange={(e)=> setTempSpecialization(e.target.value)}
              onKeyDown={(e)=>
                e.key==='Enter'?addSpecializations:''
              }
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
            </div>} */}

          {/* {creatorData && <div className='form-group'>
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
            </div>} */}
        {loading?<div className='btn-loader'></div>:<div className='form-btns'>
          <button >Save</button>
          <button onClick={()=>setShowEditForm(false)}>Cancel</button>
          </div>}
      </form>
      {showMessage && <div className='authmessage'>
        <FontAwesomeIcon icon={faInfoCircle}/>
        <p>{message}</p>
        <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}

      </div>
        
    </div>
  )
}
export default EditProfile