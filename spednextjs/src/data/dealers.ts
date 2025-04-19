export interface Dealer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  location: {
    lat: number;
    lng: number;
  };
  openingHours: string;
  services: string[]; // "sales", "service", "parts", "accessories" gibi
  city: string;
  region: string;
  rating?: number; // 5 üzerinden
  images: string[];
}

export const dealers: Dealer[] = [
  {
    id: "dealer1",
    name: "SpeedHorizon Plaza İstanbul",
    address: "Bağdat Caddesi No: 152 Kadıköy, İstanbul",
    phone: "0216 123 45 67",
    email: "istanbulspeedhorizon@example.com",
    website: "https://www.speedhorizonplazaistanbul.com",
    location: {
      lat: 40.9632,
      lng: 29.0638
    },
    openingHours: "Hafta içi: 09:00-18:00, Cumartesi: 09:00-16:00",
    services: ["sales", "service", "parts", "accessories", "test-ride"],
    city: "İstanbul",
    region: "Marmara",
    rating: 4.7,
    images: ["/images/dealer1-1.jpg", "/images/dealer1-2.jpg"]
  },
  {
    id: "dealer2",
    name: "SpeedHorizon Motor Ankara",
    address: "Çankaya Bulvarı No: 76 Çankaya, Ankara",
    phone: "0312 987 65 43",
    email: "ankaraspeedhorizon@example.com",
    website: "https://www.speedhorizonmotoankara.com",
    location: {
      lat: 39.9208,
      lng: 32.8541
    },
    openingHours: "Hafta içi: 08:30-18:30, Cumartesi: 09:00-17:00",
    services: ["sales", "service", "parts"],
    city: "Ankara",
    region: "İç Anadolu",
    rating: 4.5,
    images: ["/images/dealer2-1.jpg", "/images/dealer2-2.jpg"]
  },
  {
    id: "dealer3",
    name: "SpeedHorizon Center İzmir",
    address: "Mustafa Kemal Sahil Bulvarı No: 218 Konak, İzmir",
    phone: "0232 456 78 90",
    email: "izmirspeedhorizon@example.com",
    location: {
      lat: 38.4237,
      lng: 27.1428
    },
    openingHours: "Hafta içi: 09:00-19:00, Cumartesi-Pazar: 10:00-16:00",
    services: ["sales", "service", "parts", "accessories", "test-ride", "rental"],
    city: "İzmir",
    region: "Ege",
    rating: 4.8,
    images: ["/images/dealer3-1.jpg", "/images/dealer3-2.jpg"]
  }
]; 