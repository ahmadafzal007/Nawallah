import React from 'react'
import Header from '../components/SystemAdmin/Header'
import Reataurant from '../components/SystemAdmin/Reataurant'
import MapContainer from "../components/SystemAdmin/Map"
const Restaurants = () => {
  return (
    <div className=' h-screen w-full bg-secondary'>
      <Header/>
    
      <Reataurant/>
    </div>
  )
}

export default Restaurants