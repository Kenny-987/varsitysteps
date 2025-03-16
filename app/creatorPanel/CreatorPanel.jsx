'use client'
import React,{useState,useEffect} from 'react'
import Tiptap from './TipTap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose,faAdd } from '@fortawesome/free-solid-svg-icons'
import ImageUpload from './ImageUpload'
import Image from 'next/image'
import Posts from './Posts'
import './panelcss/panels.css'

const CreatorPanel = () => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [panelContent,setPanelContent] = useState('Posts')
  const [posts,setPosts]=useState([])
  const [fetching,setfetching] =useState(false)
  
  useEffect(()=>{
    setfetching(true)
    const fetchPosts = async ()=>{
  try {
    const response =  await fetch(`http:localhost:3000/posts/post`,{
      credentials:'include'
    })
    if(response.ok){
      const data =  await response.json()
      // const f = data[0].tiptap_content
      console.log(data);
      setPosts(data)
      setfetching(false)
    }
    
  } catch (error) {
    console.error(error)
    setfetching(false)
  }
    }
  
  fetchPosts()
  },[])


  return (
    <section className='editor-page'>
      <div className="header">
      <h3>Creator Panel</h3>
      <p>Unleash Your Creativity. Share Your Passion. Connect with the Nation.</p>
      </div>
      <div className="panel-content">
      <div className="tabs-nav">
        <p>Work</p>
        {/* <p>Metrics</p> */}
      </div>
      <button className='add-post' onClick={()=>setPanelContent('Options')}><FontAwesomeIcon icon={faAdd}/> Create a new post</button>
            {/* modal to show post options */}
  
      {fetching && 
       <div className='btn-loader'></div> 
      }
      {!fetching &&
      <div className="panel-content">
      {panelContent === 'Posts' && <Posts posts={posts} setPosts={setPosts} setPanelContent={setPanelContent} setSelectedPost={setSelectedPost} /> }
      {panelContent === 'Images'&& <ImageUpload setPanelContent={setPanelContent} setPosts={setPosts} selectedPost={selectedPost}/>} 
      {panelContent === 'Writing'&& <Tiptap setPanelContent={setPanelContent} setPosts={setPosts} selectedPost={selectedPost} setSelectedPost={setSelectedPost}/>}
      {panelContent === 'Options' && 
      // modal to show options
      <div className="content-type-options">
      <div className="content-options">
        <FontAwesomeIcon className='close-options' icon={faClose} onClick={()=>setPanelContent('Posts')}/>
      <p>What would you like to share today?</p>
      <div className='content-option'>
        <div className="option-select">
        <h3>Writing</h3>
        <p>Share your thoughts, stories, or articles.</p>
        <button onClick={()=>{setPanelContent('Writing');setSelectedPost(null)}}>Start</button>
        </div>
        <div className="option-select">
        <h3>Images</h3>
        <p>Upload your visual creations and showcase your art</p>
        <button onClick={()=>{setPanelContent('Images');setSelectedPost(null)}}>Start</button>
        </div>
      </div>
      </div>
    </div> }
    
    </div> }
      
      </div>
      
   
     
    
    </section>
  )
}

export default CreatorPanel