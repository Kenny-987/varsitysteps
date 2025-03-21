'use client'
import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import './files.css'
import Dropzone from './Dropzone'
import DeleteFile from './DeleteFile'

const StudentSubmissions = ({setContent,user_id}) => {
  const role = localStorage.getItem('role')
  const [files,setFiles]=useState([])
  const [loading,setLoading]=useState(false)
  const [file,setFile]=useState(null)
  const[fileOptions,setFileOptions]=useState('view')
  let url
  if(role=='student'){
    url=`http:localhost:3000/tutors/myfiles`
  }else{
    url=`http:localhost:3000/tutors/sharedfiles/${user_id}`
  }

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
        setFiles(data)
        console.log(data);
        
      }
    } catch (error) {
      alert('error fetching')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='filesysytem'>
      <div onClick={()=>setContent('dashboard')} className="showmain">
      <FontAwesomeIcon icon={faArrowLeft} />{" "}Back
      </div>
      <h4>{role=='tutor'?"View Files uploaded by your student":'Send and manage files you send to your tutor'}</h4>
      
          {fileOptions == 'view' &&
          <>
          {loading ? <div className='btn-loader'></div>: <div className="filesdisplay">
          <h4>Uploaded Files <small>{files.length} files</small></h4>

          {role == 'student' && <button className='addfilebtn' onClick={()=>setFileOptions('upload')}> <FontAwesomeIcon icon={faPlusSquare}/> Add files</button>}
          

          
            {files.length === 0 ? <p>No files uploaded yet</p>:
             <div className="file-list">
             {files.map((file) => (
               <div key={file.id} className="file-card">
                 <div className="file-info">
                   <h3>{file.filename}</h3>
                   <p><strong>Uploaded:</strong> {new Date(file.uploaded_at).toLocaleDateString()}</p>
                   <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                 </div>
                
                 <div className="file-actions">
                   <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="download-btn">
                     Download
                   </a>
                   {role == 'student' &&  <button onClick={() => setFile(file)} className="delete-btn">
                     Delete
                   </button>}
                 </div>
                 
               </div>
             ))}
             {file && <div className="deletefilemodal">
                  <DeleteFile file={file} setFile={setFile} setFiles={setFiles} />
                </div> }
            
             </div>
            }  
      </div>}
          </>
          }
   
      {fileOptions =='upload' && <Dropzone setFileOptions={setFileOptions} user_id={user_id} setFiles={setFiles}/>}
     
      </div>
  )
}

export default StudentSubmissions