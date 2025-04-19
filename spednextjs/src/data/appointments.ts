export type AppointmentType = "test-ride" | "service" | "consultation";
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  userId: string;
  dealerId: string;
  motorcycleId?: string; // Test sürüşü randevusu için
  type: AppointmentType;
  date: string; // ISO formatında tarih
  time: string; // "10:30" formatında saat
  status: AppointmentStatus;
  notes?: string;
  createdAt: string; // ISO formatında tarih
}

export const appointments: Appointment[] = [
  {
    id: "app1",
    userId: "user1",
    dealerId: "dealer1",
    motorcycleId: "yzf-r1",
    type: "test-ride",
    date: "2024-05-15",
    time: "14:30",
    status: "confirmed",
    notes: "İlk kez süper sport deneyecek, bilgilendirme yapılmalı.",
    createdAt: "2024-05-02T09:45:00.000Z"
  },
  {
    id: "app2",
    userId: "user2",
    dealerId: "dealer2",
    type: "service",
    date: "2024-05-10",
    time: "10:00",
    status: "pending",
    notes: "10.000 km bakımı yapılacak, yağ ve filtre değişimi.",
    createdAt: "2024-05-01T15:20:00.000Z"
  }
]; 