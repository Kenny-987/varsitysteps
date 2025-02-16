'use client'
import React,{useState,useEffect} from 'react'
import './announcement.css'
import Link from 'next/link';

const Announcements = () => {
    const currentAnnouncementVersion = "v1"; 
  const ANNOUNCEMENT_KEY = "announcementVersion";
  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedVersion = localStorage.getItem(ANNOUNCEMENT_KEY);
    // If there's no stored version or it doesn't match the current version, show the announcement.
    if (storedVersion !== currentAnnouncementVersion) {
      setVisible(true);
    }
  }, [currentAnnouncementVersion]);

  const handleDismiss = () => {
    localStorage.setItem(ANNOUNCEMENT_KEY, currentAnnouncementVersion);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="announcements">
        <h3>Announcements</h3>
        <div className="announcement">
        <p>🎉 Introducing the Arena, where you can play quizzes and other games which we will be adding periodically. Climb up the leaderboard and compete with other players.</p>
        <button><Link href='/thearena'>Click here to start playing</Link></button>
        </div>
        <div className="announcement">
            <h4>Policy Update</h4>
        <p>We have updated our policy and terms of usage as well as introduced premium tiers for tutors to help promote their profile and stand out. Read our updated policy <span><Link href='/terms-and-conditions'>here</Link></span></p>
        </div>
      <button onClick={handleDismiss}>Dismiss</button>
    </div>
  );
};


export default Announcements