'use client'
import React,{useState,useEffect} from 'react'
import '../globals.css'
import './all_posts.css'
import { EditorContent,useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Images from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'


const Posts = () => {
  const [posts,setPosts]=useState([])
 console.log(posts);
 

//function to get all posts
useEffect(()=>{
  const fetchPosts = async()=>{
    try {
      const response = await fetch('https://varsitysteps-server.onrender.com/posts/allposts')
      if(response.ok){
        const data = await response.json()
        setPosts(data)
        
      }
    } catch (error) {
      console.error(error)
    }
  }
  fetchPosts()
},[])


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


const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  // Check if the date is today
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Check if the date is yesterday
  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Format date components
  const day = String(date.getDate()).padStart(2, '0'); 
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (isToday) {
    // If today, return time
    return `Today at ${hours}:${minutes}`;
  } else if (isYesterday) {
    // If yesterday, return "yesterday"
    return 'Yesterday';
  } else {
    // Otherwise, return dd:mm
    return `${day} ${month}`;
  }
};



  return (
    <section className="all-posts">
      <h3>Discover Talented Work By Students</h3>
      <div className="post-filters">

      </div>
        {posts.length > 0 ? <div className='posts-highlights'>
       {posts.map((post,index)=>{
        const {previewText,previewImage} = extractTipTap(post.tiptap_content)
        return <div key={index} className='post-highlight'>
          <Link href={`/posts/post/${post.post_id}-${encodeURIComponent(post.title.replace(/\s+/g, '-'))}`}>
         
          <div className="post-author">
            <div className="author-img">
            {post.profile_image ?<img src={post.profile_image} alt="profile_image" />:
            <FontAwesomeIcon icon={faUser}/>
            }
            </div>
            <div className="author-name-time">
            <p>{post.username}</p>
            <p className='post-time'>{formatDate(post.created_at)}</p>
            </div>
          </div>
          <h3>{post.title}</h3>
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
          <div className="tags">
            {post.tags &&<> {post.tags.map((tag,index)=>{
              return <li key={index}>#{tag}</li>
            })}
            </>}
            
          </div>
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
      <div>
        <p>No posts yet</p>
        </div>}
    </section>
  )
}

export default Posts