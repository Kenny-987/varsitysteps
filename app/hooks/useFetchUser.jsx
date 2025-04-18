import React, {useState,useEffect}from 'react'

const useFetchUser =  () => {
    const [userData,setUserData]=useState(null)
    const [loading,setLoading] = useState(true)
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [tutoringData,setTutoringData]=useState(null)
    const [notificationCount,setNotificationCount] = useState(0)
    const [notifications,setNotifications]=useState([])
   

    
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const response =  await fetch('/api/user/info',{
                    credentials:'include'
                })
                if(response.ok){
                    const data =  await response.json()
                    setUserData(data.user)
                    setTutoringData(data.tutoring)
                    setIsAuthenticated(true)
                    setLoading(false)
                }
            } catch (error) {
                // setError(error.message)
                // console.log(error.message)
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
        // const fetchNotifications = async()=>{
        //     try {
        //         const response =  await fetch(`http://localhost:3000/notifications`,{
        //             credentials:'include'
        //         })
        //         if(response.ok){
        //             const data =  await response.json()
        //             setNotifications(data)
        //             const unread = data.filter(notification=>notification.is_read==false)
        //             setNotificationCount(unread.length);
        //         }
        //     } catch (error) {
        //         console.error(error)
        //     }  
        // }
        fetchUser()
        // .then(() => {
        //     fetchNotifications();
        // });
    },[])

    
  return {loading,userData,setUserData,tutoringData,isAuthenticated,setIsAuthenticated,notifications,notificationCount,setNotificationCount}
}

export default useFetchUser