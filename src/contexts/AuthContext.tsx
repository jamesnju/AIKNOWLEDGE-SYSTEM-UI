'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeDefaultUser, autoLogin, loginAsStaff, logout } from '../lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await initializeDefaultUser();
      const result = await autoLogin();
      if (result) {
        setIsAuthenticated(true);
        setUserId(result.userId);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginAsStaff(email, password);
    setIsAuthenticated(true);
    setUserId(result.userId);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, login, logout: handleLogout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}