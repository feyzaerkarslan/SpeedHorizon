export interface Address {
  title: string; // Ev, İş gibi
  fullName: string;
  address: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string; // Gerçek uygulamada hash'lenmiş olmalı
  favoriteIds: string[]; // Favori motorsikletlerin id'leri
  addresses: Address[];
  registrationDate: string; // ISO formatında tarih
  lastLoginDate?: string; // ISO formatında tarih
  avatar?: string; // Profil resmi URL'si
  emailVerified: boolean;
  role: "user" | "admin";
}

export const users: User[] = [
  {
    id: "user1",
    name: "Ahmet",
    surname: "Yılmaz",
    email: "ahmet@example.com",
    phone: "05321234567",
    password: "1234", // Gerçek uygulamada güvenli bir şekilde saklanmalı
    favoriteIds: ["yzf-r1", "mt-09"],
    addresses: [
      {
        title: "Ev",
        fullName: "Ahmet Yılmaz",
        address: "Atatürk Cad. No: 123",
        city: "İstanbul",
        state: "Kadıköy",
        zipCode: "34000",
        country: "Türkiye",
        phone: "05321234567",
        isDefault: true
      },
      {
        title: "İş",
        fullName: "Ahmet Yılmaz",
        address: "Büyükdere Cad. No: 45 Kat: 8",
        city: "İstanbul",
        state: "Şişli",
        zipCode: "34394",
        country: "Türkiye",
        phone: "05321234567",
        isDefault: false
      }
    ],
    registrationDate: "2023-10-15T08:30:00.000Z",
    lastLoginDate: "2024-05-12T10:15:00.000Z",
    avatar: "/avatars/ahmet.jpg",
    emailVerified: true,
    role: "user"
  },
  {
    id: "user2",
    name: "Mehmet",
    surname: "Kaya",
    email: "mehmet@example.com",
    phone: "05331234567",
    password: "1234",
    favoriteIds: ["tenere-700"],
    addresses: [
      {
        title: "Ev",
        fullName: "Mehmet Kaya",
        address: "Cumhuriyet Mah. 1453 Sok. No: 7",
        city: "Ankara",
        state: "Çankaya",
        zipCode: "06420",
        country: "Türkiye",
        phone: "05331234567",
        isDefault: true
      }
    ],
    registrationDate: "2024-01-05T14:20:00.000Z",
    lastLoginDate: "2024-05-10T16:45:00.000Z",
    emailVerified: true,
    role: "user"
  },
  {
    id: "admin1",
    name: "Admin",
    surname: "Kullanıcı",
    email: "admin@speedhorizon.com",
    phone: "05401234567",
    password: "admin1234",
    favoriteIds: [],
    addresses: [
      {
        title: "Merkez",
        fullName: "SpeedHorizon Motorsiklet",
        address: "SpeedHorizon Plaza, Merkez Mah. Motor Cad. No: 1",
        city: "İstanbul",
        state: "Şişli",
        zipCode: "34100",
        country: "Türkiye",
        phone: "02121234567",
        isDefault: true
      }
    ],
    registrationDate: "2023-01-01T00:00:00.000Z",
    lastLoginDate: "2024-05-12T09:00:00.000Z",
    avatar: "/avatars/admin.jpg",
    emailVerified: true,
    role: "admin"
  }
]; 