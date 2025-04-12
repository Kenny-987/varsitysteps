'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useSocket } from '../../hooks/SocketContext'
import { useContextUser } from '../../hooks/Context'
import './live.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faPauseCircle, faPhone, faPhoneSlash, 
         faPlayCircle, faRecordVinyl, faSignOut, faStopCircle, faVideo, 
         faVideoSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
 
const GroupLiveLesson = ({ roomId, setContent, callerDetails, ringingRef,classDetails}) => {
  const socket = useSocket()
  const { userData, setShowVideoCall } = useContextUser()
  const userId = userData.id
  const [callStatus, setCallStatus] = useState(callerDetails ? "Incoming call..." : '')
  const dialingRef = useRef(new Audio('/dialing.mp3'))
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [recording, setRecording] = useState(false)
  const [videoURL, setVideoURL] = useState(null)
  const [paused, setPaused] = useState(false)
  const [participants, setParticipants] = useState([])
  const [recordingTime, setRecordingTime] = useState(0)
  const [isCallInitiator, setIsCallInitiator] = useState(false)
  
  // References
  const localVideoRef = useRef(null)
  const remoteVideoRefs = useRef({})
  const peerConnections = useRef({})
  const mediaRecorderRef = useRef(null)
  const recordedChunksRef = useRef([])
  const streamRef = useRef(null)
  const callTimeoutRef = useRef(null)
  const timerRef = useRef(null)
  
  const role = localStorage.getItem('role')

  // WebRTC configuration
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { 
        urls: 'turn:13.49.18.137:3478',  
        username: 'videocaller',             
        credential: 'connectme4321'
      }
    ]
  }

  const setUpWebRtc = async()=>{
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      peerRef.current =  new RTCPeerConnection(configuration)

      stream.getTracks().forEach(track => 
        peerRef.current.addTrack(track, stream)
      );

      peerRef.current.ontrack = event => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      peerRef.current.onicecandidate = event => {
        if (event.candidate) {
          const recipientUserId = callerDetails ? callerDetails.callerUserId : targetUserId;
          console.log('this is recipient id ',recipientUserId);
          
          if (recipientUserId) {
            socket.emit('ice-candidate', {
              candidate: event.candidate,
              fromUserId: userId,
              toUserId: recipientUserId,
            });
          }
        }
      };
  

    } catch (error) {
      console.error('Error accessing camera & mic:', error);
      if (error.name === 'NotAllowedError') {
        alert('Please allow camera and microphone access.');
    } else if (error.name === 'NotFoundError') {
        alert('No webcam found.');
    }
    }
  }

  useEffect(()=>{
    setUpWebRtc()
  })
  return (
    <div className='video-call-container'>
     <h4>{classDetails.name}</h4>

     <div  className={`localvideo tutor-cam`}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
        ></video> 
        </div>
    </div>
  )
}

export default GroupLiveLesson