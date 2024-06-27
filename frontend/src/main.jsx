import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Welcome from './Screens/WelcomePage.jsx'
import HotelRegistration from './components/HotelRegister/Registration.jsx'
import WelfareLogin from './components/WelfareRegister/LoginWelfare.jsx'
import WelfareRegister from './components/WelfareRegister/RegisterWelfare.jsx'
import WelfareDashboard from './Screens/NGODashBoard.jsx'

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import RequireAuth from './components/SystemAdmin/RequireAuth';
import Login from './pages/Login';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

console.log(window.screen.width, window.screen.height)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  

    {/* <App /> */}
    <AuthProvider>

<BrowserRouter>
  <Routes>
        <Route
          path="/*"
          element={
             <RequireAuth>
              <App loading={true}/>
             </RequireAuth>
          }
        />
        <Route exact path="/" element={<Welcome/>}/>
        <Route exact path="/WelfareDashBoard" element={<WelfareDashboard/>}/>
        <Route exact path="/HotelRegister" element={<HotelRegistration/>}/>
        <Route exact path="/WelfareLogin" element={<WelfareLogin/>}/>
        <Route exact path="/WelfareRegister" element={<WelfareRegister/>}/>
        <Route path="/login" element={<Login />} />

      </Routes>
 
</BrowserRouter>

</AuthProvider>,

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
