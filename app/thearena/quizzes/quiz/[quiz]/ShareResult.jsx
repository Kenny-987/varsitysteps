import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'


const ShareResult = ({title,points}) => {
    const [showFallback,setShowFallback]=useState(false)

         const handleShare = () => {
        const shareText = `I just scored ${points} points in the ${title} quiz on VarsitySteps! 🏆 Try to beat my score!`;
        const shareUrl = `/thearena/randomquizzes/quiz/${title}`; 
      
        if (navigator.share) {
          navigator.share({
            title: 'VarsitySteps Quiz Results',
            text: shareText,
            url: shareUrl,
          }).catch(err => console.log('Error sharing:', err));
        } else {
          setShowFallback(true); 
        }
      };
      
      const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.varsitysteps.co.zw/thearena/quizzes`)}&quote=${encodeURIComponent(`I just scored ${points} points on VarsitySteps! Can you beat my score? 🏆 Check it out: Check it out: https://www.varsitysteps.co.zw/thearena/quizzes`)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just scored ${points} points in the ${title} quiz on VarsitySteps! Can you beat my score? 🏆 Try to beat me! Check it out: Check it out: https://www.varsitysteps.co.zw/thearena/quizzes`)}`,
        
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`I just scored ${points} points in the ${title} quiz on VarsitySteps! Can you beat my score? 🏆 Check it out: https://www.varsitysteps.co.zw/thearena/quizzes`)}`
      };
  return (
    <div>
  <button className='share-btn' onClick={handleShare}>
    Share Results <FontAwesomeIcon icon={faShareAlt} />
  </button>
    {showFallback && (
        <div className='fallback-share'>
          <p>Share your results:</p>
          <a href={shareLinks.facebook} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faFacebook}/> Facebook</a>
          <a href={shareLinks.twitter} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faXTwitter} color='black'/> (Twitter)</a>
          <a href={shareLinks.whatsapp} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faWhatsapp} color='#25D366'/> WhatsApp</a>
          <button onClick={() => setShowFallback(false)}>Close</button>
        </div>
      )}

    </div>
  
  )
}

export default ShareResult