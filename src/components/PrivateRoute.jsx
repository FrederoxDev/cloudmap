import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';

const PrivateRoute = () => {
    const { userCredentials } = useAuth()
    return userCredentials ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;