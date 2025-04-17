'use client'
import React ,{useState}from 'react'
import '../css/premium.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBookOpen, faChartLine, faFolder, faGlobe, faInfoCircle, faLink, faPenNib, faPeopleGroup, faPhone, faTools, faUser, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useContextUser } from '../../hooks/Context'
import { faUikit } from '@fortawesome/free-brands-svg-icons'

const PremiumModal = () => {
  const [loading,setLoading]=useState(false)
  const {userData}=useContextUser()
  const [phone,setPhone] = useState('')
  const [proof,setProof]=useState(null)
  const [message,setMessage] =useState('')
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setProof(file); // Set the file in state
    }
  };
  const submitProof =async(e)=>{
    setLoading(true)
    e.preventDefault()
    const formData = new FormData();
  formData.append('proof', proof);
 
    try {
      const response =  await fetch(`/api/pay/uploadproof`,{
        method:'POST',
        body: formData,
        credentials: 'include', 
      })
      if(response.ok){
        console.log('ok');
        setMessage('Submission successful! Thank you')
      }else{
        setMessage('Error submitting file')
      }
    } catch (error) {
      setMessage('Application error try again later')
      console.error(error)
    }finally{
      setLoading(false)
    }
  }

  return (

      <div className="premium-checkout">
       <h4>Become a premium member for only $5/month (135/ZWG)</h4>
       <div className="benefits">
        <div className="benefit">
          <p>Increased Visibility <FontAwesomeIcon icon={faChartLine}/></p>
          <span>Your profile appears at the top of the search results as well as the Featured tutors page.</span>
        </div>

        <div className="benefit">
          <p>Direct link to WhatsApp <FontAwesomeIcon icon={faLink}/></p>
          <span>Include a direct link to your WhatsApp inbox, allowing students to contact you quickly and directly without the hassle of connecting first on the platform!</span>
        </div>

        <div className="benefit">
          <p>Add unlimited Subjects <FontAwesomeIcon icon={faBookOpen}/></p>
          <span>List as many subjects that you teach with no limit. Tutors profiles appear based on searched subjects, the more subjects you teach, the more visible you are.</span>
        </div>
        <div className="benefit">
          <p>Unlimited Classes <FontAwesomeIcon icon={faPeopleGroup}/></p>
          <span>Create as many classes for group discussions as you want with no limits</span>
        </div>
        <div className="benefit">
          <p>Unlimited Call Time <FontAwesomeIcon icon={faPhone}/></p>
          <span>No monthly time limit on video calls</span>
        </div>
        <div className="benefit">
          <p>Record and save video call <FontAwesomeIcon icon={faVideo}/></p>
          <span>You can record and share video lessons with your students</span>
        </div>
        <div className="benefit">
          <p>Added Storage <FontAwesomeIcon icon={faFolder}/></p>
          <span>Send and store as many files as you want on the platform with up to 50GB worth</span>
        </div>
        <div className="benefit">
          <p>New Features <FontAwesomeIcon icon={faUikit}/></p>
          <span>As the plarform grows, be the first to test and make the most of new features both free and premium</span>
        </div>
        <div className="benefit">
          <p>Priority Support <FontAwesomeIcon icon={faTools}/></p>
          <span>As a premium member you get priority support and assistance on any issues you might be facing!</span>
        </div>
       </div>

      <div className="steps-modal">
        <div className="steps">
        <p className='notice'><FontAwesomeIcon icon={faInfoCircle}/> We are working on making the process automated and faster for you, but for now please follow the following steps to pay for premium membership. </p>
        <p className='step'>Step 1: Deposit $5 or 135 ZWG into the following ecocash account: <span>0789644097 | Kenneth P Madondo</span></p>

        <p className='step'>step 2: Send proof of payment</p>
        <form onSubmit={submitProof} className='step'>
        <label htmlFor="proof">Attach proof of payment</label>
        <input type="file" 
        name="proof" 
        id="proof"
        accept='.pdf,.png,.jpg,.jpeg'
        onChange={handleFileChange} />
        <label htmlFor="number">Add WhatsApp number to recieve confirmation (optional)</label>
        <input type="text"
        value={phone}
        placeholder={userData.phone?userData.phone:''}
        onChange={(e)=>{
          setPhone(e.target.value)
        }}
        />
        {loading?<div className='btn-loader'></div>:<button type="submit">Submit</button>}
        {message && <p>{message}</p>}
        </form>
       <p>Or send via WhatsApp to <a target='_blank' href={`https://wa.me/+263789644097?text=Proof of payment for ${userData.username}, userID: ${userData.id}`}>+263789644097</a> along with your username: {userData.username} and userID: {userData.id}</p>
        <p className='step'>Step 3: Wait for confirmation (24hrs)</p>
        
       
        </div>
        
       </div> 
       
      </div>
  )
}

export default PremiumModal