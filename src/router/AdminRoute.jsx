import React from 'react';
import useAuth from '../Hook/useAuth';
import useRole from './useRole';


const AdminRouter = ({children}) => {

    const { loading} = useAuth();
    const {role, isLoading} = useRole();

    if(loading || isLoading) {
        return <p>loading...........</p>
    }
    if(role !== 'admin'){
       return <div>Access is forbidden.........</div>
    }





    return children;
};

export default AdminRouter;
