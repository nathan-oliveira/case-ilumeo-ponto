import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userCode } = useSelector((state: any) => state.user);
  if (!userCode) return <Navigate to="/login" />;
  else return <Outlet />;
}

export default ProtectedRoute;
