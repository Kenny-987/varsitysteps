'use client'
import React,{useEffect,useState,useRef,useCallback} from 'react'
import { useSocket } from '../../hooks/SocketContext'
import { useContextUser } from '../../hooks/Context'
import './live.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faPhone, faPhoneSlash, faRecordVinyl, faSignOut, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'

const LiveLesson = ({receiver,setContent,user,callerDetails}) => {
const socket = useSocket()
const localVideoRef = useRef(null);
const remoteVideoRef = useRef(null);
const peerRef = useRef(null);
const [callIncoming, setCallIncoming] = useState(null);
const {userData,setCallerDetails,setShowCalling}=useContextUser()
const userId = userData.id
const targetUserId = receiver
const [callStatus,setCallStatus]=useState(callerDetails?"Incoming call...":'')
const callTimeoutRef = useRef(null)
const dialingRef = useRef(new Audio('/dialing.mp3'));
const ringingRef = useRef(new Audio('/ringtone.mp3'));
const pendingCandidates = useRef([])  
const [isMicOn, setIsMicOn] = useState(true);
const [isCameraOn, setIsCameraOn] = useState(true);

const testFunc = ()=>{
  console.log('calling test func');
  
}


  // WebRTC configuration with STUN and TURN servers
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
  const stopAudio = () => {
    if (ringingRef.current) {
      ringingRef.current.pause();
      ringingRef.current.currentTime = 0;
    }
    if (dialingRef.current) {
      dialingRef.current.pause();
      dialingRef.current.currentTime = 0;
    }
};



const cleanWebRTC = () => {
  console.log('calling clean up function');
  
  if (peerRef.current) {
      peerRef.current.ontrack = null;
      peerRef.current.onicecandidate = null;
      peerRef.current.close(); // Close the connection
      peerRef.current = null;
    }
  
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => {
        track.enabled=false
        track.stop();
        
      })
      localVideoRef.current.srcObject = null;
    }
  
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop()); // Stops incoming media
      remoteVideoRef.current.srcObject = null;
    }
    localVideoRef.current = null;
    remoteVideoRef.current = null;
  };

  useEffect(() => {
    testFunc()
    // Get the user's video/audio stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
          localVideoRef.current.srcObject = stream;
        // Create RTCPeerConnection with TURN/STUN configuration
        peerRef.current = new RTCPeerConnection(configuration);

        // Add local tracks to the peer connection
        stream.getTracks().forEach(track => 
          peerRef.current.addTrack(track, stream)
        );

        // When remote stream arrives, display it
        peerRef.current.ontrack = event => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        // When ICE candidates are generated, send them to the remote peer
        peerRef.current.onicecandidate = event => {
          
          if (event.candidate) {
            const recipientUserId = callIncoming ? callIncoming.callerUserId : targetUserId;
            if(recipientUserId){
              socket.emit('ice-candidate', {
                candidate: event.candidate,
                fromUserId: userId,
                toUserId: recipientUserId,
              });
            }
            
          }
        };
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });

      ringingRef.current.loop = true;
      dialingRef.current.loop = true;

      
          // Listen for ICE candidates from the other peer
          const handleCandidates = async(data)=>{
            testFunc()
            console.log('ice data ',data);
            
            if (peerRef.current) {
              if (peerRef.current.remoteDescription) {
                try {
                   await peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
                } catch (error) {
                  console.error("Error adding ICE candidate:", error);
                }
              } else {
                console.warn("ICE candidate received before setting remote description, storing for later.");
                pendingCandidates.current.push(data.candidate); // Store for later
              }
            }
          }
          
   
          if (callerDetails) {
            setCallIncoming(callerDetails);
            console.log(callerDetails);
            
            // Play ringing sound
            setTimeout(() => {
              if (ringingRef.current) {
                ringingRef.current.play().catch(err => console.error('Audio play error:', err));
              }
            }, 100);
          }
          const handleCallMade = async (data) => {
            console.log('Call made event received', data);
            setCallStatus('Incoming call...')
            setCallIncoming(data);
            
            // Play ringing sound
            setTimeout(() => {
              if (ringingRef.current) {
                ringingRef.current.play().catch(err => console.error('Audio play error:', err));
              }
            }, 100);
          };
    // Listen for an incoming call offer
    socket.on('call-made', handleCallMade);
    socket.on('ice-candidate',handleCandidates)

    // socket.on('call-cancelled',(data)=>{
    //   if (callTimeoutRef.current) {
    //     clearTimeout(callTimeoutRef.current);
    //     callTimeoutRef.current = null;
    //   }
    //   setCallStatus('')
    //   setCallIncoming(null);
    //   stopAudio()
    //   // alert(data.message);
    //   cleanWebRTC()
    //   setContent('dashboard')
    // })


    socket.on('answer-made', async (data) => { 
      setCallStatus('Connected');
      if (callTimeoutRef.current) {
        clearTimeout(callTimeoutRef.current);
        callTimeoutRef.current = null;
      }
     stopAudio()
        
        if (peerRef.current && data.answer) {
           await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
  });

    // Cleanup socket events on component unmount
    return () => {
      stopAudio()
      socket.off('call-made');
      socket.off('answer-made');
      socket.off('ice-candidate');
      // socket.off('call-cancelled')
      if (localVideoRef.current?.srcObject) {
    localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    localVideoRef.current.srcObject = null;
  }
    };

  }, []);
 
