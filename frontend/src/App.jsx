import { useState } from 'react'
import './App.css'
import Welcome from './Screens/WelcomePage.jsx'
import HotelDashBoard from './Screens/HotelDashBoard.jsx'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HotelRegistration from './components/HotelRegister/Registration.jsx'
import WelfareLogin from './components/WelfareRegister/LoginWelfare.jsx'
import WelfareRegister from './components/WelfareRegister/RegisterWelfare.jsx'
import WelfareDashboard from './Screens/NGODashBoard.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<Welcome/>}/>
        <Route exact path="/WelfareDashBoard" element={<WelfareDashboard/>}/>
        <Route exact path="/HotelRegister" element={<HotelRegistration/>}/>
        <Route exact path="/WelfareLogin" element={<WelfareLogin/>}/>
        <Route exact path="/WelfareRegister" element={<WelfareRegister/>}/>
      </Routes>

    </Router>
  )
}

export default App
