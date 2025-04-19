import { Order } from './cart';
import { Motorcycle } from './motorcycles';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  favorites: string[];
  orders: Order[];
  isLoggedIn: boolean;
}

// Örnek olarak varsayılan kullanıcı
let currentUser: User = {
  id: '',
  name: '',
  email: '',
  favorites: [],
  orders: [],
  isLoggedIn: false
};

export const getCurrentUser = (): User => {
  return currentUser;
};

export const login = (email: string, password: string): boolean => {
  // Gerçek uygulamada burada API çağrısı yapılır
  // Örnek için basit bir doğrulama
  if (email === 'demo@example.com' && password === 'password') {
    currentUser = {
      id: 'user1',
      name: 'Demo Kullanıcı',
      email: 'demo@example.com',
      phone: '555-123-4567',
      address: 'İstanbul, Türkiye',
      favorites: ['1', '3'],
      orders: [],
      isLoggedIn: true
    };
    return true;
  }
  return false;
};

export const register = (name: string, email: string, password: string, phone?: string, address?: string): User => {
  // Gerçek uygulamada burada API çağrısı yapılır
  currentUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    phone,
    address,
    favorites: [],
    orders: [],
    isLoggedIn: true
  };
  return currentUser;
};

export const logout = (): void => {
  currentUser = {
    id: '',
    name: '',
    email: '',
    favorites: [],
    orders: [],
    isLoggedIn: false
  };
};

export const addToFavorites = (motorcycleId: string): void => {
  if (!currentUser.favorites.includes(motorcycleId)) {
    currentUser.favorites.push(motorcycleId);
  }
};

export const removeFromFavorites = (motorcycleId: string): void => {
  currentUser.favorites = currentUser.favorites.filter(id => id !== motorcycleId);
};

export const isFavorite = (motorcycleId: string): boolean => {
  return currentUser.favorites.includes(motorcycleId);
};

export const getFavorites = (allMotorcycles: Motorcycle[]): Motorcycle[] => {
  return allMotorcycles.filter(motorcycle => currentUser.favorites.includes(motorcycle.id));
};

export const addOrder = (order: Order): void => {
  currentUser.orders.unshift(order);
};

export const getOrders = (): Order[] => {
  return currentUser.orders;
};

export const updateUserProfile = (name: string, phone?: string, address?: string): User => {
  currentUser.name = name;
  if (phone) currentUser.phone = phone;
  if (address) currentUser.address = address;
  return currentUser;
}; 