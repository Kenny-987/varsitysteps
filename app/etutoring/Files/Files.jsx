'use client'
import React,{useState,useEffect} from 'react'
import './files.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faClose, faDownload, faFileDownload, faInfoCircle, faPlayCircle, faPlusSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Dropzone from './Dropzone'
import DeleteFile from './DeleteFile'
import { useContextUser } from '../../hooks/Context'

const Files = ({setContent,user_id,flag,classid}) => {
  const[fileOptions,setFileOptions]=useState('view')
  const [files,setFiles]=useState([])
  const [loading,setLoading]=useState(false)
  const [file,setFile]=useState(null)
  const role = localStorage.getItem('role')
  const {userData}=useContextUser()
  const myId = userData.id
  const [selectedVideo, setSelectedVideo] = useState(null);
  //note: user_id is the id of uploader which in this case is the tutor
  let tutor_id,student_id,uploader_id


  if(role=='tutor'){
    uploader_id = myId
    student_id = user_id
  }else if (role == "student"){
    uploader_id = user_id
    student_id = myId
  }
 const url=`http://localhost:3000/tutors/sharedfiles?uploader_id=${uploader_id}&student_id=${student_id}&class_id=${classid}`

  useEffect(()=>{
      fetchFiles()
  },[])


  const fetchFiles = async()=>{
    setLoading(true)
    try {
      const response =  await fetch(url,{
        credentials:'include'
      })
      if(response.ok){
        const data =  await response.json()
        if(flag=='classfiles'){
          setFiles(data.filter(data=>data.file_type =='classfiles'))
        }else{
          setFiles(data.filter(data=>data.file_type=='tutorfile'))
        }
        
      }
    } catch (error) {
      alert('error fetching')
    }finally{
      setLoading(false)
    }
  }

  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes >= 1024 * 1024) {
        return (sizeInBytes / (1024 * 1024)).toFixed(2) + " Mb"; // Convert to MB
    } else {
        return (sizeInBytes / 1024).toFixed(2) + " kb"; // Convert to KB
    }
};

const videos = files.filter((file)=>file.mimetype == 'video/webm')



  return (
    <div className='filesystem'>
      <div onClick={()=>setContent('dashboard')} className="showmain">
      <FontAwesomeIcon icon={faArrowLeft} />{" "}Back
      </div>
      <h4>{role == 'tutor'?"Manage and upload files for your student":"View file shared by your tutor"}</h4>
      {role == 'tutor' && <p className='info'><FontAwesomeIcon icon={faInfoCircle}/> Here, you can upload and share files such as notes, resource or assignments for your students to view or download</p> }
      
      {fileOptions == 'view' && 
      <>
        {loading ? <div className='btn-loader'></div>: 
        <div className="files-container">
        <div className="filesdisplay">
          <h4>Uploaded Files: <small>{files.length} files</small></h4>
          {role == 'tutor' && <button className='addfilebtn' onClick={()=>setFileOptions('upload')}> <FontAwesomeIcon icon={faPlusSquare}/> Add files</button>} 
            {files.length === 0 ? <p>No files uploaded yet</p>:
             <div className="file-list">
             {files.filter((file)=>file.mimetype !== 'video/webm').map((file) => (
               <div key={file.id} className="file-card">
                 <div className="file-info">
                   <h3>{file.filename}</h3>
                   <p><strong>Uploaded:</strong> {new Date(file.uploaded_at).toLocaleDateString()}</p>
                   <p><strong>Size:</strong> {formatFileSize(file.size)}</p>
                 </div>
                
                 <div className="file-actions">
                   <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="download-btn">
                     Download
                   </a>
                   {role == 'tutor' &&  <button onClick={() => setFile(file)} className="delete-btn">
                     Delete
                   </button>}
                 </div>
                 
               </div>
             ))}
             </div>
            }       
      </div>

      {videos.length > 0 && 
      <div className="videos-container">
        <h4 className="title">Posted Videos</h4>
        <div className="video-grid">
          {videos.map((vid,index)=>{
           return <div className="video-card" key={index}>
            {/* Thumbnail Preview */}
            <video
              src={vid.file_url}
              className="video-thumbnail"
              onClick={() => setSelectedVideo(vid)}
            ></video>

            <p className="video-title">{vid.filename}</p>

            {/* Buttons */}
            <div className="video-actions">
              <button onClick={() => setSelectedVideo(vid)}><FontAwesomeIcon icon={faPlayCircle}/></button>
              <a href={vid.file_url} download={vid.filename}>
                <button><FontAwesomeIcon icon={faDownload}/></button>
              </a>
              {role=='tutor' && 
                <button className="delete-btn" onClick={()=>{setFile(vid)}}><FontAwesomeIcon icon={faTrashCan}/></button>
              }
            </div>
          </div>
          })}
        </div>
      </div>
      }
        {/* Video Player Modal */}
        {selectedVideo && (
        <div className="overlay">  
          <div className="modal-content">
          <span className="close-video" onClick={() => setSelectedVideo(null)}>
              <FontAwesomeIcon icon={faClose}/>
            </span>
            <video src={selectedVideo.file_url} controls autoPlay></video>
          </div>
        </div>
      )}
        </div>
        }
        {file && <div className="overlay">
                  <DeleteFile file={file} setFile={setFile} setFiles={setFiles} />
                </div> }
      </>
     }
     
      {fileOptions =='upload' && <Dropzone setFileOptions={setFileOptions} user_id={user_id} setFiles={setFiles} flag={flag} classid={classid}/>}
     
   
    
    </div>
  )
}

export default Files