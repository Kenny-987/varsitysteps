import React, {useState,useEffect}from 'react'

const useFetchUser =  () => {
    const [userData,setUserData]=useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError]= useState(null)
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [creatorData,setCreatorData]=useState(null)
    const [notificationCount,setNotificationCount] = useState(0)
    const [notifications,setNotifications]=useState([])
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const response = await fetch('http://https://varsitysteps-server.onrender.com:3000/user/info',{
                    credentials:'include'
                })
                if(response.ok){
                    const data = await response.json()
                    setUserData(data.user)
                    setCreatorData(data.creative)
                    console.log(data);
                    
                    setIsAuthenticated(true)
                    setLoading(false)
                }else{
                    setLoading(false)
                }
                
            } catch (error) {
                setError(error.message)
                console.log(error.message)
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
        const fetchNotifications = async()=>{
            try {
                const response = await fetch(`http://https://varsitysteps-server.onrender.com:3000/api/notifications`,{
                    credentials:'include'
                })
                if(response.ok){
                    const data = await response.json()
                    setNotifications(data)
                    const unread = data.filter(notification=>notification.is_read==false)
                    setNotificationCount(unread.length);
                }
            } catch (error) {
                console.error(error)
            }  
        }
        if(isAuthenticated){
            fetchNotifications()
        }
        fetchUser()
    },[])

    
  return {userData,setUserData,creatorData,setCreatorData,isAuthenticated,setIsAuthenticated,loading,error,notifications,notificationCount,setNotificationCount}
}

export default useFetchUser