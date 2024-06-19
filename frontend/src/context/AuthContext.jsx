import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    if (token && storedUserType) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
      console.log('User is authenticated and userType is set:', storedUserType); // Debug log
    } else {
      console.log('User is not authenticated'); // Debug log
    }
  }, []);

  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setIsAuthenticated(false);
    setUserType('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
