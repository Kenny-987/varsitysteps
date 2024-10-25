'use client'
import React,{useState} from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Node } from '@tiptap/react'
import '../globals.css'
import './panelcss/tiptap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBold,faHeading,faImage,faItalic,faListOl,faListUl,faParagraph,faQuoteLeft,faRedo,faStrikethrough, faUndo,faClose } from '@fortawesome/free-solid-svg-icons'


const MenuBar=({editor,handleImageUpload})=>{
if(!editor){
    return null;
}
return (
    <div className="control-group">
        <div className="button-group">
            <div className="control-btns">
            <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faHeading}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
         <FontAwesomeIcon icon={faBold}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faItalic}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faStrikethrough}/>
        </button>

        

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <FontAwesomeIcon icon={faListUl}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
         <FontAwesomeIcon icon={faListOl}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
         <FontAwesomeIcon icon={faQuoteLeft}/>
        </button>
        <button className='add-image'>
          <input type="file" id="file-upload" accept="image/*"multiple onChange={handleImageUpload}/> 
          <label htmlFor="file-upload" className=""><FontAwesomeIcon icon={faImage}/></label> 
        </button>
            </div>

        <div className="undo-btns">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <FontAwesomeIcon icon={faUndo}/>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <FontAwesomeIcon icon={faRedo}/>
        </button>
        </div>
    
        </div>
    </div>
)
}


const Tiptap = ({setPanelContent,setPosts,selectedPost,setSelectedPost}) => {
  const [title,setTitle]=useState(selectedPost?.title||'')
  const [content,setContent]=useState(selectedPost?.tiptap_content||null)
  const [tags, setTags] = useState(selectedPost?.tags || [])
  const [tempTag,setTempTag]=useState('')
  const [loading,setLoading] = useState(false)
  const [showMessage,setShowMessage]=useState(false)
  const [message,setMessage] =useState("")
  const [cancelOptions,setCancelOptions]=useState(false)
  const [showTagList,setShowTagList]=useState(false)
  const editor = useEditor({
    extensions: [StarterKit,Image],
    content: selectedPost?.tiptap_content||'',
    immediatelyRender:false,
    onUpdate: ({editor})=>{
       setContent(editor.getJSON())
       
    }
  })
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files); 

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Insert the image into the container
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file); // Convert image to base64
    });
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

  //function to save post
  const savePost=async()=>{
    if(title.trim()==''){
      setMessage('Write a title for your post')
      setShowMessage(true)
      return
    }
    if(content == '' || content == null){
      setMessage(`Can't share emptiness, share something`)
      setShowMessage(true)
      return
    }
    setLoading(true)
    if(selectedPost){
      try {
        const response = await fetch(`https://varsitysteps-server.onrender.com/posts/editpost`,{
          method:'PATCH',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title,content,tags,post_id:selectedPost.post_id} )
        })
        if(response.ok){
          console.log('post edited')
          setLoading(false)
          const data = await response.json()
          setPosts((posts) =>
            posts.map((post) => (post.post_id === data.post_id ? data : post))
          );
          setPanelContent("Posts")
        }else{
          setMessage('Ooops... something wrong happened')
          setShowMessage(true)
          setLoading(false)
        }
      } catch (error) {
        setMessage('Ooops... something wrong happened')
        setShowMessage(true)
        console.error(error)
        setLoading(false)
      }
    } else{
      try {
        const type ='text'
        const response = await fetch(`https://varsitysteps-server.onrender.com/posts/savepost`,{
          method:'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title,tags,content,type} )
        })
        if(response.ok){
          const data = await response.json()
          setPosts((posts)=>[data,...posts])
          setPanelContent("Posts")
          setLoading(false)
        }else{
          setMessage('Ooops... something wrong happened')
          setShowMessage(true)
          setLoading(false)
        }
      } catch (error) {
        setMessage('Ooops... something wrong happened')
        setShowMessage(true)
        console.log(error);
        setLoading(false)
      }
    }
  
  }
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
  
  // const addToTags = (tag)=>{
  //   if(tag){
  //     setTags((prevtags)=>[...prevtags,tag])
  //   }
  // }
  // console.log(tags);
  
  return(
    <div className='text-editor'>
      <FontAwesomeIcon icon={faArrowLeft} onClick={()=>setCancelOptions(true)}/>
        <MenuBar editor={editor} handleImageUpload={handleImageUpload} />
        {showMessage && <div className="error-message">
          <p>{message} <FontAwesomeIcon onClick={()=>setShowMessage(false)} icon={faClose}/></p>
        </div>}
        <div className="caption">
        <input id='caption' 
            type="text" 
            value={title}
            placeholder='Title'
            onChange={(e)=>{setTitle(e.target.value)}}
            />
        </div>
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
        <EditorContent editor={editor} />   
        <div className="imagegrid">

        </div>
           <div className="editor-btns">
            {loading  ? <div className='btn-loader'></div> : <>
              <button onClick={savePost}>Save</button>
              <button onClick={()=>setCancelOptions(true)}>Cancel</button>
            </>}
         
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

export default Tiptap
