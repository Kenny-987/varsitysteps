'use client'
import React,{useEffect,useState} from 'react'

const CreateClass = ({setCreateModal,setClasses}) => {
const [classname,setClassname]=useState('')
const [description,setDescription]=useState('')
const [message,setMessage]=useState('')

    const createClass = async (e)=>{
        e.preventDefault()
        try {
          const response = await fetch(`/testing/tutors/createclass`,{
            method:'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({classname, description })
          })
          if(response.ok){
            alert('class created')
            const data = await response.json()
            setClasses((prevClass)=>[...prevClass,...data])
            setCreateModal(false)
          }
        } catch (error) {
          console.log(error);
          alert('error')
        }
      }
  return (
    <div className='createclass'>
        <div className='a'>
        <h3>Create a class</h3>
        
        <form onSubmit={createClass}>
            <div className="classformfield">
            <label htmlFor="name">A name for your Class</label>
            <input type="text"
            required
            value={classname}
            onChange={(e)=>{setClassname(e.target.value)}}
             name="name" 
             id="name" />
            </div>

            <div className="classformfield">
            <label htmlFor="desc">Class description (optional)</label>
            <textarea name="desc" 
            id="desc"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
            </div>
    <div className="createactions">
    <button onClick={()=>setCreateModal(false)} className='cancel'>cancel</button>
    <button className='save' type='submit'>save</button>
    </div>  
        </form>
        </div>
       
    </div>
  )
}

export default CreateClass