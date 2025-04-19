import { Motorcycle } from './motorcycles';

// Para birimi formatı
export const formatCurrency = (price: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price);
};

// Tarih formatı
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

// Stok durumu kontrol
export const getStockStatus = (stock: number): 'Stokta Var' | 'Sınırlı Stok' | 'Stokta Yok' => {
  if (stock <= 0) return 'Stokta Yok';
  if (stock < 5) return 'Sınırlı Stok';
  return 'Stokta Var';
};

// Stok durum rengini belirle
export const getStockStatusColor = (stock: number): string => {
  if (stock <= 0) return 'text-red-500';
  if (stock < 5) return 'text-amber-500';
  return 'text-green-500';
};

// İndirim yüzdesi hesaplama
export const calculateDiscountPercentage = (price: number, discountedPrice: number): number => {
  return Math.round(((price - discountedPrice) / price) * 100);
};

// Taksit tutarı hesaplama
export const calculateInstallmentAmount = (price: number, installment: number): number => {
  return price / installment;
};

// Arama sonuçlarını filtreleme
export const searchMotorcycles = (motorcycles: Motorcycle[], searchTerm: string): Motorcycle[] => {
  const term = searchTerm.toLowerCase().trim();
  
  if (!term) return motorcycles;
  
  return motorcycles.filter(motorcycle => 
    motorcycle.name.toLowerCase().includes(term) || 
    motorcycle.description.toLowerCase().includes(term) ||
    motorcycle.category.toLowerCase().includes(term) ||
    motorcycle.color.toLowerCase().includes(term)
  );
};

// Siparişi gerçekleştirmek için stok bilgisini kontrol et
export const checkOrderStockAvailability = (motorcycles: Motorcycle[], orderItems: { id: string, quantity: number }[]): boolean => {
  return orderItems.every(item => {
    const motorcycle = motorcycles.find(m => m.id === item.id);
    return motorcycle ? motorcycle.stock >= item.quantity : false;
  });
};

// Şikayet ve öneriler için geçerli bir input olup olmadığını kontrol et
export const isValidComplaint = (text: string): boolean => {
  return text.trim().length >= 10;
};

// Şifre değerlendirme 
export const evaluatePasswordStrength = (password: string): 'zayıf' | 'orta' | 'güçlü' => {
  if (password.length < 6) return 'zayıf';
  
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  if (strength < 2) return 'zayıf';
  if (strength < 4) return 'orta';
  return 'güçlü';
};

// Randevu saatleri oluştur
export const generateAppointmentHours = (): string[] => {
  const hours = [];
  for (let i = 9; i <= 17; i++) {
    hours.push(`${i}:00`);
    if (i !== 17) hours.push(`${i}:30`);
  }
  return hours;
};

// URL-friendly string oluştur (slug)
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}; 