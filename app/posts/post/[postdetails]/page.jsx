'use client'
import React, {useEffect,useState}from 'react'
import { useParams } from 'next/navigation'
import '../../../globals.css'
import '../../all_posts.css'
import { EditorContent,useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCaretLeft, faCaretRight, faClose, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Images from 'next/image'

const Post = () => {
    const {postdetails} = useParams()
    const [post_id] = postdetails.split('-');
    const [post,setPost] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const router = useRouter()

    useEffect(()=>{
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://varsitysteps-server.onrender.com/posts/postdetails/${post_id}`)
                if(response.ok){
                    const data = await response.json()
                    setPost(data)
                    console.log(data);
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchPost()
    },[post_id])

    const editor = useEditor({
        extensions: [StarterKit,Image.configure({
          inline: false, 
        })],
        content: '',  
        editable: false,
        immediatelyRender:false   
      });
      
      useEffect(() => {
        if (editor && post) {
          editor.commands.setContent(post.tiptap_content || '')
        }
      }, [editor, post])


      const openModal = (images, index) => {
        setCurrentImages(images);
        setCurrentIndex(index);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
      };
    
      const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + currentImages.length) % currentImages.length);
      };
      
      // Touch event handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      nextImage(); // Swipe left, show next image
    }
    if (touchStartX - touchEndX < -50) {
      prevImage(); // Swipe right, show previous image
    }
  };


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
    <section className="post-details">
      <div className="back">
        <FontAwesomeIcon  icon={faArrowLeft} onClick={()=>router.back()}/>
      </div>
        {post && 
        <div className="post-info">
            <div className="post-author">
            <div className="author-img">
            { post.profile_image ?<Images src={post.profile_image} alt="profile_image" />:
            <FontAwesomeIcon icon={faUser}/>
            }
            </div>
            <div className="author-name-time">
            <p>{post.username}</p>
            <p className='post-time'>{formatDate(post.created_at)}</p>
            </div>
          </div>
          <h3 className='post-title'>{post && post.title}</h3>
          {post.type === 'text'?<EditorContent key={post.tiptap_content} editor={editor} className='editor' /> :
          <div className="images-post">
            <p>{post.description}</p>
            <div className="images-grid">
              {post.image_urls.map((img,index)=>{
                return <div key={index} className="grid-item">
                <Images src={img} alt="" onClick={() => openModal(post.image_urls, index)} />
              </div>
              })}
            </div>
          </div> }
        </div>
        }
      
      
        {/* Modal for Image Slider */}
        {isModalOpen && (
        <div 
          className="modal"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="modal-overlay" onClick={closeModal}></div> {/* Background close */}
          <div className="modal-content">
            <button className="prev" onClick={prevImage}>&#10094;</button>
            <Images src={currentImages[currentIndex]} alt={`Image ${currentIndex + 1}`} />
            <button className="next" onClick={nextImage}>&#10095;</button>
          </div>
          <button className="close" onClick={closeModal}>&times;</button> {/* Close button outside modal content */}
        </div>
      )}
    </section>
  )
}

export default Post