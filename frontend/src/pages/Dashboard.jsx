import React from 'react'
import Header from '../components/SystemAdmin/Header'
import Dashboardsection1 from '../components/SystemAdmin/Dashboardsection1'

import ApexChart from '../components/SystemAdmin/Dashboardsection2'
import Dashboardsection3 from '../components/SystemAdmin/Dashboardsection3'
import Dashboardsection2 from '../components/SystemAdmin/Dashboardsection2'

const Dashboard = () => {
  return (
    <div className='w-full h-screen bg-secondary'>
<Header/>
<Dashboardsection1/>
<Dashboardsection2/>
<Dashboardsection3/>
    </div>
  )
}

export default Dashboard