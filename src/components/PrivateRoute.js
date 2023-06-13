import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({children, ...rest }) => {
  const location = useLocation();
  const { currentUser } = useAuth() // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return currentUser ? <Outlet/> : <Navigate to="/login" state={{ from: location }} replace/>;
}

export default PrivateRoute


