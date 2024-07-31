import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../context/Context';

const PrivateRoute = () => {
  const { loggedIn } = useGlobalContext();

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
