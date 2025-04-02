'use client'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState} from 'react'
import { useDropzone } from 'react-dropzone'


const Dropzone = ({setFileOptions,user_id,setFiles,flag,classid}) => {
    const [files,setFilesUpload]=useState([])
    const [loading,setLoading]=useState(false)
    const maxFiles = 10; 
    const maxSize = 5 * 1024 * 1024; 
    const role = localStorage.getItem('role')

    console.log(flag);
    console.log(classid);
    
    let file_type,student_id,tutor_id
    if(role =='tutor' && !flag){
      file_type = 'tutorfile'
      student_id = user_id
    }else if(flag && role=='tutor'){
      file_type='classfiles'
      tutor_id=user_id
    }else{
      file_type='studentfile'
      student_id = null
      tutor_id = user_id
    }
 
  const onDrop = (acceptedFiles,rejectedFiles) => {
    if (acceptedFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      return;
    }
    if (rejectedFiles.length > 0) {
        alert(
          `Some files are too large. Maximum size is ${maxSize / 1024 / 1024}MB.\n
          Some files were rejected. Please make sure they are images (jpg, png) or documents (pdf, docx, xlsx).`
        );
      }
    setFilesUpload((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleRemoveFile = (fileToRemove) => {
    // Remove file from the list before uploading
    setFilesUpload((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  }
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: '.jpg, .jpeg, .png, .pdf, .docx, .xlsx, .pptx', 
    maxSize
  });



  const handleSubmit = async (event) => {
    event.preventDefault();
    if(files.length===0){
      return alert('no files added')
    }
    setLoading(true)
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('student_id', student_id);
    formData.append('file_type', file_type);
    formData.append('tutor_id', tutor_id);
    formData.append('class_id',classid)
    formData.append('format',null)
    try {
      const response =  await fetch('/api/tutors/fileupload', {
        method: 'POST',
        body: formData,
        credentials:'include'
      });

      if (response.ok) {
        const data =  await response.json()
        if(flag=='classfiles'){
          setFiles(data.filter(data=>data.file_type =='classfiles'))
        }else if(data.file_type=='tutorfile'){
          setFiles(data.filter(data=>data.file_type=='tutorfile'))
        }else{
          setFiles(data.filter(data=>data.file_type=='studentfile'))
        }
       setFileOptions('view')
       setFilesUpload([])
      } else {
        alert('Error uploading files');
      }
    } catch (error) {
      alert('Error uploading files');
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="uploadfile">
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps({
          className: 'dropzone',
          style: {
            border: '2px dashed #007bff',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          },
        })}
      >
        <input {...getInputProps()} />
        <p><FontAwesomeIcon icon={faCloudArrowUp}/> Drag & drop files here, or click to select files. Only 10 files at a time</p>
      </div>
      {loading? <div className='btn-loader'></div>:<div className="file-actions">
      <button type="submit" className='download-btn'>Upload Files</button>
      <button className="delete-btn" onClick={()=>{setFileOptions('view')}}>Cancel</button>
      </div>}
      

    </form>
    <ul>
        {files.length > 0 && (
          <div className='filestoupload'>
            <h3>Files to Upload:</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name}{' '}
                  <span onClick={() => handleRemoveFile(file)} className='removefile'>Remove</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ul>
      
    </div>
  )
}

export default Dropzone