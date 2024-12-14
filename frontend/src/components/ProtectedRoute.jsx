import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ userType, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You could render a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in, redirect to landing page
    return <Navigate to="/" replace />;
  }

  if (user.type !== userType) {
    // Wrong user type, redirect to appropriate dashboard
    return <Navigate to={`/dashboard/${user.type}`} replace />;
  }

  // Authorized, render component
  return children;
};

ProtectedRoute.propTypes = {
  userType: PropTypes.oneOf(['startup', 'investor']).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
