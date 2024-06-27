import React from 'react'
import Header from '../components/SystemAdmin/Header'
import WelfareTable from '../components/SystemAdmin/Welfares'
import MapContainer from "../components/SystemAdmin/Map"


const welfare = () => {
  return (
    <div className='h-screen h-full w-full bg-secondary'>
      <Header/>
    
      <WelfareTable/>
    </div>
  )
}

export default welfare;