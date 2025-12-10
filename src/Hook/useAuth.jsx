import React, { useContext } from 'react';
import Authcontext from '../AuthProvider/Authcontext';

const useAuth = () => {

    const authprovider = useContext(Authcontext);



    return (
        authprovider
    );
};

export default useAuth;