;
  // 1) Function to initiate a call
  const callUser = async () => {
    setCallStatus('Ringing...')
    dialingRef.current.play(); 
    // Create an offer
    const offer =  await peerRef.current.createOffer();
     await peerRef.current.setLocalDescription(new RTCSessionDescription(offer));
  
    socket.emit('call-user', {
      offer,  
      fromUserId:userId,
      toUserId: targetUserId,
      callerName:userData.username
    });
    // setCallerDetails({callerId:userId,callerName:user.username})
    setShowCalling(true)
    callTimeoutRef.current = setTimeout(() => {
      cancelCall();
      alert("Call timed out. No answer.");
  }, 30000);
  };
 

const cancelCall =()=>{
  if (callTimeoutRef.current) {
    clearTimeout(callTimeoutRef.current);
    callTimeoutRef.current = null;
}
  stopAudio() 
  socket.emit('cancel-call', {
    fromUserId: userId,
    toUserId: targetUserId,
  });
  setShowCalling(false)
  setCallStatus('');
  setCallIncoming(null);
  cleanWebRTC();
  setContent('dashboard')
} 


const processPendingCandidates = async () => {
  console.log('processing');
  
  if (peerRef.current && peerRef.current.remoteDescription) {
    while (pendingCandidates.current.length > 0) {
      const candidate = pendingCandidates.current.shift(); // Remove from queue
      try {
         await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Error adding queued ICE candidate:", error);
      }
    }
  }
};


const answerCall = async () => {
  if (!callIncoming || !callIncoming.offer) {
    console.error('No incoming call or offer available');
    return;
  }
  if (callTimeoutRef.current) {
    clearTimeout(callTimeoutRef.current);
    callTimeoutRef.current = null;
    console.log('clearing timeout');
    
}

if (!peerRef.current) {
  peerRef.current = new RTCPeerConnection(configuration);

  peerRef.current.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        candidate: event.candidate,
        fromUserId: userId,
        toUserId: callIncoming?.callerUserId,
      });
    }
  };

  peerRef.current.ontrack = (event) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = event.streams[0];
    }
  };
}
try {
   await peerRef.current.setRemoteDescription(new RTCSessionDescription(callIncoming.offer));
  console.log("Remote description set successfully.");
   await processPendingCandidates(); 
  const answer =  await peerRef.current.createAnswer();
   await peerRef.current.setLocalDescription(new RTCSessionDescription(answer));
  stopAudio();
  socket.emit('make-answer', {
    answer,
    fromUserId: userId,
    toUserId: callIncoming.callerUserId,
  });
  setCallStatus('Connected');
} catch (error) {
  console.error("Error handling incoming call:", error);
}
};


const exit=()=>{
  stopAudio()
    socket.emit('end-call', { fromUserId: userId, toUserId: targetUserId });
    setCallStatus('');
  setCallIncoming(null);
  cleanWebRTC();
  setContent('dashboard')
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
  console.log(remoteVideoRef);

  
  return (
    <div className='video-call-container'>
      <h3>{user?.username || callerDetails.callerName}</h3>
      <div className="video-display">
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
    {callStatus != 'Connected' && callStatus=='Ringing...'?
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
    
    {/* when calling user see option to cancel call */}
    <div className='call-controls'>
    {callStatus == 'Ringing...' && <button className='cancelcall-btn control-btn' onClick={() => {
            cancelCall();
          }}>
            <FontAwesomeIcon icon={faPhoneSlash}/> 
          Cancel Call
        </button> }
      
    

{/* if no calling is taking show these buttons */}
     {callStatus== '' && 
    <>
    <button className='call-btn control-btn' onClick={()=>{callUser()}}>
        <FontAwesomeIcon icon={faPhone}/> 
      Call
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
            <FontAwesomeIcon icon={faPhone}/> 
          Accept
        </button>
        <button className='endcall-btn control-btn' onClick={()=>{exit()}}>
            <FontAwesomeIcon icon={faSignOut}/> 
          Reject
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
    <button className='endcall-btn control-btn' onClick={()=>exit()}>
        <FontAwesomeIcon icon={faPhoneSlash}/> 
    </button>
      </>
      }
   
      </div>
      </div>
    
    </div>
  )
}

export default LiveLesson




    // socket.on('call-cancelled',(data)=>{
    //   if (callTimeoutRef.current) {
    //     clearTimeout(callTimeoutRef.current);
    //     callTimeoutRef.current = null;
    //   }
    //   setCallStatus('')
    //   setCallIncoming(null);
    //   stopAudio()
    //   // alert(data.message);
    //   cleanWebRTC()
    //   setContent('dashboard')
    // })