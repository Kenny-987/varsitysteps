'use client'
import React,{useState,useEffect,useRef } from 'react'
import './panelcss/images.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faC, faClose, faCloudArrowUp, faTrash,faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const ImageUpload = ({setPanelContent,setPosts,selectedPost}) => {
const [title,setTitle]=useState(selectedPost?.title||'')
const [description,setDescription]=useState(selectedPost?.description||'')
const [images,setImages]=useState(selectedPost?.image_urls||[])
const [newImages,setNewImages] = useState([])
const [imagesToDelete,setImagesToDelete]=useState([])
const fileInputRef = useRef(null);
const [loading,setLoading] = useState(false)
  const [showMessage,setShowMessage]=useState(false)
  const [message,setMessage] =useState("")
  const [cancelOptions,setCancelOptions]=useState(false)
  const [tags, setTags] = useState(selectedPost?.tags || [])
  const [tempTag,setTempTag]=useState('')
  const [showTagList,setShowTagList]=useState(false)

const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); 
    const imagePreviews = files.map((file) => {
      const previewURL = URL.createObjectURL(file); 
      return { file, previewURL };
      
    });
    setNewImages((prevNewImages) => [...prevNewImages, ...imagePreviews]);
    fileInputRef.current.value = null;
  };



  const removeImage = (index, isNewImage) => {
    if (isNewImage) {
      // Remove new image
      URL.revokeObjectURL(newImages[index].previewURL);
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(index, 1);
      setNewImages(updatedNewImages);
      console.log(newImages);
      
    } else {
      setImagesToDelete((prevRemoved) => [...prevRemoved, images[index]]);
      // Remove existing image
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    }
  };


  const uploadPost = async (e)=>{
    setLoading(true)
    if(title.trim()==''){
      setMessage('Write a title for your post')
      setShowMessage(true)
      setLoading(false)
      return
    }
    if(newImages.length === 0 ){
      setMessage(`Can't share emptiness, share something`)
      setShowMessage(true)
      setLoading(false)
      return
    }
    const type ='images'
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type',type);
    
    // Add new images to the form data
    newImages.forEach((image) => {
      formData.append('images', image.file);
    });

  
    if(selectedPost){
      formData.append('post_id',selectedPost.post_id)
        // Add removed images to the form data so the backend can delete them
    imagesToDelete.forEach((imageUrl) => {
      console.log(imageUrl);
      
      formData.append('removedImages', imageUrl); // Send removed images
    })
    images.forEach((imageUrl) => {
      formData.append('existingImages', imageUrl); // Keep these in the post without overriding
    });
      try {
        const response = await fetch(`/api/posts/editpost`,{
          method:'PATCH',
          credentials:'include',
          body:formData
        })
        if(response.ok){
          const data = await response.json()
          setPosts((posts) =>
            posts.map((post) => (post.post_id === data.post_id ? data : post))
          );
          setPanelContent('Posts')
          setLoading(false)
          
        }else{
          console.log('noooo');
          setLoading(false)
          setMessage('Oops, error publishing post')
          setShowMessage(true)
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
          setMessage('Oops, error publishing post')
          setShowMessage(true)
      }
    }else{
      try {
        const response = await fetch('/api/posts/savepost', {
          method: 'POST',
          credentials:'include',
          body: formData, 
        });
        if(response.ok){
          const data = await response.json()
          setPosts((posts)=>[data,...posts])
          setPanelContent("Posts")
        }else{
          setLoading(false)
          setMessage('Oops, error publishing post')
          setShowMessage(true)
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
          setMessage('Oops, error publishing post')
          setShowMessage(true)
      }
    }
    
  }
  const addTags=(tag)=>{
    let updatedTags
    if(tag){
      updatedTags = [...tags,tag]
    }else{
      updatedTags = [...tags,tempTag]
    }
    setTags(updatedTags)
  }
  const removeTag=(index)=>{
    const updatedTags = [...tags]
    updatedTags.splice(index,1)
    setTags(updatedTags)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tempTag.trim() !== "") { 
        addTags();
        setShowTagList(false)
        setTempTag("");
      }
    }
  };

  const tagList = [
    "Art",
    "Film",
    "Animation",
    "Crafts",
    "Education",
    "Health",
    "Technology",
    "Business",
    "Science",
    "Lifestyle",
    "Travel",
    "Food",
    "Environment",
    "Finance",
    "Entertainment",
    "Sports",
    "Fashion",
    "Painting",
    "Sculpture",
    "Photography",
    "Digital Art",
    "DIY Projects",
    "Sewing",
    "Woodworking",
    "Jewelry Making",
    "Study Tips",
    "Learning Resources",
    "Educational Technology",
    "Nutrition",
    "Fitness",
    "Mental Health",
    "Software Development",
    "Gadgets",
    "Cybersecurity",
    "Marketing",
    "Entrepreneurship",
    "E-commerce",
    "Biology",
    "Physics",
    "Environmental Science",
    "Personal Development",
    "Home Decor",
    "Recipes",
    "Food Reviews",
    "Cooking Techniques",
    "Sustainability",
    "Conservation",
    "Climate Change",
    "Investing",
    "Budgeting",
    "Music",
    "Books",
    "Team Sports",
    "Fashion Tips",
    "Sustainable Fashion",
    "Destination Analysis",
    "Sustainable Practices",
    "Event Management",
    "Tourism Marketing",
    "Data Analytics",
    "Cultural Tourism",
    "Travel Writing",
  ];
  
  return (
    <div className='image-upload'>
        {/* <h3 className='images-title'>Showcase your masterpiece</h3> */}
        <FontAwesomeIcon icon={faArrowLeft} onClick={()=>setPanelContent('Posts')}/>
        <div className="image-upload-container">
        
            <div className="caption">
            <input id='caption' 
            type="text" 
            value={title}
            placeholder='Title or Caption'
            onChange={(e)=>{setTitle(e.target.value)}}
            />
            <div className="post-tags">
          <ul className="current-tags">
            {tags.map((tag,index)=>{
              return <li key={index}>#{tag}<FontAwesomeIcon icon={faClose} onClick={()=>{removeTag(index)}}/></li>
            })}
          </ul>
        <input
                    type="text"
                    value={tempTag} 
                    placeholder='Add tags'
                    onChange={(e)=>setTempTag(e.target.value)}
                    onKeyDown={(e)=>{handleKeyDown(e)}}
                    onFocus={()=>setShowTagList(true)}
                    onBlur={() => setTimeout(() => setShowTagList(false), 100)}
                />
                {showTagList && 
                <ul className="tag-list">
                {tagList.map((tag,index)=>{
                  return <li key={index} onClick={()=>{addTags(tag),setShowTagList(false)}}>{tag}</li>
                })}
              </ul>}
                
        </div>
            </div>
            <div className="image-select">
            {images.length > 0 &&
            images.map((image, index) => (
              <div className='preview-image' key={index}>
                <img src={image} alt={`Preview ${index + 1}`} /> {/* Existing image URLs */}
                <button onClick={() => removeImage(index, false)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
             {newImages.length > 0 &&
            newImages.map((image, index) => (
              <div className='preview-image' key={index}>
                <img src={image.previewURL} alt={`Preview ${index + 1}`} /> {/* New image previews */}
                <button onClick={() => removeImage(index, true)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
                {/* div for image previews */}
               <div className="upload-button"> 
                    <input type="file" id="file-upload"
                    ref={fileInputRef}
                     accept="image/*" multiple onChange={handleImageUpload}    required />
                    <div><label htmlFor="file-upload" > 
                    <FontAwesomeIcon icon={faCloudArrowUp}/> Add Image</label>
                    </div>  
                </div>
            </div>
        </div>
        {showMessage && <div className="error-message">
          <p>{message} <FontAwesomeIcon onClick={()=>setShowMessage(false)} icon={faClose}/></p>
        </div>}
        <div className="description">
          <textarea name="" id="" 
          placeholder='Description of your work (optional)'
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          />
        </div>
        <div className="editor-btns">
          {loading ? <div className='btn-loader'></div>:
          <>
          <button onClick={uploadPost}>Save</button>
          <button onClick={()=>setCancelOptions(true)}>Cancel</button>
          </>
          }
          
        </div>
        {cancelOptions && <div className="cancel-modal">
          <div className="cancel-warning">
          <p className='p-cancel'>Cancel editing post?</p>
          <p>Changes you made won't be saved and your post won't be published</p>
          <div className="cancel-editoptions">
            <button onClick={()=>setPanelContent('Posts')}>Cancel</button>
            <button onClick={()=>setCancelOptions(false)}>Keep editing</button>
          </div>
          </div>
        </div> }
    </div>
  )
}

export default ImageUpload