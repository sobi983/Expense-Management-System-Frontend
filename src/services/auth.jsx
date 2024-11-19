import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/userStore';

const ProtectedRoute = () => {
  const { userData } = useUserStore()

  if (userData === null || userData === undefined) {
    // Still checking authentication
    return <div>Loading...</div>;
  }

  return userData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;