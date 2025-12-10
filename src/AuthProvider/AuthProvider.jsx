import React, { useEffect, useState } from 'react';
import Authcontext from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const  Provider = new GoogleAuthProvider;

    // sing up new user
    const singupuser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    } 

    
    // login user

    const loginuser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login

    const googellogin = () => {
        setLoading(true)
        return signInWithPopup(auth, Provider)
    }


    // update profile 

    const updateprofile  = (profiledata) =>
        {
            return updateProfile(auth.currentUser, profiledata);

        } 



    // logout 

    const logoutuser = () => {
        setLoading(true)
        return signOut(auth);
    }

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }

    }, []);


    const authinfo = {
        singupuser,
        loginuser,
        user,
        loading,
        googellogin,
        logoutuser,
        updateprofile,
  }


    return (
        <Authcontext value={authinfo}>
            {children}
        </Authcontext>
    );
};

export default AuthProvider;