'use client'
import React,{useState,useEffect} from 'react'
import './myarena.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { useContextUser } from '../hooks/Context'
import Achievement from './Achievement'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const MyArena = () => {
  const [gameData,setGameData]=useState({})
  const {userData,setGlobalAchievement,setShowAchPopup,isAuthenticated}=useContextUser()
  const [achievements,setAchievements] = useState([])
  const [showAll,setShowAll]=useState(6)
  const [tierProgress,setTierProgress]=useState([])
  const [quizProgress,setQuizProgress]= useState([])
  const [showDetails,setShowDetails]= useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const router = useRouter()


  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated]);

  //function to fetch data
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response = await fetch(`https://varsitysteps-server.onrender.com/gamedata/data`,{
          method:'GET',
          credentials:'include'
        })
        if(response.ok){
          const data = await response.json()
          setGameData(data)
          if(data.unlockedAchievements.length>0){
            setGlobalAchievement(data.unlockedAchievements)
            setShowAchPopup(true)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  },[isAuthenticated])

//fetch challenges
useEffect(()=>{
  const fetchAchievements=async()=>{
    try {
      const response = await fetch(`https://varsitysteps-server.onrender.com/gamedata/challenges`,{
        method:'GET',
        credentials:'include'
      })
      if(response.ok){
        const data = await response.json()
        setAchievements(data.achievements)
        setTierProgress(data.tierProgress)
        setQuizProgress(data.quizProgress)
        
      }
    } catch (error) {
      console.error(error)
    }
  }
  fetchAchievements()
},[isAuthenticated])

if (!isAuthenticated) {
  return null; 
}
////prop data
const setProps = (achievement) => {
  if (achievement.type === 'tier' && tierProgress.length > 0) {
    const progressData = tierProgress.find(prog => prog.id === achievement.id);
    setSelectedAchievement({...achievement,progressData}); 
  }else if(achievement.type === 'quiz' && quizProgress.length > 0){ 
    const progressData = quizProgress.find(quiz => quiz.id === achievement.id);
    setSelectedAchievement({...achievement,progressData}); 
  }else{
    setSelectedAchievement(achievement); 
  }
  setShowDetails(true);
};

  return (
    <section className='arena-dashboard'>
    <h3>My Arena</h3>
    {/* arena stats to show user stats */}
    <div className="arena-stats">
      <div className="stat">
        <h4>{userData.username}</h4>
        <p className='tier'>{gameData.tier?gameData.tier:'Newcomer'}</p>
      </div>
      
      <div className="stat points">
        <h4>{gameData.points}</h4>
        <p>Total points</p>
      </div>
      </div>

      <div className="arena-stats grid">
      <div className="stat">
        <h4>#{gameData.position?gameData.position:'Unranked'}</h4>
        <p>Leaderboard Position</p>
      </div>
      <div className="stat points">
        <h4>{gameData.completed_quizzes}</h4>
        <p>Quizzes Completed</p>
      </div>
      <div className="stat">
        <h4>{gameData.achievements}</h4>
        <p>Achivements Unlocked</p>
      </div>
      </div>  
  
    {/* tier progress */}
    <div className="tier-progress">
      <h4>Tier Progress</h4>
            <p>{gameData.points_left}</p>
            <div className="tier-progress-bar" >
              <div className="tierprogress" style={{width:`${parseInt(gameData.tier_progress)}%`}}></div>
            </div>
          </div>
    <p className='arena-link'><Link href='/thearena'>Earn more points in the Arena <FontAwesomeIcon icon={faGamepad}/></Link> </p>
      {/* arena challenges*/}
      <div className="arena-achievements">
        <h4>Achievements</h4>
        {achievements.length>0 &&
        <div className='arena-achievements-container' >
          {achievements.slice(0,showAll).map((achievement,index)=>{
            return<div className="achievement" key={index} onClick={()=>setProps(achievement)}>
            <div className="achievement-badge">
              {achievement.unlocked ?<Image src={achievement.badges?achievement.badges[1]:''} alt='badge' width={100} height={100}/>:<Image src={achievement.badges?achievement.badges[0]:''} alt='badge' width={100} height={100}/>}
            </div>
            <p>{achievement.title}</p>
            {achievement.unlocked ? (
  <p>{achievement.unlocked_at.split(' ')[0]}</p>
) : 
// tier progress  here
achievement.type === 'tier' && tierProgress.length > 0 ? (
  (() => {
    const progressData = tierProgress.find(prog => prog.id === achievement.id);
    const progress = progressData?.progress || 0;
    const goal = achievement.goal || 1; // Avoid division by zero
    const percentage = Math.min((progress / goal) * 100, 100).toFixed(0); // Ensuring max 100%
    return (
      <div className='progress-stats'>
        <p>{progress} / {goal} points</p>
        <div className='achievement_progress'>
          <div className="bar" style={{width:`${percentage}%`}}></div>
        </div>
      </div>
    );
  })()
) : 
// quiz progress  here
achievement.type === 'quiz' && quizProgress.length > 0 ? (
  (() => {
    const progressData = quizProgress.find(quiz => quiz.id === achievement.id);
    const progress = progressData?.progress || 0;
    const goal = achievement.goal || 1; // Avoid division by zero
    const percentage = Math.min((progress / goal) * 100, 100).toFixed(0); // Ensuring max 100%
    return (
      <div className='progress-stats'>
        <p>{progress} / {goal} quizzes</p>
        <div className='achievement_progress'>
          <div className="bar" style={{width:`${percentage}%`}}></div>
        </div>
      </div>
    );
  })()
) : ''
}  

</div> 
          })}
          </div> }
        {showAll <= 6?  <button className='showall' onClick={()=>setShowAll(achievements.length)}>show all achievements <FontAwesomeIcon icon={faCaretDown}/></button>:
          <button className='showall' onClick={()=>setShowAll(6)}>show less <FontAwesomeIcon icon={faCaretUp}/></button>}

    {/* achivement details go here */}
    {showDetails && selectedAchievement && <Achievement data={selectedAchievement} setShowDetails={setShowDetails} />}

     
      </div>
      
    </section>
  )
}

export default MyArena