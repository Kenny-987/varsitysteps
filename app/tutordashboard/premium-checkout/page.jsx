'use client'
import React ,{useState}from 'react'
import '../css/premium.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBookOpen, faChartLine, faGlobe, faInfoCircle, faLink, faPenNib, faTools, faUser } from '@fortawesome/free-solid-svg-icons'
import { useContextUser } from '../../hooks/Context'

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
      const response = await fetch(`/testing/pay/uploadproof`,{
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
       <h4>Become a premium member for only $4/month (120/ZWG)</h4>
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
          <p>Unlimited bio <FontAwesomeIcon icon={faUser}/></p>
          <span>No limit on the characters for you bio</span>
        </div>
        <div className="benefit">
          <p>Social Media Promotion <FontAwesomeIcon icon={faGlobe}/></p>
          <span>Get promoted on our social media platforms</span>
        </div>
        
        <div className="benefit">
          <p>Priority Assistance <FontAwesomeIcon icon={faTools}/></p>
          <span>As a premium member you get priority support and assistance on any issues you might be facing!</span>
        </div>
       </div>

      <div className="steps-modal">
        <div className="steps">
        <p className='notice'><FontAwesomeIcon icon={faInfoCircle}/> We are working on making the process automated and faster for you, but for now please follow the following steps to pay for premium membership. </p>
        <p className='step'>Step 1: Deposit $4 or 120 ZWG into the following ecocash account: <span>0789644097 | Kenneth P Madondo</span></p>

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