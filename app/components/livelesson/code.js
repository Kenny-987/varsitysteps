'use client'
import React,{useEffect,useState,useRef,useCallback} from 'react'
import { useSocket } from '../../hooks/SocketContext'
import { useContextUser } from '../../hooks/Context'
import './live.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faMicrophone, faMicrophoneSlash, faPauseCircle, faPhone, faPhoneSlash, faPlayCircle, faRecordVinyl, faSignOut, faStopCircle, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'

const LiveLesson = ({receiver,setContent,user,callerDetails,ringingRef}) => {
  const socket = useSocket()
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const {userData,setShowVideoCall} = useContextUser()
  const targetUserId = receiver||callerDetails?.callerUserId
  const userId = userData.id
  const [callStatus,setCallStatus]=useState(callerDetails?"Incoming call...":'')
  const dialingRef = useRef(new Audio('/dialing.mp3'));
  const [isCallInitiator, setIsCallInitiator] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [recording, setRecording] = useState(false); 
  const [videoURL, setVideoURL] = useState(null); 
  const mediaRecorderRef = useRef(null); 
  const recordedChunksRef = useRef([]); 
  const streamRef = useRef(null);
  const callTimeoutRef = useRef(null)
  const role = localStorage.getItem('role')
  const [paused, setPaused] = useState(false);
  // Store ice candidates before remote description is set
  const pendingIceCandidates = useRef([]);
  const isIOS = useRef(
    navigator.userAgentData
      ? navigator.userAgentData.platform === 'iOS'
      : /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.userAgent.includes("Mac") && navigator.maxTouchPoints > 1)
  );

  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { 
        urls: 'turn:13.49.18.137:3478',  
        username: 'videocaller',             
        credential: 'connectme4321'
      }
    ],
    // Add these for iOS Safari
    iceTransportPolicy: 'all',
    iceCandidatePoolSize: 10
  };
  
  const cleanWebRtc = async()=>{
    if (peerRef.current) {
      peerRef.current.onicecandidate = null;
      peerRef.current.ontrack = null;
      peerRef.current.close();
      peerRef.current = null;
    }
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
      stream.getTracks().forEach((track) => {
        track.stop();
        console.log('Stopping track:', track.kind);
      });
    }
  
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if(ringingRef) ringingRef.current.pause()
    if(dialingRef)dialingRef.current.pause(); 
    setContent?setContent('dashboard'):setShowVideoCall(false)
  }

  // Process any pending ICE candidates we stored
  const processPendingIceCandidates = async () => {
    if (peerRef.current && peerRef.current.remoteDescription && pendingIceCandidates.current.length > 0) {
      console.log(`Processing ${pendingIceCandidates.current.length} pending ICE candidates`);
      
      for (const candidate of pendingIceCandidates.current) {
        try {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          console.log('Added pending ICE candidate');
        } catch (error) {
          console.error('Error adding pending ICE candidate:', error);
        }
      }
      
      pendingIceCandidates.current = [];
    }
  };

  const setUpWebRtc = async()=>{
    try {
      // iOS-friendly constraints
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
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        // iOS Safari sometimes requires this explicit play call
        try {
          await localVideoRef.current.play();
        } catch (err) {
          console.log("Auto-play prevented on local video:", err);
        }
      }
      
      peerRef.current = new RTCPeerConnection(configuration);

      stream.getTracks().forEach(track => 
        peerRef.current.addTrack(track, stream)
      );

      peerRef.current.ontrack = event => {
        console.log("Remote track received:", event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          // iOS Safari sometimes requires this explicit play call
          remoteVideoRef.current.play().catch(err => {
            console.log("Auto-play prevented on remote video:", err);
          });
        }
      };

      peerRef.current.onicecandidate = event => {
        if (event.candidate) {
          const recipientUserId = callerDetails ? callerDetails.callerUserId : targetUserId;
          console.log('Sending ICE candidate to user ID:', recipientUserId);
          
          if (recipientUserId) {
            socket.emit('ice-candidate', {
              candidate: event.candidate,
              fromUserId: userId,
              toUserId: recipientUserId,
            });
          }
        }
      };
      
      // Add iOS-specific connection state monitoring
      peerRef.current.oniceconnectionstatechange = () => {
        console.log("ICE Connection State:", peerRef.current.iceConnectionState);
        if (peerRef.current.iceConnectionState === 'failed' || 
            peerRef.current.iceConnectionState === 'disconnected') {
          console.log("Attempting ICE restart...");
          if (isCallInitiator) {
            callUser(); // Retry the call
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
    const handleCallCancelled = async(data)=>{
      alert(data.message)
      cleanWebRtc()
      window.location.reload()
    }

    const handleCallAnswered = async (data)=>{
      if (callTimeoutRef.current) {
        clearTimeout(callTimeoutRef.current);
        callTimeoutRef.current = null;
        console.log('clearing timeout');  
      }
      
      if (peerRef.current && data.answer) {
        setCallStatus('Connected');
        console.log('call answered');
        
        try {
          console.log('Setting remote description from answer');
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
          console.log('Call answered, remote description set');
          // Process any pending ICE candidates now that we have remote description
          await processPendingIceCandidates();
          setCallStatus('Connected');
        } catch (error) {
          console.error('Error setting remote description:', error);
        }
      }
      if(ringingRef) ringingRef.current.pause()
      if(dialingRef)dialingRef.current.pause(); 
    }
    
    const handleIceCandidates = async(data)=>{
      console.log('Received ICE candidate:', data);
      try {
        if (peerRef.current && data.candidate) {
          if (peerRef.current.remoteDescription) {
            try {
              await peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
              console.log('Added ICE candidate immediately');
            } catch (error) {
              console.error('Error adding ICE candidate immediately:', error);
              
              // On failure, store it for later retry
              pendingIceCandidates.current.push(data.candidate);
            }
          } else {
            console.warn('Remote description not set yet, storing ICE candidate');
            pendingIceCandidates.current.push(data.candidate);
          }
        }
      } catch (error) {
        console.error('Error handling ICE candidate:', error);
      }
    }

    const handleUserOffline=async(data)=>{
      if (callTimeoutRef.current) {
        clearTimeout(callTimeoutRef.current);
        callTimeoutRef.current = null;
        console.log('clearing timeout');  
      }
      alert(data.message)
      cleanWebRtc()
    }

    socket.on('ice-candidate',handleIceCandidates)
    socket.on('call-cancelled', handleCallCancelled);
    socket.on('call-rejected',handleCallCancelled);
    socket.on('call-answered',handleCallAnswered);
    socket.on('user-offline',handleUserOffline)
    
    // iOS-specific hack: Play a silent sound to activate audio context
    if (isIOS.current) {
      document.addEventListener('touchstart', () => {
        const silentSound = new Audio();
        silentSound.play().catch(e => console.log('Silent sound play failed:', e));
      }, { once: true });
    }
    
    return () => {
      socket.off('call-cancelled')
      socket.off('call-rejected')
      socket.off('call-answered')
      socket.off('ice-candidate')
      socket.off('user-offline')
    };
  },[])


  const callUser=async()=>{
    if(!peerRef.current) return
    setIsCallInitiator(true);
    
    try {
      const offer = await peerRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true  // Important for iOS!
      });
      await peerRef.current.setLocalDescription(offer);

      callTimeoutRef.current = setTimeout(() => {
        cancelCall();
        alert("Call timed out. No answer.");
      }, 30000);

      setCallStatus('Ringing...')
      dialingRef.current.play(); 

      socket.emit('call-user', {
        offer, 
        fromUserId:userId,
        toUserId: targetUserId,
        callerName:userData.username
      });
      console.log('calling with offer:', offer);
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Failed to create call offer. Please try again.');
    }
  }

  const answerCall=async()=>{
    if (!callerDetails || !callerDetails.offer) {
      console.error('No incoming call or offer available');
      return;
    }
    
    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
      callTimeoutRef.current = null;
      console.log('clearing timeout');  
    }
    
    try {
      console.log('Setting remote description from offer');
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(callerDetails.offer));
      console.log('Remote description set, creating answer');
      
      // Process any pending ICE candidates after setting remote description
      await processPendingIceCandidates();
      
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      
      socket.emit('answer-call', {
        answer,
        fromUserId: userId,
        toUserId: targetUserId,
      });
      
      if (ringingRef) ringingRef.current.pause();
      setCallStatus('Connected');
    } catch (error) {
      console.error("Error handling incoming call:", error);
      alert("Failed to answer call. Please try again.");
    }
  }

  const exit = async()=>{
    cleanWebRtc()
    discardRecording()
  }

  const cancelCall = async()=>{
    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
      callTimeoutRef.current = null;
      console.log('clearing timeout');  
    }
    socket.emit('cancel-call', {
      fromUserId: userId,
      toUserId: targetUserId,
    });
    cleanWebRtc()
    discardRecording()
    window.location.reload()
  }

  const rejectCall = async()=>{
    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
      callTimeoutRef.current = null;
      console.log('clearing timeout');  
    }
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

  // The rest of your code for recording functionality remains the same
  const startRecording = async () => {
    try {
      recordedChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream; // Store the stream in the ref
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data); // Push data into chunks
        }
      };
      
      mediaRecorderRef.current.start();
      setRecording(true); 
      setPaused(false);
      setRecordingTime(0)
    } catch (error) {
      console.error('Error starting recording: ', error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setPaused(false);
    }
  };

  const discardRecording = () => {
    recordedChunksRef.current = [];
    if(mediaRecorderRef.current != null && streamRef.current != null){
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop()); 
    } 
    clearInterval(timerRef.current); 
    setRecording(false);
    setPaused(false)
    setShowSaveModal(false)
  };

  const [loading,setLoading]=useState(false)
  const [videoTitle,setVideoTitle]=useState('')
  const [showSaveModal,setShowSaveModal]=useState(false)
  const [message,setMessage]=useState(null)

  const saveRecording = async(e) =>{
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => {
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
        resolve();
      };
  
      mediaRecorderRef.current.stop();
    });
    await streamRef.current.getTracks().forEach((track) => track.stop());
  
    if (recordedChunksRef.current.length === 0) return;
    
    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    const filename = videoTitle.trim() ? `${videoTitle}.webm` : "recording.webm"
    const file = new File([blob], filename, { type: "video/webm" });
    const formData = new FormData();
    formData.append("files", file);   
    formData.append('student_id', receiver || callerDetails.callerUserId);
    formData.append('file_type', 'tutorfile');
    formData.append('format', 'video');

    try {
      const response =  await fetch('http://localhost:3000/tutors/fileupload', {
        method: 'POST',
        body: formData,
        credentials:'include'
      });
      if(response.ok){
       setMessage('File uploaded successfully')
       setTimeout(() => {
        setMessage(null);
      }, 3000);
        setPaused(false)
        clearInterval(timerRef.current); 
        setRecording(false);
      }
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
      clearInterval(timerRef.current); 
      setRecording(false);
      setShowSaveModal(false)
    }
  }

  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  useEffect(() => {
    if (recording && !paused) {
      // Start the timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      // Pause or stop timer
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [recording, paused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Force autoplay for iOS
  useEffect(() => {
    if (callStatus === 'Connected' && remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      const playPromise = remoteVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented:', error);
          // Show play button or silently activate on next user interaction
        });
      }
    }
  }, [callStatus]);

  return (
    <div className='video-call-container'>
      <h3>{user?.username || callerDetails?.callerName}
      {recording && 
      <p className='recording'><FontAwesomeIcon color='red' fade icon={faStopCircle}/> {paused ? "Paused":"Recording"} <span>{formatTime(recordingTime)}</span></p>}
      </h3>
      
      <div className={`localvideo ${callStatus === "Connected" ? "small-preview" : ""}`}>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
        ></video> 
      </div>

      {callStatus=='Incoming call...' &&
        <div className='callstatus'>
          <div className="call-loader"></div> 
          <p>{callStatus}</p>
        </div>
      }

      {callStatus != 'Connected' && callStatus=='Ringing...' ?
        <div className='callstatus'>
          <div className="call-loader"></div> 
          <p>{callStatus}</p>
        </div> :
        <div className="remotevideo">
          <video 
            ref={remoteVideoRef}
            autoPlay
            playsInline
            controls={isIOS.current} // Add controls for iOS to help with manual play
          ></video>
        </div> 
      }

      {paused && <div className='recording-options'>
        <p>Recording paused</p>
        <div className="record-btns">
          <button className='save' onClick={()=>setShowSaveModal(true)}>Save</button>
          <button className='discard' onClick={()=>discardRecording()}>Discard</button>
        </div>
      </div>} 
        
      {showSaveModal && <div className="save-modal">
        <button className='discard' onClick={()=>discardRecording()}><FontAwesomeIcon icon={faClose}/></button>
        <form onSubmit={saveRecording}>
          <label htmlFor="file_name">Video Title</label>
          <input type="text" 
            id='file_name' 
            value={videoTitle}
            required
            onChange={(e)=>setVideoTitle(e.target.value)}
          />
          {loading ? <div className='btn-loader'></div>:
            <div className="savemodal-btns">
              <button className="save" type='submit'>Save</button>
            </div>
          }
        </form>
      </div>}
      
      {message && <p className='success-message calls'>
        {message}
      </p>}

      <div className="call-controls">
        {callStatus == 'Ringing...' && 
          <button className='cancelcall-btn control-btn' onClick={()=>{cancelCall()}}>
            <FontAwesomeIcon icon={faPhoneSlash}/>Cancel Call
          </button>
        }

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
          </>
        }

        {/* when call incoming, user sees option to answer or reject */}
        {callStatus == 'Incoming call...' &&
          <>
            <button className='call-btn control-btn' onClick={()=>{answerCall()}}>
              <FontAwesomeIcon icon={faPhone}/>Accept
            </button>

            <button className='endcall-btn control-btn' onClick={()=>{rejectCall()}}>
              <FontAwesomeIcon icon={faSignOut}/>Reject
            </button>
          </>
        }
        
        {/* when both users are connected they see these buttons */}
        {callStatus=='Connected' && 
          <>
            <button className='mic-btn control-btn' onClick={toggleMicrophone}>
              <FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />
            </button>

            <button className='camera-btn control-btn' onClick={toggleCamera}>
              <FontAwesomeIcon icon={isCameraOn ? faVideo : faVideoSlash} />
            </button>

            {role=='tutor' && 
              <>
                {!recording ? 
                  <button className='record-btn control-btn' onClick={startRecording}>
                    <FontAwesomeIcon icon={faRecordVinyl}/> 
                  </button> :
                  <>
                    {paused ? 
                      <button className='record-btn control-btn' onClick={resumeRecording}>
                        <FontAwesomeIcon icon={faPlayCircle}/>  Resume
                      </button> :
                      <button className='record-btn control-btn' onClick={pauseRecording}>
                        <FontAwesomeIcon icon={faPauseCircle}/> Pause
                      </button>
                    }
                  </>
                }
              </>
            }
            
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