'use client'
import React,{useState,useEffect} from 'react'


const EditClass = ({setClassDetails,classDetails,setEditClass}) => {
    const [classname,setClassname]=useState(classDetails.name || '')
    const [description,setDescription]=useState(classDetails.description|| '')
    const [loading,setLoading]=useState(false)
    const [message,setMessage]=useState(null)

    const editClass = async (e)=>{
        if(classname.trim("") == ""){
            return setMessage('Class name cannot be empty')
        }
        setLoading(true)
          e.preventDefault()
          try {
            const response =  await fetch(`/api/tutors/editclass`,{
              method:'PUT',
              credentials:'include',
              headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({classname, description,classid:classDetails.id })
            })
            if(response.ok){
              const data =  await response.json()
              console.log(data);
              
              setClassDetails(data)
              setEditClass(false)
            }
          } catch (error) {
            console.log(error);
            setMessage('Error creating editing details')
          }finally{
            setLoading(false)
          }
        }

        
  return (
    <div className="overlay">
      <div className='createclass'> 
        <h3>Edit class details</h3>
        {message && <p className='success-message' style={{background:'red'}}>{message}</p>}
        <form onSubmit={editClass}>
            <div className="classformfield">
            <label htmlFor="name">Edit classname</label>
            <input type="text"
            required
            value={classname}
            onChange={(e)=>{setClassname(e.target.value)}}
             name="name" 
             id="name" />
            </div>

            <div className="classformfield">
            <label htmlFor="desc">Edit Description</label>
            <textarea name="desc" 
            id="desc"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
            </div>
            {loading ? <div className='btn-loader'></div>:
            <div className="createactions">
            <button onClick={()=>setEditClass(false)} className='cancel'>cancel</button>
            <button className='save' type='submit'>save</button>
            </div> 
            }
     
        </form>
       
    </div>
    </div>
    
  )
}

export default EditClass