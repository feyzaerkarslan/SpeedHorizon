export interface Motorcycle {
  id: string;
  name: string;
  category: 'Motor' | 'Scooter' | 'YedekParca' | 'Aksesuar';
  price: number;
  discountedPrice?: number;
  image: string;
  power?: string;
  color: string;
  stock: number;
  description: string;
  specs?: {
    [key: string]: string;
  };
  installmentOptions?: number[];
  isFavorite?: boolean;
}

export const motorcycles: Motorcycle[] = [
  {
    id: "1",
    name: "YZF-R1",
    category: "Motor",
    price: 850000,
    image: "/images/yzf-r1.jpg",
    power: "200 HP",
    color: "Mavi",
    stock: 5,
    description: "YZF-R1, Yamaha'nın yarış teknolojilerini yollara taşıyan süper spor motosikletidir.",
    specs: {
      motor: "998 cc, sıvı soğutmalı, 4 zamanlı, DOHC, 4 valf",
      şanzıman: "6 vitesli",
      ağırlık: "200 kg",
      yakıtTankı: "17 litre"
    },
    installmentOptions: [3, 6, 9, 12]
  },
  {
    id: "2",
    name: "MT-09",
    category: "Motor",
    price: 550000,
    image: "/images/mt-09.jpg",
    power: "115 HP",
    color: "Siyah",
    stock: 3,
    description: "MT-09, yüksek tork değeri ve çevik yapısıyla şehir içi ve şehir dışı sürüşlerin favorisidir.",
    specs: {
      motor: "889 cc, sıvı soğutmalı, 4 zamanlı, DOHC, 4 valf",
      şanzıman: "6 vitesli",
      ağırlık: "189 kg",
      yakıtTankı: "14 litre"
    },
    installmentOptions: [3, 6, 9, 12]
  },
  {
    id: "3",
    name: "XMAX 300",
    category: "Scooter",
    price: 350000,
    discountedPrice: 320000,
    image: "/images/xmax-300.jpg",
    power: "28 HP",
    color: "Gri",
    stock: 7,
    description: "XMAX 300, şehir içi ulaşımda konfor ve performansı bir arada sunan premium scooter modelidir.",
    specs: {
      motor: "292 cc, sıvı soğutmalı, 4 zamanlı, SOHC, 4 valf",
      şanzıman: "Otomatik",
      ağırlık: "179 kg",
      yakıtTankı: "13 litre"
    },
    installmentOptions: [3, 6, 9, 12]
  },
  {
    id: "4",
    name: "Tracer 9 GT",
    category: "Motor",
    price: 650000,
    image: "/images/tracer-9.jpg",
    power: "119 HP",
    color: "Kırmızı",
    stock: 2,
    description: "Tracer 9 GT, uzun yolculuklar için tasarlanmış, konforlu ve performanslı bir sport touring motosikletidir.",
    specs: {
      motor: "889 cc, sıvı soğutmalı, 4 zamanlı, DOHC, 4 valf",
      şanzıman: "6 vitesli",
      ağırlık: "213 kg",
      yakıtTankı: "18 litre"
    },
    installmentOptions: [3, 6, 9, 12]
  },
  {
    id: "5",
    name: "NMAX 125",
    category: "Scooter",
    price: 180000,
    image: "/images/nmax-125.jpg",
    power: "12 HP",
    color: "Beyaz",
    stock: 10,
    description: "NMAX 125, şehir içi ulaşımda ekonomik ve pratik bir çözüm sunan scooter modelidir.",
    specs: {
      motor: "125 cc, sıvı soğutmalı, 4 zamanlı, SOHC, 4 valf",
      şanzıman: "Otomatik",
      ağırlık: "131 kg",
      yakıtTankı: "7.1 litre"
    },
    installmentOptions: [3, 6, 9]
  },
  {
    id: "6",
    name: "Motor Yağı",
    category: "YedekParca",
    price: 1200,
    image: "/images/motor-yagi.jpg",
    color: "Sarı",
    stock: 50,
    description: "Yüksek performanslı 4 zamanlı motor yağı, motosiklet motorunuzun optimal performansta çalışmasını sağlar."
  },
  {
    id: "7",
    name: "Egzoz Sistemi",
    category: "YedekParca",
    price: 15000,
    discountedPrice: 12500,
    image: "/images/egzoz.jpg",
    color: "Metal",
    stock: 8,
    description: "Akrapovic titanyum egzoz sistemi, hem performans artışı sağlar hem de daha güçlü bir ses verir."
  },
  {
    id: "8",
    name: "Motosiklet Kaskı",
    category: "Aksesuar",
    price: 5000,
    image: "/images/kask.jpg",
    color: "Siyah",
    stock: 15,
    description: "Yüksek güvenlik standartlarına sahip, aerodinamik tasarımlı tam yüz motosiklet kaskı."
  },
  {
    id: "9",
    name: "Motosiklet Montu",
    category: "Aksesuar",
    price: 7500,
    image: "/images/mont.jpg",
    color: "Siyah/Kırmızı",
    stock: 12,
    description: "Su geçirmez, darbeye dayanıklı, kış ve yaz kullanımına uygun motosiklet montu."
  },
  {
    id: "10",
    name: "Motosiklet Eldiveni",
    category: "Aksesuar",
    price: 1500,
    discountedPrice: 1200,
    image: "/images/eldiven.jpg",
    color: "Siyah",
    stock: 20,
    description: "Dokunmatik ekran uyumlu, darbe emici ve hava alabilen motosiklet eldiveni."
  }
];

export const getMotorcyclesByCategory = (category: Motorcycle['category']) => {
  return motorcycles.filter(motorcycle => motorcycle.category === category);
};

export const getMotorcycleById = (id: string) => {
  return motorcycles.find(motorcycle => motorcycle.id === id);
};

export const filterMotorcyclesByPower = (minPower: number, maxPower: number) => {
  return motorcycles.filter(motorcycle => {
    if (!motorcycle.power) return false;
    const powerNumber = parseInt(motorcycle.power.split(' ')[0]);
    return powerNumber >= minPower && powerNumber <= maxPower;
  });
};

export const filterMotorcyclesByColor = (color: string) => {
  return motorcycles.filter(motorcycle => motorcycle.color.toLowerCase() === color.toLowerCase());
};

export const filterMotorcyclesByPrice = (minPrice: number, maxPrice: number) => {
  return motorcycles.filter(motorcycle => {
    const price = motorcycle.discountedPrice || motorcycle.price;
    return price >= minPrice && price <= maxPrice;
  });
};

export const getDiscountedMotorcycles = () => {
  return motorcycles.filter(motorcycle => motorcycle.discountedPrice);
}; 