import { Navigate,Outlet } from 'react-router-dom'
import jwtDecode from "jwt-decode";
import { useEffect } from 'react';




export default function PrivateRoute() {
    const token = localStorage.FbIdToken;
        if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.clear();
            window.location.reload(true)
            window.location.href = "/Login";
          } 
        }

    
    return(
        // token ? <Outlet/>: <Navigate to="/Login"/>
         token ?<Navigate to="/app"/>:<Navigate to="/Login"/>
    )
}