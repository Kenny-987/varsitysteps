'use client'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const DeleteFile = ({file,setFile,setFiles}) => {
  const [loading,setLoading]=useState(false)
    let file_id = file.id

    const deleteFile=async()=>{
      setLoading(true)
        try {
           const response =  await fetch(`http://localhost:3000/tutors/deletefile/${file.id}`,{
            method:"DELETE",
            credentials:'include'
           })
           if(response.ok){
            setFiles((prevFiles) => prevFiles.filter(file => file.id !== file_id));
            setFile(null)
           }
        } catch (error) {
            console.error('oopsies')
        }finally{
          setLoading(false)
        }
    }


  return (
    <div className="overlay">
      <div className='deletefilemodal'>
        <FontAwesomeIcon icon={faWarning} size='3x' color='red'/>
        <h4>Are you sure you want to the file: {file?.filename}?</h4>
        <p>This action cannot be undone!</p>
        {loading?<div className='btn-loader'></div>:<div className="file-actions">
        <button type="submit" className='delete-btn' onClick={deleteFile}>Delete</button>
        <button className="download-btn" onClick={()=>setFile(null)}>Cancel</button>
        </div>}
        
    </div>
    </div>
    
  )
}

export default DeleteFile