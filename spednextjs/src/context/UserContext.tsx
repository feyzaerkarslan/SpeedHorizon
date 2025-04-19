"use client";

import { User, Address } from "@/data/users";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, "id" | "favoriteIds" | "addresses" | "registrationDate" | "emailVerified" | "role">) => Promise<boolean>;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
  updateUserAddress: (address: Address) => Promise<boolean>;
  deleteUserAddress: (addressTitle: string) => Promise<boolean>;
  addToFavorites: (motorcycleId: string) => void;
  removeFromFavorites: (motorcycleId: string) => void;
  isFavorite: (motorcycleId: string) => boolean;
  getDefaultAddress: () => Address | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock API fonksiyonları (gerçek uygulamada API çağrıları olacak)
const mockLogin = async (email: string, password: string): Promise<User | null> => {
  // Simüle edilmiş gecikme
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // users.ts'den kullanıcıları al (gerçek uygulamada API'dan gelecek)
  const { users } = await import('@/data/users');
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Başarılı giriş durumunda son giriş tarihini güncelle
    const updatedUser = {
      ...user,
      lastLoginDate: new Date().toISOString()
    };
    return updatedUser;
  }
  
  return null;
};

const mockRegister = async (userData: Omit<User, "id" | "favoriteIds" | "addresses" | "registrationDate" | "emailVerified" | "role">): Promise<User | null> => {
  // Simüle edilmiş gecikme
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // users.ts'den kullanıcıları al (gerçek uygulamada API'dan gelecek)
  const { users } = await import('@/data/users');
  
  // E-posta zaten kullanımda mı kontrol et
  const emailExists = users.some(u => u.email === userData.email);
  if (emailExists) {
    return null;
  }
  
  // Yeni kullanıcı oluştur
  const newUser: User = {
    ...userData,
    id: `user${users.length + 1}`,
    favoriteIds: [],
    addresses: [],
    registrationDate: new Date().toISOString(),
    emailVerified: false,
    role: "user"
  };
  
  return newUser;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sayfa yüklendiğinde local storage'dan kullanıcı bilgisini al
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("speedhorizon-user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error("Kullanıcı bilgisi yüklenirken hata:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const loggedInUser = await mockLogin(email, password);
      
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem("speedhorizon-user", JSON.stringify(loggedInUser));
        // Başarılı mesaj
        alert("Başarıyla giriş yapıldı");
        return true;
      } else {
        setError("E-posta veya şifre hatalı");
        // Hata mesajı
        alert("E-posta veya şifre hatalı");
        return false;
      }
    } catch (err) {
      setError("Giriş yapılırken bir hata oluştu");
      // Hata mesajı
      alert("Giriş yapılırken bir hata oluştu");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("speedhorizon-user");
    // Başarılı mesaj
    alert("Başarıyla çıkış yapıldı");
  };

  const register = async (userData: Omit<User, "id" | "favoriteIds" | "addresses" | "registrationDate" | "emailVerified" | "role">) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newUser = await mockRegister(userData);
      
      if (newUser) {
        setUser(newUser);
        localStorage.setItem("speedhorizon-user", JSON.stringify(newUser));
        // Başarılı mesaj
        alert("Hesabınız başarıyla oluşturuldu");
        return true;
      } else {
        setError("Bu e-posta adresi zaten kullanımda");
        // Hata mesajı
        alert("Bu e-posta adresi zaten kullanımda");
        return false;
      }
    } catch (err) {
      setError("Kayıt olurken bir hata oluştu");
      // Hata mesajı
      alert("Kayıt olurken bir hata oluştu");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user) {
        setError("Giriş yapılmamış");
        // Hata mesajı
        alert("Giriş yapılmamış");
        return false;
      }
      
      // Kullanıcı bilgilerini güncelle
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("speedhorizon-user", JSON.stringify(updatedUser));
      // Başarılı mesaj
      alert("Profil bilgileriniz başarıyla güncellendi");
      
      return true;
    } catch (err) {
      setError("Profil güncellenirken bir hata oluştu");
      // Hata mesajı
      alert("Profil güncellenirken bir hata oluştu");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUserAddress = async (newAddress: Address) => {
    try {
      if (!user) {
        setError("Giriş yapılmamış");
        // Hata mesajı
        alert("Giriş yapılmamış");
        return false;
      }
      
      // Adresi kontrol et ve güncelle veya ekle
      const existingAddressIndex = user.addresses.findIndex(
        addr => addr.title === newAddress.title
      );
      
      let updatedAddresses;
      
      if (existingAddressIndex >= 0) {
        // Mevcut adresi güncelle
        updatedAddresses = [...user.addresses];
        updatedAddresses[existingAddressIndex] = newAddress;
      } else {
        // Yeni adres ekle
        updatedAddresses = [...user.addresses, newAddress];
      }
      
      // Varsayılan adres ayarlandıysa, diğerlerini varsayılan olmaktan çıkar
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => 
          addr.title !== newAddress.title ? { ...addr, isDefault: false } : addr
        );
      }
      
      const updatedUser = { ...user, addresses: updatedAddresses };
      setUser(updatedUser);
      localStorage.setItem("speedhorizon-user", JSON.stringify(updatedUser));
      // Başarılı mesaj
      alert("Adres bilgileri güncellendi");
      
      return true;
    } catch (err) {
      // Hata mesajı
      alert("Adres güncellenirken bir hata oluştu");
      return false;
    }
  };
  
  const deleteUserAddress = async (addressTitle: string) => {
    try {
      if (!user) {
        // Hata mesajı
        alert("Giriş yapılmamış");
        return false;
      }
      
      // En az bir adres kalmalı
      if (user.addresses.length <= 1) {
        // Hata mesajı
        alert("En az bir adres bulunmalıdır");
        return false;
      }
      
      // Adresi bul ve sil
      const updatedAddresses = user.addresses.filter(
        addr => addr.title !== addressTitle
      );
      
      // Silinen adres varsayılanıdıysa, başka bir adresi varsayılan yap
      if (!updatedAddresses.some(addr => addr.isDefault) && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }
      
      const updatedUser = { ...user, addresses: updatedAddresses };
      setUser(updatedUser);
      localStorage.setItem("speedhorizon-user", JSON.stringify(updatedUser));
      // Başarılı mesaj
      alert("Adres silindi");
      
      return true;
    } catch (err) {
      // Hata mesajı
      alert("Adres silinirken bir hata oluştu");
      return false;
    }
  };

  const addToFavorites = (motorcycleId: string) => {
    if (!user) {
      // Hata mesajı
      alert("Favorilere eklemek için giriş yapmalısınız");
      return;
    }
    
    // Zaten favorilerde mi?
    if (user.favoriteIds.includes(motorcycleId)) {
      // Bilgi mesajı
      alert("Bu ürün zaten favorilerinizde");
      return;
    }
    
    const updatedUser = {
      ...user,
      favoriteIds: [...user.favoriteIds, motorcycleId]
    };
    
    setUser(updatedUser);
    localStorage.setItem("speedhorizon-user", JSON.stringify(updatedUser));
    // Başarılı mesaj
    alert("Ürün favorilerinize eklendi");
  };

  const removeFromFavorites = (motorcycleId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favoriteIds: user.favoriteIds.filter(id => id !== motorcycleId)
    };
    
    setUser(updatedUser);
    localStorage.setItem("speedhorizon-user", JSON.stringify(updatedUser));
    // Başarılı mesaj
    alert("Ürün favorilerinizden çıkarıldı");
  };

  const isFavorite = (motorcycleId: string) => {
    return user ? user.favoriteIds.includes(motorcycleId) : false;
  };
  
  const getDefaultAddress = () => {
    if (!user) return undefined;
    return user.addresses.find(addr => addr.isDefault);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        register,
        updateUserProfile,
        updateUserAddress,
        deleteUserAddress,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getDefaultAddress
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; 