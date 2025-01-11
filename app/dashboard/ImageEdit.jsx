import React, {useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose,faEdit,faTrash,faUpload,faUser,faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useContextUser } from '../hooks/Context'

const ImageEdit = ({Id,profile_image,setEditImage,setProfileImage}) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const {setUserData,userData} = useContextUser()
  const userId = Id


const handleFileChange = (e) => {
  const file = e.target.files[0]; // Get the selected file
  if (file) {
    setImage(file); // Set the image file in state
    setPreviewImage(URL.createObjectURL(file)); // Create a preview URL
  }
};

const editImage=async (e)=>{
  if (!image) return;

setLoading(true)
  const formData = new FormData();
  formData.append('profilePicture', image);
  formData.append('userId', userId);
try {
  const response = await fetch(`https://varsitysteps-server.onrender.com/user/profile-picture`,{
    method:'POST',
    credentials:'include',
    body:formData
  })
  if(response.ok){
    const data = await response.json(); 
    const updatedData = {...userData,...data.user}
    setUserData(updatedData)
    setEditImage(false)
    setImage(null)
    setLoading(false)
  }
  else{
    console.log('oops')
    setMessage('Could not update image')
    setLoading(false)
    setPreviewImage(false)
    setShowMessage(true)
  }
} catch (error) {
  setMessage('server or network error')
  setLoading(false)
  setPreviewImage(false)
  console.error(error)
  setShowMessage(true)
}
 
}

const deleteImage = async ()=>{

  setLoading(true)
  try {
    const response = await fetch(`https://varsitysteps-server.onrender.com/user/delete-picture/${userId}`,{
      method:'DELETE',
      credentials:'include',
    })
    if(response.ok){
      const data = await response.json(); 
    const updatedData = {...userData,...data.user}
    setUserData(updatedData)
      setLoading(false)
      setEditImage(false)
    }else{
      console.log('CANNOT DELETE');
      setMessage('Image could not be deleted at this time')
      setLoading(false)
      setShowMessage(true)
    }
  } catch (error) {
    console.log(error)
    setMessage('server or network error')
    setLoading(false)
    setShowMessage(true)
  }
}

  return (
    <div className='edit-image'>
      <p>Edit Profile Image <FontAwesomeIcon icon={faClose} onClick={()=>setEditImage(false)} /></p>
      {loading ? <div className='btn-loader'></div>:<div className="currentImage">
      {profile_image ? <Image alt="profile-image" src={profile_image} width={300} height={300}/> : <div className="icons">
          <FontAwesomeIcon className="icon" icon={faUser}/>
        </div>}
      </div>}
      
      <div className="profile-pic-buttons">
      <form  > 
            <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange}   required />
          {/* {profile_image} */}
          {profile_image ? <div><label htmlFor="file-upload" className="upload-button"> <FontAwesomeIcon icon={faEdit}/> Edit Image</label>
          </div> :
          <label htmlFor="file-upload" className="upload-button"> <FontAwesomeIcon icon={faUpload}/> Choose image</label> } 
      </form>
      {previewImage && !loading && 
      <div className="new-image-preview">
        <p>New Image</p>
        <div className="new-image">
        <Image alt="image-preview"  src={previewImage} width={200} height={200} />
        </div>
        <div className="save-cancel">
        <button onClick={()=>editImage()}>save</button>
        <button onClick={()=>{setImage(null),setPreviewImage(null)}}>cancel</button>
        </div>
      </div>}
      {profile_image && <label onClick={deleteImage}  className="upload-button"> <FontAwesomeIcon icon={faTrash}/> Delete Image</label>}
      
      </div>
 
      {showMessage && <div className='authmessage'>
        <FontAwesomeIcon icon={faInfoCircle}/>
        <p>{message}</p>
        <FontAwesomeIcon icon={faClose} onClick={()=>setShowMessage(false)}/>
        </div>}
    </div>
  )
}

export default  ImageEdit


// {profile_image ? <button type="submit" disabled={uploading}>
// <FontAwesomeIcon icon={faEdit}/> Edit
// <input type="file" onChange={(e)=>setFile(e.target.files[0])} accept="image/*" required />
// </button>:<button>
// <FontAwesomeIcon icon={faEdit}/> Add image
// <input type="file" onChange={(e)=>setFile(e.target.files[0])} accept="image/*" required />
// </button>}

// {profile_image && <button type="submit" disabled={uploading}>
// <FontAwesomeIcon icon={faTrash}/> 
// </button>}