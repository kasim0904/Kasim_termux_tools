import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('godrive_user');
    return saved ? JSON.parse(saved) : {
      _id: 'user-customer',
      name: 'Abdirahman Hassan',
      email: 'customer@godrive.so',
      role: 'Customer',
      phone: '+252 61 700 8822',
      status: 'VIP',
      isVerified: true
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('godrive_token') || 'mock-jwt-token-2026');

  useEffect(() => {
    if (user) {
      localStorage.setItem('godrive_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('godrive_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('godrive_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('godrive_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('godrive_user');
    localStorage.removeItem('godrive_token');
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
