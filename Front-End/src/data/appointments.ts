import { generateAppointmentHours } from './utils';
import { Dealership } from './dealerships';

export interface Appointment {
  id: string;
  dealershipId: string;
  motorcycle?: {
    brand: string;
    model: string;
    year: number;
    plate?: string;
  };
  date: Date;
  time: string;
  name: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  notes?: string;
  status: AppointmentStatus;
}

export type ServiceType = 
  | 'Periyodik Bakım'
  | 'Arıza Tespiti'
  | 'Mekanik Onarım'
  | 'Elektrik/Elektronik Onarım'
  | 'Lastik Değişimi'
  | 'Akü Değişimi'
  | 'Yağ Değişimi'
  | 'Test Sürüşü'
  | 'Diğer';

export type AppointmentStatus = 
  | 'Bekliyor'
  | 'Onaylandı'
  | 'İptal Edildi'
  | 'Tamamlandı';

// Örnek randevular
export const appointments: Appointment[] = [
  {
    id: 'appt-1',
    dealershipId: '1',
    motorcycle: {
      brand: 'Yamaha',
      model: 'YZF-R1',
      year: 2022,
      plate: '34ABC123'
    },
    date: new Date('2023-11-15'),
    time: '10:00',
    name: 'Ahmet Yılmaz',
    phone: '5551234567',
    email: 'ahmet@example.com',
    serviceType: 'Periyodik Bakım',
    notes: 'Motor yağ değişimi ve genel kontrol',
    status: 'Onaylandı'
  },
  {
    id: 'appt-2',
    dealershipId: '2',
    motorcycle: {
      brand: 'Yamaha',
      model: 'MT-09',
      year: 2021,
      plate: '06DEF456'
    },
    date: new Date('2023-11-18'),
    time: '14:30',
    name: 'Mehmet Kaya',
    phone: '5559876543',
    email: 'mehmet@example.com',
    serviceType: 'Arıza Tespiti',
    notes: 'Motor çalışırken anormal ses yapıyor',
    status: 'Bekliyor'
  }
];

let userAppointments: Appointment[] = [];

// Yeni randevu oluştur
export const createAppointment = (
  dealershipId: string,
  date: Date,
  time: string,
  name: string,
  phone: string,
  email: string,
  serviceType: ServiceType,
  motorcycle?: Appointment['motorcycle'],
  notes?: string
): Appointment => {
  const newAppointment: Appointment = {
    id: `appt-${Date.now()}`,
    dealershipId,
    motorcycle,
    date,
    time,
    name,
    phone,
    email,
    serviceType,
    notes,
    status: 'Bekliyor'
  };
  
  userAppointments.push(newAppointment);
  return newAppointment;
};

// Kullanıcının randevularını getir
export const getUserAppointments = (): Appointment[] => {
  return [...userAppointments];
};

// Randevu iptal et
export const cancelAppointment = (appointmentId: string): boolean => {
  const appointmentIndex = userAppointments.findIndex(a => a.id === appointmentId);
  
  if (appointmentIndex !== -1) {
    userAppointments[appointmentIndex].status = 'İptal Edildi';
    return true;
  }
  
  return false;
};

// Randevu güncelle
export const updateAppointment = (appointmentId: string, updates: Partial<Appointment>): Appointment | null => {
  const appointmentIndex = userAppointments.findIndex(a => a.id === appointmentId);
  
  if (appointmentIndex !== -1) {
    userAppointments[appointmentIndex] = {
      ...userAppointments[appointmentIndex],
      ...updates
    };
    return userAppointments[appointmentIndex];
  }
  
  return null;
};

// Belirli bir tarih için mevcut randevu saatlerini getir
export const getAvailableAppointmentHours = (dealershipId: string, date: Date): string[] => {
  const allHours = generateAppointmentHours();
  const dateString = date.toISOString().split('T')[0];
  
  // Aynı bayi ve tarihte olan randevuların saatlerini bul
  const bookedHours = userAppointments
    .filter(a => 
      a.dealershipId === dealershipId && 
      a.date.toISOString().split('T')[0] === dateString &&
      a.status !== 'İptal Edildi'
    )
    .map(a => a.time);
  
  // Mevcut saatleri filtrele
  return allHours.filter(hour => !bookedHours.includes(hour));
};

// Randevu saati mevcut mu kontrol et
export const isAppointmentTimeAvailable = (dealershipId: string, date: Date, time: string): boolean => {
  const availableHours = getAvailableAppointmentHours(dealershipId, date);
  return availableHours.includes(time);
}; 