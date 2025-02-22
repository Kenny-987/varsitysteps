import { faClose, faFireFlameCurved, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

const Achievement = ({data,setShowDetails}) => {
 
  return (
    <div className='achievement-details-container'>
<div className="achievement-details">
  <div className="close-details"><FontAwesomeIcon icon={faClose} onClick={()=>setShowDetails(false)} size='2x' color='red'/></div>
<h3 className="title">{data.title}</h3>
      <p className='description'>{data.description}{data.unlocked?'':` (reward +${data.reward} points)`}</p>
      <div className="badge">
        {data.unlocked ? <Image src={data.badges?data.badges[1]:''} width={200} height={200}/>: <Image src={data.badges?data.badges[0]:''} width={200} height={200}/>}
      </div>
      <div className="progress">
        {data.unlocked?<p className='date_unlocked'>Unlocked: {data.unlocked_at.split(' ')[0]}</p>:
        (()=>{
  
          const progress = data.progressData?.progress || 0;
          const goal = data.goal || 1; // Avoid division by zero
          const percentage = Math.min((progress / goal) * 100, 100).toFixed(0); // Ensuring max 100%
          return (
            <div className='progress-stats'>
              <p>{progress} / {goal} {data.type == 'tier' ? 'points':data.type == 'quiz'?'quizzes':''}</p>
              <div className='achievement_progress'>
                <div className="bar" style={{width:`${percentage}%`}}></div>
              </div>
            </div>
          );
        })()
        }
      </div>


      <div className="difficulty">
        <p>Difficulty: {data.difficulty}</p>
        {data.difficulty == 'Easy' && <FontAwesomeIcon icon={faFireFlameCurved} color='green'/>}
        {data.difficulty == 'Medium' && <FontAwesomeIcon icon={faFireFlameCurved} color='orange' size='2x'/>}
        {data.difficulty == 'Hard' && <FontAwesomeIcon icon={faFireFlameCurved} color='red' size='3x'/>}
        {data.difficulty == 'Very Hard' && <FontAwesomeIcon icon={faFireFlameCurved} color='darkred' size='4x'/>}
        {data.difficulty == 'Extreme' && <FontAwesomeIcon icon={faFireFlameCurved} color='purple' size='4x'/>}
        </div>
</div> 
    </div>
  )
}

export default Achievement