'use state'
import Image from 'next/image'
import React, {useState,useEffect} from 'react'
import './leaderboard.css' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { useContextUser } from '../hooks/Context'

const LeaderBoard = () => {
  const [leaderboard,setLeaderBoard] = useState([])
  const[loading,setLoading]=useState(false)
  const {isAuthenticated,userData}=useContextUser()
  const [userPosition,seUserPosition]=useState(null)
//fetch leaderboard
useEffect(()=>{
  const getLeaderboard = async()=>{
    setLoading(true)
    try {
      const response = await fetch(`https://varsitysteps-server.onrender.com/gamedata/leaderboard`)
      if(response.ok){
        const data = await response.json()
        console.log(data);
        setLeaderBoard(data)
        setLoading(false)
      }else{
        console.log('could not get leaderboard');
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  getLeaderboard()
},[])


//fetch user position
useEffect(()=>{
  if(isAuthenticated){
    const getPosition = async ()=>{
      try {
       const response = await fetch(`https://varsitysteps-server.onrender.com/gamedata/position`,{
        credentials:'include'
       })
       if(response.ok){
        const data = await response.json()
        seUserPosition(data)
        console.log(data);
        
       }else{
        console.log('cannot get position');
        
       }
      } catch (error) {
        console.log(error)
      }
    }
   getPosition()
  }
},[])

if(loading){
  return <div>...loading</div>
}

  return (
    <section className='leaderboard'>
      <h3>Leardboard <FontAwesomeIcon/></h3>
      {/* filters, weekly, monthly and all time */}
      {/* top three */}
      <div className="top-three">

      <div className="top-card">
        <p className='position'>#2
        <span>
        {leaderboard.length>1&&userData.id == leaderboard[1].id && leaderboard?'(You)':''}
        </span>
        </p>
        <div className="top_image">
          {leaderboard.length>1 && leaderboard[1].profile_image?<Image src={leaderboard[1].profile_image}alt='image' width={70} height={70}/>:<div className='placeholder-image'>
            {leaderboard.length>1 &&leaderboard[1].username.slice(0,1)}</div>}
        
        </div>
        <p className='name'>{leaderboard.length>1 &&leaderboard[1].username.substring(0,15)}</p>
        <p><span>{leaderboard.length>1 &&leaderboard[1].points} points</span></p>
      </div>

      <div className="top-card first">
        <p className='position'>#1<span>
        {leaderboard.length>0&&userData.id == leaderboard[0].id?'(You)':''}
        </span>
        </p>
        <div className="top_image">
        {leaderboard.length>0 &&leaderboard[0].profile_image?<Image src={leaderboard[0].profile_image} alt='image' width={70} height={70}/>:<div className='placeholder-image'>
            {leaderboard.length>0 &&leaderboard[0].username.slice(0,1)}</div>}
        </div>
        <p className='name'>{leaderboard.length>0 &&leaderboard[0].username}</p>
        <p><span>{leaderboard.length>0 &&leaderboard[0].points} points</span></p>

      </div><div className="top-card">
        <p className='position'>#3
        <span>
        {leaderboard.length>2&&userData.id == leaderboard[2].id?'(You)':''}</span></p>
        <div className="top_image">
      {leaderboard.length>2 &&leaderboard[2].profile_image?<Image src={leaderboard[2].profile_image} alt='image' width={70} height={70}/>:<div className='placeholder-image'>
            {leaderboard.length>2 &&leaderboard[2].username.slice(0,1)}</div>}
        </div>
        <p className='name'>{leaderboard.length>2 &&leaderboard[2].username}</p>
        <p><span>{leaderboard.length>2 &&leaderboard[2].points} points</span></p>
      </div>
      </div>

      <div className="leaderboard-list">
        {leaderboard.length>0 &&leaderboard.slice(3,20).map((board,index)=>{
          return <div className={board.id==userData.id? 'leaderboard-list-item highlight': 'leaderboard-list-item'} key={index}>
            
          <div className="position-name">
          <p className="position">{board.position<10?`${'0'}${board.position}`:board.position}</p>
          <div className="name-image">
          {board.profile_image?<Image src={board.profile_image}alt='image' width={70} height={70}/>:<div className='placeholder-image'>
          {board.username.slice(0,1)}</div>}
          <p className='name'>{board.username} {board.id==userData.id?'(You)':''}</p>
          </div>
          </div>
          <p className='points'>{board.points} points</p>
        </div>
        })}
        {userPosition && userPosition.position>20 &&
        <div className="leaderboard-list-item highlight">
          <div className="position-name">
          <p className="position">{userPosition.position<10?`${'0'}${userPosition.position}`:userPosition.position}</p>
          <div className="name-image">
          {userPosition.profile_image?<Image src={userPosition.profile_image} alt='image' width={70} height={70}/>:<div className='placeholder-image'>
          {userPosition.username.slice(0,1)}</div>}
          <p className='name'>{userPosition.username} (You)</p>
          </div>
          </div>
          <p className='points'>{userPosition.points} points</p>
        </div>
        }
      
      </div>
    </section>
  )
}

export default LeaderBoard