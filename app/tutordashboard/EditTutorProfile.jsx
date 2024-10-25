'use client'
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import '../dashboard/dashboadcss/edit.css'
import { useContextUser } from '../hooks/Context';

const EditTutorProfile = ({setShowEditForm,user}) => {
    const [username,setUsername]=useState('')
    const [location,setLocation]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [qualifications,setQualifications]=useState(user.qualifications||[])
    const [tempQualifications,setTempQualifications] = useState("")
    const [teaches,setTeaches]=useState(user.teaches||[])
    const [tempSubject,setTempSubject]=useState("")
    const [bio,setBio]=useState(user.bio||'')
    const [teaching_method,setTeachingMethod]=useState(user.teaching_method||'')
    const [loading,setLoading]=useState(false)
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [base_charge,setBaseCharge]= useState(user.base_charge||'')
    const {setUserData,userData} = useContextUser()
    const userId =user.id
    //the teaches variable means subject, i just used teaches to match the db

//function to add data in array format
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
    //end of functions to add data in array format


//fuction to update info
const updateInfo = async(e)=>{
  e.preventDefault();
  // setLoading(true)
const updatedData={
  username,
  location,
  email,
  phone,
  teaches,
  qualifications,
  bio,
  teaching_method,
  base_charge
}
let newUserData={}
Object.keys(updatedData).forEach((key)=>{
  if(updatedData[key]!==null && updatedData[key]!==''){
    newUserData[key]=updatedData[key]
  }
})
console.log(newUserData, 'and ID ',userId)

try {



  if(Object.keys(newUserData).length ===0 || Object.values(newUserData).every(value=>Array.isArray(value) && value.length === 0)){
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
  if(response.status == 200){
    const data = await response.json()
    if(data){
    console.log()
      const updatedData = {...userData,...data.user}
      setUserData(updatedData)
     setShowEditForm(false)
    }
    setLoading(false)
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
          type="text" 
          id="name" 
          name="name"
          value={username}
          placeholder ={user.username}
          onChange={(e) => setUsername(e.target.value)} 
           />
        </div>
        <div className="form-group">
          <label htmlFor="charge">Your minimum charge/month</label>
          <input 
          type="number" 
          id="charge" 
          name="charge"
          value={base_charge}
          placeholder = 'eg 10'
          onChange={(e) => setBaseCharge(e.target.value)} 
           />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input 
          type="text" 
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
          <input type='text'
           id="phone" 
           name="phone"
           value={phone}
           placeholder ={user.phone}
          onChange={(e) => setPhone(e.target.value)} 
            />
        </div>

     
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
          <label htmlFor="qaulifications">Qualifications</label>
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

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea 
          id="bio" 
          name="bio" 
          value={bio}
          placeholder ='Tell us a bit about yourself and mention how you can help students succeed.'
          onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="method">Teaching Method</label>
          <textarea 
          id="method" 
          name="method" 
          value={teaching_method}
          placeholder ='Tell us a bit about yourself and mention how you can help students succeed.'
          onChange={(e) => setTeachingMethod(e.target.value)}
          
          />
        </div>
        {loading?<div className='loading'>...loading</div>:<div className='form-btns'>
          <button type="submit">Save</button>
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

export default EditTutorProfile