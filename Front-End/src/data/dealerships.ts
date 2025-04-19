export interface Dealership {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  location: {
    lat: number;
    lng: number;
  };
  isServiceCenter: boolean;
}

export const dealerships: Dealership[] = [
  {
    id: "1",
    name: "Moto Center İstanbul",
    city: "İstanbul",
    address: "Bağdat Caddesi No: 123, Kadıköy, İstanbul",
    phone: "0212 555 1234",
    email: "info@motocenteristanbul.com",
    workingHours: {
      weekdays: "09:00 - 18:00",
      saturday: "10:00 - 16:00",
      sunday: "Kapalı"
    },
    services: ["Satış", "Servis", "Yedek Parça", "Aksesuar"],
    location: {
      lat: 40.9767,
      lng: 29.0579
    },
    isServiceCenter: true
  },
  {
    id: "2",
    name: "Moto Pro Ankara",
    city: "Ankara",
    address: "Tunalı Hilmi Caddesi No: 45, Çankaya, Ankara",
    phone: "0312 444 5678",
    email: "info@motoproankara.com",
    workingHours: {
      weekdays: "09:00 - 18:00",
      saturday: "10:00 - 15:00",
      sunday: "Kapalı"
    },
    services: ["Satış", "Servis", "Yedek Parça"],
    location: {
      lat: 39.9097,
      lng: 32.8573
    },
    isServiceCenter: true
  },
  {
    id: "3",
    name: "Motosport İzmir",
    city: "İzmir",
    address: "Alsancak Kordon Boyu No: 78, Konak, İzmir",
    phone: "0232 333 9876",
    email: "info@motosportizmir.com",
    workingHours: {
      weekdays: "09:30 - 18:30",
      saturday: "10:00 - 16:00",
      sunday: "Kapalı"
    },
    services: ["Satış", "Servis", "Aksesuar"],
    location: {
      lat: 38.4237,
      lng: 27.1428
    },
    isServiceCenter: true
  },
  {
    id: "4",
    name: "Moto Plus Antalya",
    city: "Antalya",
    address: "Lara Caddesi No: 321, Muratpaşa, Antalya",
    phone: "0242 777 5544",
    email: "info@motoplusantalya.com",
    workingHours: {
      weekdays: "09:00 - 19:00",
      saturday: "10:00 - 17:00",
      sunday: "11:00 - 15:00"
    },
    services: ["Satış", "Yedek Parça", "Aksesuar"],
    location: {
      lat: 36.8969,
      lng: 30.7133
    },
    isServiceCenter: false
  },
  {
    id: "5",
    name: "MotoBike Bursa",
    city: "Bursa",
    address: "Altıparmak Caddesi No: 56, Osmangazi, Bursa",
    phone: "0224 666 3322",
    email: "info@motobikebursa.com",
    workingHours: {
      weekdays: "09:00 - 18:00",
      saturday: "10:00 - 15:00",
      sunday: "Kapalı"
    },
    services: ["Satış", "Servis", "Yedek Parça", "Aksesuar"],
    location: {
      lat: 40.1885,
      lng: 29.0610
    },
    isServiceCenter: true
  }
];

export const getServiceCenters = (): Dealership[] => {
  return dealerships.filter(dealership => dealership.isServiceCenter);
};

export const getDealershipsByCity = (city: string): Dealership[] => {
  return dealerships.filter(dealership => 
    dealership.city.toLowerCase() === city.toLowerCase()
  );
};

export const findNearestDealership = (userLat: number, userLng: number): Dealership => {
  let nearestDealership = dealerships[0];
  let nearestDistance = calculateDistance(
    userLat, userLng, 
    dealerships[0].location.lat, dealerships[0].location.lng
  );
  
  for (let i = 1; i < dealerships.length; i++) {
    const distance = calculateDistance(
      userLat, userLng,
      dealerships[i].location.lat, dealerships[i].location.lng
    );
    
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestDealership = dealerships[i];
    }
  }
  
  return nearestDealership;
};

// İki nokta arasındaki mesafeyi hesapla (Haversine formülü)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Dünya yarıçapı (km)
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI/180);
}; 