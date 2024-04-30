import React from 'react';
import { useNavigate } from 'react-router-dom';

const withNoAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      navigate('/Profile'); // replace with your home route
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withNoAuth;