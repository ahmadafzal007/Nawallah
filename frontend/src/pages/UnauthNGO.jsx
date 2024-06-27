import React from 'react'
import UnauthNGO from '../components/SystemAdmin/UnauthNGO'
import Header from '../components/SystemAdmin/Header'

const authNGO = () => {
  return (
    <div className='h-screen w-full bg-secondary'>
    <Header/>
    <UnauthNGO/>

    </div>
  )
}

export default authNGO