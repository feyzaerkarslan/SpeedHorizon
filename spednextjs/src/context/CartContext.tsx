"use client";

import { Motorcycle } from "@/data/motorcycles";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
  motorcycle: Motorcycle;
  quantity: number;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (motorcycle: Motorcycle, quantity?: number, selectedColor?: string) => void;
  removeItem: (motorcycleId: string) => void;
  updateQuantity: (motorcycleId: string, quantity: number) => void;
  updateColor: (motorcycleId: string, color: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isItemInCart: (motorcycleId: string) => boolean;
  getDiscountedTotal: () => number;
  getSavingsAmount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Lokal depolamadan sepeti yükleme fonksiyonu
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }
  
  try {
    const savedCart = localStorage.getItem("speedhorizon-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Sepet yüklenirken hata:", error);
    return [];
  }
};

// Sepeti lokal depolamaya kaydetme fonksiyonu
const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("speedhorizon-cart", JSON.stringify(items));
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Sayfa yüklendiğinde sepeti lokal depolamadan yükle
  useEffect(() => {
    setItems(loadCartFromStorage());
  }, []);
  
  // Sepet değiştiğinde lokal depolamaya kaydet
  useEffect(() => {
    if (items.length > 0) {
      saveCartToStorage(items);
    }
  }, [items]);

  const addItem = (motorcycle: Motorcycle, quantity = 1, selectedColor?: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.motorcycle.id === motorcycle.id
      );

      if (existingItem) {
        // Limit the quantity to the available stock
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          motorcycle.stock
        );
        
        return prevItems.map((item) =>
          item.motorcycle.id === motorcycle.id
            ? { 
                ...item, 
                quantity: newQuantity,
                selectedColor: selectedColor || item.selectedColor
              }
            : item
        );
      } else {
        // Add new item with specified quantity
        return [...prevItems, { 
          motorcycle, 
          quantity: Math.min(quantity, motorcycle.stock),
          selectedColor: selectedColor || motorcycle.colors[0]
        }];
      }
    });
  };

  const removeItem = (motorcycleId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.motorcycle.id !== motorcycleId);
      if (newItems.length === 0) {
        // Sepet boşsa lokal depolamadan da sil
        localStorage.removeItem("speedhorizon-cart");
      }
      return newItems;
    });
  };

  const updateQuantity = (motorcycleId: string, quantity: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.motorcycle.id === motorcycleId) {
          // Ensure quantity is valid
          const validQuantity = Math.max(
            1,
            Math.min(quantity, item.motorcycle.stock)
          );
          return { ...item, quantity: validQuantity };
        }
        return item;
      });
    });
  };
  
  const updateColor = (motorcycleId: string, color: string) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.motorcycle.id === motorcycleId) {
          return { ...item, selectedColor: color };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("speedhorizon-cart");
  };
  
  const isItemInCart = (motorcycleId: string) => {
    return items.some(item => item.motorcycle.id === motorcycleId);
  };
  
  // İndirimli toplam fiyat hesapla
  const getDiscountedTotal = () => {
    return items.reduce((sum, item) => {
      const price = item.motorcycle.price;
      const discount = item.motorcycle.discount || 0;
      const discountedPrice = price - (price * discount / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);
  };
  
  // Toplam tasarruf miktarını hesapla
  const getSavingsAmount = () => {
    return totalPrice - getDiscountedTotal();
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.motorcycle.price * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateColor,
        clearCart,
        totalPrice,
        totalItems,
        isItemInCart,
        getDiscountedTotal,
        getSavingsAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 