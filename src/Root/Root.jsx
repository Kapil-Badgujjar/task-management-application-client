import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Root() {
  
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    useEffect(()=>{
        // If user not logged in navigate to login page
        if(!user?.id){
          navigate('/login');
        }
    },[]);
  return (
    <Outlet />
  )
}
