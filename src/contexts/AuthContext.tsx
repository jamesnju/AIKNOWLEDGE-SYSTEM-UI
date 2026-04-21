// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '../lib/api';

interface User {
  id: number;
  email: string;
  staff_name: string;
  role: string;
  department: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  staff_name: string;
  role: string;
  department: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored token and validate it
    const token = apiService.getToken();
    if (token) {
      // You might want to add a /me endpoint to validate token and get user info
      // For now, we'll just check if token exists
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      // Store user info (you might want to fetch it from a /me endpoint)
      const userInfo: User = {
        id: response.user_id,
        email: email,
        staff_name: email.split('@')[0],
        role: 'user',
        department: 'general'
      };
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await apiService.register(userData);
      // Auto-login after registration
      await login(userData.email, userData.password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
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


// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { initializeDefaultUser, autoLogin, loginAsStaff, logout } from '../lib/auth';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   userId: number | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       await initializeDefaultUser();
//       const result = await autoLogin();
//       if (result) {
//         setIsAuthenticated(true);
//         setUserId(result.userId);
//       }
//       setLoading(false);
//     };
//     initAuth();
//   }, []);

//   const login = async (email: string, password: string) => {
//     const result = await loginAsStaff(email, password);
//     setIsAuthenticated(true);
//     setUserId(result.userId);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsAuthenticated(false);
//     setUserId(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, userId, login, logout: handleLogout, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }