'use client'
import React, {useState,useEffect} from 'react'
import '../../institutions.css'
import '../../../globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faCity, faGlobe, faInfoCircle, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

const Institution = () => {
    const {institutionName} = useParams()
    const [loading,setLoading] = useState(false)
    const [institution,setInstitution] = useState(null)
    const [faculties,setFaculties]=useState(null)

     // Dynamically load Leaflet components to avoid SSR issues
  const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
  const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
  const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
  const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    setMapReady(true);
  }, []);

console.log(institution)
    useEffect(()=>{
        const fetchInstitute = async ()=>{
            setLoading(true)
            try {
                const response = await fetch(`http://https://varsitysteps-server.onrender.com:3000/institutes/institute?query=${encodeURIComponent(institutionName.replace(/-/g," "))}`)
                const data = await response.json()
                if(response.ok){
                    // console.log(data)
                    setInstitution(data.institute)
                    setFaculties(data.facultyData)
                }else{
                    console.log(' cant fetch details')
                    setLoading(false)
                }
            } catch (error) { 
                console.error(error)
                setLoading(false)
            }
        }
        fetchInstitute()
    },[])


  return (
    <section className="institute">
        {institution? <div>
            <div className="route"> 
            <p><Link href='/institutions'>Institutions</Link>/{institution?institution.institution_name:''}</p>
        </div>
        <div className="institute-details">
        <div className="institute-details-title">
        <div className="logo">
            {institution.logo_link ? <Image alt="logo" src={institution.logo_link} priority={true} width={60} height={60}/>: ''}
        
        </div>
        <h4>{institution?institution.institution_name:''}</h4>
        </div>
        <div className="institute-detail">
            <h4>Description</h4>
            <p><FontAwesomeIcon icon={faInfoCircle}/> {institution?institution.description:''}</p>
            {institution.description_link?<Link target='_blank' href={institution.description_link}>Visit Page</Link>:""}
        </div>
        <div className="institute-detail">
            <h4>City</h4>
            <p><FontAwesomeIcon icon={faCity}/> {institution?institution.institution_city:''}</p>
        </div>
        <div className="institute-detail">
            <h4>Address</h4>
            <p><FontAwesomeIcon icon={faLocationPin}/> {institution?institution.address:''}</p>
        </div>
        <div className="institute-detail">
            <h4>Website</h4>
            <p><FontAwesomeIcon icon={faGlobe}/> <Link href={institution.website?institution.website:''}>{institution?institution.website:''}</Link></p>
        </div>
        <div className="institute-detail">
            <h4>Faculties/Programmes</h4>
            {faculties.map((faculty,index)=>{
                return <p key={index} ><Link target='_blank' href={faculty.faculty_link}>{faculty.title}</Link></p>
            })}
        </div>
        <div className="institute-detail map">
        <MapContainer center={[Number(institution.latitude),Number(institution.longitude)]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
        <Marker position={[Number(institution.latitude),Number(institution.longitude)]}>
        <Popup>
          {institution.institution_name}
        </Popup>
        </Marker>
      </MapContainer>
        </div>
        </div> 
        </div>:<div>...loading</div>}
        
    </section>
  )
}

export default Institution