'use client'
import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import '../dashboadcss/edit.css'
import '../../globals.css'
import { useContextUser } from '../../hooks/Context';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
    const {setUserData,userData,isAuthenticated} = useContextUser()
    const [username,setUsername]=useState('')
    const [bio,setBio]=useState(userData.bio||'')
    const [location,setLocation]=useState('') 
    const [email,setEmail]=useState('')
    // const [phone,setPhone]=useState('')
    const [programme,setProgramme]=useState('')
    const [institution,setInstitution]=useState('')
    const [loading,setLoading]=useState(false)
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const userId = userData.id

 
  
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isAuthenticated]);
    
    

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
     

    if (!isAuthenticated) {
      return null
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
      // phone,
      programme,
      institution,
      // bio,
      // field,
      // skills,
      // specializations
    }
  }else{
    updatedData={
      username,
      location,
      email,
      // phone,
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
  
  const response = await fetch(`/api/user/update/${userId}`,{
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
      // console.log(data.creator);
      
      const updatedData = {...userData,...data.user}
      setUserData(updatedData)
      
    }
    setLoading(false)
    window.location.href = '/dashboard'
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
          type="name" 
          id="name" 
          name="name"
          value={username}
          placeholder ={userData.username}
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

        {/* <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type='phone'
           id="phone" 
           name="phone"
           value={phone}
           placeholder ={user.phone}
          onChange={(e) => setPhone(e.target.value)} 
            />
        </div> */}

        

        <div className="form-group">
          <label htmlFor="programme">Programme</label>
          <input 
          type="programme" 
          id="programme" 
          name="programme" 
          value={programme}
          placeholder ={userData.programme}
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
          placeholder ={userData.institution}
          onChange={(e) => setInstitution(e.target.value)}
           />
        </div>

        
        {loading?<div className='btn-loader'></div>:<div className='form-btns'>
          <button >Save</button>
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
export default EditProfile