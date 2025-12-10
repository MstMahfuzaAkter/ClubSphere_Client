import React from 'react';
import useAuth from '../Hook/useAuth';
import Loadingspinner from '../Components/Shared/Loadingspinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <Loadingspinner></Loadingspinner>;
    }

    if(user){
        return children;

    };

    return <Navigate to='/login' state={location.pathname}></Navigate>

    
};

export default PrivateRoute;