import { useState } from 'react'
import './App.css'
import Welcome from './Screens/WelcomePage.jsx'
import HotelDashBoard from './Screens/HotelDashBoard.jsx'
import {BrowserRouter as Router, Route, Routes, Outlet} from 'react-router-dom'
import HotelRegistration from './components/HotelRegister/Registration.jsx'
import WelfareLogin from './components/WelfareRegister/LoginWelfare.jsx'
import WelfareRegister from './components/WelfareRegister/RegisterWelfare.jsx'
import WelfareDashboard from './Screens/NGODashBoard.jsx'


import AdminMain from "./pages/Main.jsx"

import Login from "./pages/Login";
import Main from "./pages/Main";
import Sidebar from "./components/SystemAdmin/Sidebar";


import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Restaurants from './pages/Restaurants';
import Analytics from './pages/Analytics';
import Food from './pages/Food';
import Review from './pages/Review';
import Menu from "./components/SystemAdmin/Menu";
import Menus from "./pages/Menus";
import Container from "./components/SystemAdmin/Container";
import Orders from "./pages/Orders";
import UnauthNGO from './pages/UnauthNGO.jsx'
import WelfareTable from './pages/Welfares.jsx'


const SideBarLayout = () => {
  return (
    <div className="flex bg-green-700">
      <Sidebar />
      <Outlet />
    </div>
  );
};


function App() {
  const [count, setCount] = useState(0)

  return (
  
   <div className="bg-secondary ">
   
    <div className="flex flex-row gap-2 md:gap-6 bg-secondary ">
    <SideBarLayout />
    {/* <Container> */}
   
      <Routes>
      {/* <Route exact path="/" element={<Dashboard />} /> */}
        
        {/* <Route path="/" element={<Login />} /> */}
z        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/welfare" element={<WelfareTable />} />      
        <Route exact path="/restaurants" element={<Restaurants />} />
        <Route exact path="/UnauthNGO" element={<UnauthNGO />} />
        <Route exact path="/food" element={<Food />} />
        <Route exact path="/review" element={<Review />} />
        <Route exact path="/restaurants/menu/:id" element={<Menus/>} />
        </Routes>
    
      {/* </Container> */}
      </div>
   
    </div>
     

  

  
  
  
  )
}

export default App
