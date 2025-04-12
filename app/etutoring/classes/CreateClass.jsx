'use client'
import React,{useEffect,useState} from 'react'

const CreateClass = ({setCreateModal,setClasses}) => {
const [classname,setClassname]=useState('')
const [description,setDescription]=useState('')
const [loading,setLoading]=useState(false)
const [message,setMessage]=useState('')

    const createClass = async (e)=>{
      setLoading(true)
        e.preventDefault()
        try {
          const response =  await fetch(`http://localhost:3000/tutors/createclass`,{
            method:'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({classname, description })
          })
          if(response.ok){
            const data =  await response.json()
            setClasses((prevClass)=>[...prevClass,...data])
            setCreateModal(false)
          }
        } catch (error) {
          console.log(error);
          setMessage('Error creating the class: ${classname}')
        }finally{
          setLoading(false)
        }
      }

      
  return (
    <div className='overlay'>
        <div className='createclass'>
        <h3>Create a class</h3>
        {message && <p className='success-message' style={{background:'red'}}>{message}</p>}
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
            {loading ? <div className='btn-loader'></div>:
            <div className="createactions">
            <button onClick={()=>setCreateModal(false)} className='cancel'>cancel</button>
            <button className='save' type='submit'>save</button>
            </div> 
            }
     
        </form>
        </div>
       
    </div>
  )
}

export default CreateClass