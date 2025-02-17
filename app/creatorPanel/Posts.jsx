'use client'
import React,{useState,useEffect} from 'react'
import { EditorContent,useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import ImageUpload from './ImageUpload'
import Tiptap from './TipTap'
import Images from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faClose, faEdit, faEllipsis, faEye, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import './panelcss/posts.css'
import '../globals.css'
import Link from 'next/link'

const Posts = ({posts,setPosts,setPanelContent,setSelectedPost}) => {
    const [postOptions,setPostOptions] = useState(null)
    const [deleteOptions,setDeleteOptions]=useState(false)
    const [loading,setLoading] = useState(false)
    const [showMessage,setShowMessage]=useState(false)
    const [message,setMessage] =useState("")

  
      const editor = useEditor({
        extensions: [StarterKit,Image.configure({
          inline: false, 
        })],
        content: posts.tiptap_content,  
        editable: false,
        immediatelyRender:false   
      });
      
      if (!editor) {
        return null;  
      }
 

      const extractTipTap = (tiptap)=>{
        let previewText
        let previewImage=[]
        if(tiptap!==null && tiptap.content){
          tiptap.content.forEach((node)=>{

            if (node.type === 'paragraph' && !previewText) {
              const paragraphText = node.content?.map(n => n.text).join(' ') || '';
              previewText = paragraphText.substring(0, 300) + (paragraphText.length > 300 ? '...' : ''); // Truncate to 500 chars if too long
            }
            if (node.type === 'image') {
              previewImage.push(node.attrs.src)
            }
      
          })
        }
        return { previewText, previewImage };
      }


      const handleEdit = (post) => {
        setSelectedPost(post);
        if(post.type==='text'){
          setPanelContent('Writing');
        }else if(post.type==='images'){
          setPanelContent('Images');
        }
      };

      const togglePostOptions = (index) => {
        setPostOptions((prev) => (prev === index ? null : index));
    };


    const deletePost = async (post_id)=>{
      setLoading(true)
      try {
        const response = await fetch(`/api/posts/deletepost/${post_id}`,{
          method:'DELETE',
          credentials:'include'
        })
        if(response.ok){
          console.log('post deleted');
          setLoading(false)
          setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== post_id));
        }else{
          setLoading(false)
          setShowMessage(true)
          setMessage('Error deleting post')
        }
      } catch (error) {
        setLoading(false)
        setShowMessage(true)
        setMessage('Error deleting post')
        console.error(error)
      }
    }

  return (
    <div className='posts'>
      {showMessage && <div className="error-message">
          <p>{message} <FontAwesomeIcon onClick={()=>setShowMessage(false)} icon={faClose}/></p>
        </div>}
      {posts.length > 0 ? <div className='posts-highlights'>
       {posts.map((post,index)=>{
        
        const {previewText,previewImage} = extractTipTap(post.tiptap_content)
        return <div key={index} className='post-highlight'>
          
          {postOptions === index && 
          <div className="post-options">
          <button onClick={()=>handleEdit(post)}><FontAwesomeIcon icon={faEdit}  /> Edit</button>
          <button onClick={()=>setDeleteOptions(true)}><FontAwesomeIcon icon={faTrash}/> Delete</button>
          {deleteOptions && <div className="confirmDelete">
            <p>Delete Post? it cant be undone</p>
            <div className="delete-options">
              {loading ? <div className='btn-loader'></div>:
              <>
              <button onClick={()=>{deletePost(post.post_id,index),setPostOptions(false)}} className='delete'><FontAwesomeIcon icon={faTrash}  /> Delete</button>
              <button onClick={()=>{setDeleteOptions(false)}}>Keep post</button>
              </>}
              
            </div>
          </div> }
          
        </div>
          }
          <FontAwesomeIcon className='options-icon' onClick={()=>togglePostOptions(index)} icon={faEllipsis}/>
          <Link href={`/posts/post/${post.post_id}-${encodeURIComponent(post.title.replace(/\s+/g, '-'))}`}>
          <h3>{post.title} </h3>
          {post.type === 'text'?
          <div className="tiptap-preview">
            <p>{previewText?previewText:''}</p>
            {previewImage.length>0?
            <div className="preview-img">
              <img src={previewImage[0]} alt="preview image" />
            </div>:'' }
            
          </div>:<div className='image-post-preview'>
            <p>{post.description}</p>
            {post.image_urls.length>0?
            <div className="preview-img">
              <img src={post.image_urls[0]} alt="preview image" />
            </div>:'' }
          </div>
          }
          {/* <div className="metrics">
            <div className="metric likes">
              <FontAwesomeIcon icon={faThumbsUp}/>
              <span>300</span>
            </div>
            <div className="metric views">
              <FontAwesomeIcon icon={faEye}/>
              <span>366</span>
            </div>
          </div> */}
          </Link>
        
        </div>
      })}




      </div>:
      <div className='empty-posts'>
      <Images alt='empty-img' src='/images/Empty-amico.svg' width={200} height={200}/>
        <p>No posts yet</p>
        <button onClick={()=>setPanelContent('Options')}> Create a new post</button>
        </div>}
    </div>
  )
}

export default Posts