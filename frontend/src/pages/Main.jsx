import React from 'react'
import Sidebar from '../components/SystemAdmin/Sidebar';
import { Route, Routes, Outlet } from "react-router-dom";
import Dashboard from './Dashboard';
import Users from './Users';
import Restaurants from './Restaurants';
import Analytics from './Analytics';
import Food from './Food';
import Review from './Review';
import UnauthNGO from './UnauthNGO';
const SideBarLayout = () => {
    return (
      <div className="flex ">
        <Sidebar />
        <Outlet />
      </div>
    );
  };
const Main = () => {
  return (
    <div className='bg-secondary'>
         <Routes>
        <Route element={<SideBarLayout />}>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/main" element={<Dashboard />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/restaurants" element={<Restaurants />} />
        {/* <Route exact path="/analytics" element={<Analytics />} /> */}
        <Route exact path="/food" element={<Food />} />
        <Route exact path="/review" element={<Review />} />
        </Route>
        </Routes>
    </div>
  )
}

export default Main