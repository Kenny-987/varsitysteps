'use client'
import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faInfoCircle,faStar} from '@fortawesome/free-solid-svg-icons';
import '../../dashboard/dashboadcss/edit.css'
import { useContextUser } from '../../hooks/Context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

const EditTutorProfile = () => {
    const {setUserData,userData,isAuthenticated} = useContextUser()
    const router= useRouter()
    const [username,setUsername]=useState('')
    const [location,setLocation]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [valid,setValid] = useState(false)
    const [qualifications,setQualifications]=useState(userData.qualifications||[])
    const [tempQualifications,setTempQualifications] = useState("")
    const [teaches,setTeaches]=useState(userData.teaches||[])
    const [tempSubject,setTempSubject]=useState("")
    const [bio,setBio]=useState(userData.bio||'')
    const [teaching_method,setTeachingMethod]=useState(userData.teaching_method||'')
    const [loading,setLoading]=useState(false)
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [base_charge,setBaseCharge]= useState(userData.base_charge||'')
    const [upgrade,setUpgrade]=useState(false)
    const userId =userData.id
   
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isAuthenticated]);
    
    if (!isAuthenticated) {
      return null
    }
//function to add data in array format

const addtolist=()=>{
  if(userData.is_premium == false){
    if(teaches.length<2){
      const updatedSubjects = [...teaches,tempSubject]
      setTeaches(updatedSubjects)
    }else if(teaches.length>=2){
      setUpgrade(true)
    }  
    }else if(userData.is_premium){
      const updatedSubjects = [...teaches,tempSubject]
      setTeaches(updatedSubjects)
    }
  
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
  setLoading(true)
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

  const response =  await fetch(`http://localhost:3000/user/update/${userId}`,{
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
    credentials: 'include',
  })
  if(response.status == 200){
    const data =  await response.json()
    if(data){
      const updatedData = {...userData,...data.user}
      setUserData(updatedData)
      router.back()
    //  window.location.href = '/tutordashboard'
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
      <h3>Edit Your Profile <FontAwesomeIcon onClick={()=>router.back()} icon={faClose}/></h3>
      <div className="form-group">
          <label htmlFor="name">Fullname</label>
          <input 
          type="text" 
          id="name" 
          name="name"
          value={username}
          placeholder ={userData.username}
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
          placeholder ={userData.location}
          onChange={(e) => setLocation(e.target.value)}
           />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type='email'
           id="email" 
           name="email"
           value={email}
           placeholder ={userData.email}
          onChange={(e) => setEmail(e.target.value)} 
            />
        </div>

        {userData.is_premium? <div className="form-group">
          <label htmlFor="phone">WhatsApp Number</label>
          <PhoneInput
          country={'zw'}
           id="phone" 
           value={phone}
           onChange={(newValue) => {
            setPhone(newValue); // Use the parameter passed by onChange
          }}
        
            />
        </div> : <div className="form-group">
        <label htmlFor="phone">WhatsApp Number</label>
        <button><FontAwesomeIcon icon={faStar}/> <Link href='/tutordashboard/premium-checkout'>Get premium and include a direct link to your WhatsApp</Link></button>
          </div> }
        

     
        <div className="form-group">
          <label htmlFor="teaches">What do you Teach</label>
          <input 
          type="text" 
          id="teaches" 
          name="teaches" 
          value={tempSubject}
          placeholder ='eg mathematics'
          onChange={(e)=> setTempSubject(e.target.value)}
          readOnly ={teaches.length >= 2 && !userData.is_premium ? true:false }
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
           {teaches.length >= 2 && !userData.is_premium && <p className='upgrade'><Link href='/tutordashboard/premium-checkout'><FontAwesomeIcon icon={faStar}/> Upgrade to premium and add unlimited subjects</Link></p> }
            
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
        {loading?<div className='btn-loader'></div>:<div className='form-btns'>
          <button type="submit">Save</button>
          <button onClick={()=>router.back()}>Cancel</button>
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