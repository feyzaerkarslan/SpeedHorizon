'use client';

import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext'; // AuthContext'i varsayıyoruz

// Sepet verileri ve fonksiyonları için tipler
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
  quantity: number;
  productType: 'Motorcycle' | 'Scooter' | 'Accessory' | 'SparePart';
  productModel?: string;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (productId: string, productType: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  cartCount: number;
  totalAmount: number;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); // Oturum açmış kullanıcıyı al
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Orijinal sepet verisini de state'de tutarak productModel'i kaybetmeyelim.
  const [_originalUserCart, setOriginalUserCart] = useState<Array<{ productId: string; productModel: string; quantity: number }>>([]);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setCart([]);
      return;
    }
    setLoading(true);
    try {
      // Önce kullanıcının ham sepet verisini (productId ve productModel ile) alalım
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}`);
      const userData = await userResponse.json();
      if (!userData.success) throw new Error("Kullanıcı verisi alınamadı");
      setOriginalUserCart(userData.data.cart);
      
      const populatedCartResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/cart`);
      const result = await populatedCartResponse.json();

      if (populatedCartResponse.ok) {
        const originalCartMap = new Map(userData.data.cart.map((item: { productId: string; productModel: string }) => [item.productId.toString(), item.productModel]));
        
        const cartWithProductType = result.data.map((item: { _id: string; name: string; price: number; images: string[]; quantity: number }) => ({
          ...item,
          productType: originalCartMap.get(item._id.toString()),
          productModel: originalCartMap.get(item._id.toString()),
        }));
        setCart(cartWithProductType);
      } else {
        toast.error(result.message || 'Sepet yüklenemedi.');
        setCart([]);
      }
    } catch (error) {
      toast.error('Sepet yüklenirken bir hata oluştu.');
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);
  
  const addToCart = async (productId: string, productType: string, quantity = 1) => {
    if (!user) {
      toast.error('Lütfen önce giriş yapın.');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, productModel: productType, quantity }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Ürün sepete eklendi!');
        await fetchCart();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ürün sepete eklenemedi.';
      toast.error(errorMessage);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/cart/${productId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Ürün sepetten çıkarıldı.');
        await fetchCart();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ürün sepetten çıkarılamadı.';
      toast.error(errorMessage);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) {
      toast.error('Lütfen önce giriş yapın.');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/cart/${productId}/quantity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Ürün miktarı güncellendi!');
        await fetchCart();
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ürün miktarı güncellenemedi.';
      toast.error(errorMessage);
    }
  };

  const clearCart = useCallback(async () => {
    if (!user) {
      toast.error('Lütfen önce giriş yapın.');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}/cart/clear`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Sepetiniz başarıyla temizlendi.');
        setCart([]);
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Sepet temizlenirken bir hata oluştu.';
      toast.error(errorMessage);
    }
  }, [user]);

  const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
  const totalAmount = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalAmount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 