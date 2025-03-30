'use client'
import React,{useEffect,useState,useRef,useCallback} from 'react'
import { useSocket } from '../../hooks/SocketContext'
import { useContextUser } from '../../hooks/Context'
import './live.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faPhone, faPhoneSlash, faRecordVinyl, faSignOut, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'

const LiveLesson = ({receiver,setContent,user,callerDetails,ringingRef}) => {
  const socket = useSocket()
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const {userData,setShowVideoCall} = useContextUser()
  const targetUserId = receiver||callerDetails.callerUserId
  const userId = userData.id
  const [callStatus,setCallStatus]=useState(callerDetails?"Incoming call...":'')
  const dialingRef = useRef(new Audio('/dialing.mp3'));
  const [isCallInitiator, setIsCallInitiator] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);


  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { 
        urls: 'turn:13.49.18.137:3478',  
        username: 'videocaller',             
        credential: 'connectme4321'
      }
    ]
  };
  
  const cleanWebRtc = async()=>{
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
    stream.getTracks().forEach((track) => {
        track.stop();
        console.log('Stopping track:', track.kind);
      });
    }
    if(ringingRef) ringingRef.current.pause()
    if(dialingRef)dialingRef.current.pause(); 
    setContent?setContent('dashboard'):setShowVideoCall(false)
  }

  const setUpWebRtc = async()=>{
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
    const handleCallCancelled =async(data)=>{
      alert(data.message)
      cleanWebRtc()
    }

    const handleCallAnswered = async (data)=>{
      console.log(data);
      console.log(peerRef.current);
      
       if (peerRef.current && data.answer) {
        setCallStatus('Connected');
        console.log('call answered');
        
        try {
          console.log('Setting remote description from answer');
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
          console.log('Call answered, remote description set');
          setCallStatus('Connected');
        } catch (error) {
          console.error('Error setting remote description:', error);
        }
      }
      if(ringingRef) ringingRef.current.pause()
      if(dialingRef)dialingRef.current.pause(); 
    }
    
    const handleIceCandidates = async(data)=>{
      console.log('ice data ',data);
      try {
        if (peerRef.current && data.candidate) {
          if (peerRef.current.remoteDescription) {
            setTimeout(async () => {
              await peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
              console.log('Added ICE candidate after delay');
            }, 1000);
          } else {
            console.warn('Received ICE candidate but remote description not set yet');
          }
        }
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }

    socket.on('ice-candidate',handleIceCandidates)
    socket.on('call-cancelled', handleCallCancelled);
    socket.on('call-rejected',handleCallCancelled);
    socket.on('call-answered',handleCallAnswered)
    
    return () => {
      socket.off('call-cancelled')
      socket.off('call-rejected')
      socket.off('call-answered')
      socket.off('ice-candidate')
    };
  },[])


  const callUser=async()=>{
    if(!peerRef.current) return
    setIsCallInitiator(true);
    const offer =  await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);

    setCallStatus('Ringing...')
    dialingRef.current.play(); 

    socket.emit('call-user', {
      offer, 
      fromUserId:userId,
      toUserId: targetUserId,
      callerName:userData.username
    });
    console.log('calling');
  }

  const answerCall=async()=>{
    if (!callerDetails || !callerDetails.offer) {
      console.error('No incoming call or offer available');
      return;
    }
    
    try {
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(callerDetails.offer))
      const answer =  await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      socket.emit('answer-call',{
        answer,
    fromUserId: userId,
    toUserId: targetUserId,
      })
      ringingRef.current.pause()
      setCallStatus('Connected')
    } catch (error) {
      console.error("Error handling incoming call:", error);
    }
  }

  const exit = async()=>{
    cleanWebRtc()
  }

  const cancelCall = async()=>{
    socket.emit('cancel-call', {
      fromUserId: userId,
      toUserId: targetUserId,
    });
    cleanWebRtc()
  }

  const rejectCall = async()=>{
    socket.emit('reject-call', {
      fromUserId: userId,
      toUserId: targetUserId,
    });
    cleanWebRtc()
  }
 

  const toggleMicrophone = () => {
    const stream = localVideoRef.current?.srcObject;
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const toggleCamera = () => {
    const stream = localVideoRef.current?.srcObject;
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };


  return (
    <div className='video-call-container'>
      <div  className={`localvideo ${callStatus === "Connected" ? "small-preview" : ""}`}>
        <video
          ref={localVideoRef}
          autoPlay
          muted 
        ></video> 
        </div>

    {callStatus=='Incoming call...'&&
      <div className='callstatus'>
        <div className="call-loader"></div> 
        <p>{callStatus}</p>
      </div>
      }

    {callStatus != 'Connected' && callStatus=='Ringing...' ?
    <div className='callstatus'>
      <div className="call-loader"></div> 
      <p>{callStatus}</p>
      </div>:
      <div className="remotevideo">
      <video 
          ref={ remoteVideoRef}
          muted={callStatus == '' ? true:false}
          autoPlay
        ></video>
      </div> 
    }

      <div className="call-controls">

      {callStatus == 'Ringing...' && 
      <button className='cancelcall-btn control-btn' onClick={()=>{cancelCall()}}>
          <FontAwesomeIcon icon={faPhoneSlash}/>Cancel Call
        </button> }


{/* if no calling is taking show these buttons */}
    {callStatus== '' && 
    <>
    <button className='call-btn control-btn' onClick={()=>{callUser()}}>
      <FontAwesomeIcon icon={faPhone}/>Call
    </button>

    <button className='endcall-btn control-btn' onClick={()=>{exit()}}>
        <FontAwesomeIcon icon={faSignOut}/> 
      Exit
    </button>
    </>}


{/* when call incoming, user sees option to answer or reject */}
    {callStatus == 'Incoming call...' &&
    <>
      <button className='call-btn control-btn' onClick={()=>{answerCall()}}>
        <FontAwesomeIcon icon={faPhone}/>Accept
      </button>

      <button className='endcall-btn control-btn' onClick={()=>{rejectCall()}}>
        <FontAwesomeIcon icon={faSignOut}/>Reject
        </button>
    </>}
    
 {/* when bothe user are connected they see these buttons */}
    {callStatus=='Connected' && 
      <>
      <button className='mic-btn control-btn' onClick={toggleMicrophone}>
        <FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />
      </button>

      <button className='camera-btn control-btn' onClick={toggleCamera}>
        <FontAwesomeIcon icon={isCameraOn ? faVideo : faVideoSlash} />
      </button>

      <button className='record-btn control-btn'>
        <FontAwesomeIcon icon={faRecordVinyl}/> 
      </button>

      <button className='endcall-btn control-btn' onClick={()=>cancelCall()}>
        <FontAwesomeIcon icon={faPhoneSlash}/> 
      </button>
      </>
      }

        </div>
        
    </div>
  )
}

export default LiveLesson