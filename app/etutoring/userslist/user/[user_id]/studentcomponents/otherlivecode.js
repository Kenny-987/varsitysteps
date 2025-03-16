//exit function
const exit=()=>{
    stopAudio()
    cleanWebRTC()
      socket.emit('end-call', { fromUserId: userId, toUserId: targetUserId });
      setCallIncoming(null);
      setCallStatus('');
      setContent('dashboard');
    }
    

  // Function to reject the call
  const rejectCall = () => {
    ringing.pause()
 
    socket.emit('reject-call', {
      fromUserId: userId,
      toUserId: callIncoming.callerUserId,
    });
    setCallIncoming(null);
    alert('you rejected the call')
  };

  // Listen for call rejection
    socket.on('call-rejected', () => {
      setCallStatus('Call Rejected')
      ringing.pause()
      dialing.pause()
      alert("Call was rejected by the peer.");
    });





   // Function to answer an incoming call
   const answerCall = async () => {
    if (callTimeout) clearTimeout(callTimeout)

    await peerRef.current.setRemoteDescription(new RTCSessionDescription(callIncoming.offer));
    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(new RTCSessionDescription(answer));
    stopAudio()
    socket.emit('make-answer', {
      answer,
      fromUserId: userId,
      toUserId: callIncoming.callerUserId,
    });
    setCallStatus('Connected')
    setCallIncoming(null);
  };
 

    // Listen for answer from the other peer
    socket.on('answer-made', async (data) => { 
        console.log("incoming data ", data);
        setCallStatus('Connected');
        
       stopAudio()
          
          if (data.answer) {
            await peerRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
    });




    socket.on('user-offline', async (data) => {
        setCallStatus('')
        stopAudio()
        cleanWebRTC()
        alert('useoffline')
        setCallIncoming(null);
      });
  




      
// const endCall = () => {
//   if (peerRef.current) {
//     peerRef.current.close();  // Close the WebRTC connection
//     peerRef.current = null;
//   }

//   if (localVideoRef.current.srcObject) {
//     localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());  // Stop camera and mic
//     localVideoRef.current.srcObject = null;
//   }

//   if (remoteVideoRef.current.srcObject) {
//     remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());  // Stop remote video
//     remoteVideoRef.current.srcObject = null;
//   }

//   // Notify the other peer
//   socket.emit('end-call', { fromUserId: userId, toUserId: targetUserId });

//   // Reset UI
//   setCallIncoming(null);
// };

// socket.on('end-call', () => {
//   if (peerRef.current) {
//     peerRef.current.close();
//     peerRef.current = null;
//   }

//   if (remoteVideoRef.current.srcObject) {
//     remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
//     remoteVideoRef.current.srcObject = null;
//   }

//   alert("The call has ended.");
// });




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
