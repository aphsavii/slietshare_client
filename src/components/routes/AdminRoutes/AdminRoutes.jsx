import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoutes = () => {
  const { isAuthenticated ,user } = useSelector((state) => state.auth);
  return (
    user?.role == "admin" ? <Outlet /> : <Navigate to='/notAdmin' />
  )
}

export default AuthRoutes;