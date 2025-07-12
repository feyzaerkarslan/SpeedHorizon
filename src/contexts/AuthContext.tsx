'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { login as authLogin, logout as authLogout } from '@/src/lib/auth';

interface User {
  _id: string;
  id?: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addToFavorites: (productId: string, productModel: string) => Promise<void>;
  removeFromFavorites: (productId: string, productModel: string) => Promise<void>;
  getFavorites: () => Promise<Array<{ _id: string; productId: string; productModel: string }>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserSession = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser._id && parsedUser.id) {
          parsedUser._id = parsedUser.id;
        }
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Kullanıcı oturumu okunurken hata:', error);
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  async function login(email: string, password: string) {
    const loggedInUser = await authLogin({ email, password });
    if (loggedInUser) {
      if (!loggedInUser._id && loggedInUser.id) {
        loggedInUser._id = loggedInUser.id;
      }
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } else {
      throw new Error('Geçersiz e-posta veya şifre');
    }
  }

  function logout() {
    authLogout();
    setUser(null);
    localStorage.removeItem('user');
  }

  const addToFavorites = async (productId: string, productModel: string) => {
    if (!user) {
      throw new Error('Lütfen önce giriş yapın.');
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, productModel }),
    });
    
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Favorilere eklenirken hata oluştu.');
    }
  };

  const removeFromFavorites = async (productId: string, productModel: string) => {
    if (!user) {
      throw new Error('Lütfen önce giriş yapın.');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/favorites/${productId}?productModel=${productModel}`,
      { method: 'DELETE' }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Favorilerden çıkarılırken hata oluştu.');
    }
  };

  const getFavorites = async (): Promise<Array<{ _id: string; productId: string; productModel: string }>> => {
    if (!user) {
      return [];
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/favorites`);
    const result = await response.json();
    
    if (response.ok) {
      return result.data;
    }
    return [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      addToFavorites, 
      removeFromFavorites, 
      getFavorites 
    }}>
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