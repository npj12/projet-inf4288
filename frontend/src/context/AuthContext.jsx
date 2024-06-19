import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAgent, setIsAgent] = useState(false);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setIsAgent(role === 'agent'); // Suppose role est retournée par l'API lors de la connexion
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAgent(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAgent, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
