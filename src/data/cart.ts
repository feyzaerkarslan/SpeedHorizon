import { Motorcycle } from './motorcycles';

export interface CartItem extends Motorcycle {
  quantity: number;
}

export class Cart {
  private static items: CartItem[] = [];

  static getItems(): CartItem[] {
    return this.items;
  }

  static addItem(motorcycle: Motorcycle, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.id === motorcycle.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...motorcycle, quantity });
    }
  }

  static removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  static updateQuantity(id: string, quantity: number): void {
    const item = this.items.find(item => item.id === id);
    if (item && quantity > 0) {
      item.quantity = quantity;
    } else if (item && quantity <= 0) {
      this.removeItem(id);
    }
  }

  static clearCart(): void {
    this.items = [];
  }

  static getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      const price = item.discountedPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  }

  static getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  static checkStock(id: string, quantity: number): boolean {
    const item = this.items.find(item => item.id === id);
    return item ? item.stock >= quantity : false;
  }
}

export type PaymentMethod = 'credit_card' | 'cash';

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  date: Date;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  deliveryAddress?: string;
  contactInfo?: {
    name: string;
    phone: string;
    email: string;
  };
}

// Sipariş oluşturma fonksiyonu
export const createOrder = (paymentMethod: PaymentMethod, deliveryAddress?: string, contactInfo?: Order['contactInfo']): Order => {
  const items = Cart.getItems();
  
  if (items.length === 0) {
    throw new Error("Sepet boş! Sipariş oluşturulamaz.");
  }

  const order: Order = {
    id: `ORDER-${Date.now()}`,
    items: [...items],
    totalPrice: Cart.getTotalPrice(),
    paymentMethod,
    date: new Date(),
    status: 'pending',
    deliveryAddress,
    contactInfo
  };

  // Sepeti temizle
  Cart.clearCart();

  return order;
}; 