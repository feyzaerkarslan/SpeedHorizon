export type ReviewType = "product" | "dealer" | "service";
export type ComplaintStatus = "received" | "in-review" | "resolved" | "rejected";

export interface Review {
  id: string;
  userId: string;
  targetId: string; // Motorsiklet, bayi veya servis ID'si
  type: ReviewType;
  rating: number; // 1-5 arası
  title: string;
  content: string;
  createdAt: string; // ISO formatında tarih
  images?: string[]; // Kullanıcının yüklediği görsel URL'leri
  isVerified?: boolean; // Doğrulanmış satın alma mı?
}

export interface Complaint {
  id: string;
  userId: string;
  targetId: string; // Motorsiklet, bayi veya servis ID'si
  type: ReviewType;
  title: string;
  content: string;
  status: ComplaintStatus;
  createdAt: string; // ISO formatında tarih
  response?: {
    content: string;
    createdAt: string;
  };
  images?: string[]; // Kullanıcının yüklediği görsel URL'leri
}

export const reviews: Review[] = [
  {
    id: "rev1",
    userId: "user1",
    targetId: "mt-09",
    type: "product",
    rating: 5,
    title: "Mükemmel Bir Motosiklet",
    content: "MT-09'u 6 aydır kullanıyorum ve gerçekten harika bir deneyim. Motorun gücü, çevikliği ve tasarımı beklentilerimin üzerinde. Şehir içi ve şehirlerarası kullanımda çok keyifli.",
    createdAt: "2024-01-15T10:30:00.000Z",
    isVerified: true
  },
  {
    id: "rev2",
    userId: "user2",
    targetId: "dealer1",
    type: "dealer",
    rating: 4,
    title: "İyi Hizmet",
    content: "Satış danışmanları oldukça bilgili ve yardımcıydı. Tek eksik, teslimat sürecinin biraz uzun sürmesiydi, ama genel olarak memnun kaldım.",
    createdAt: "2024-02-20T14:45:00.000Z"
  }
];

export const complaints: Complaint[] = [
  {
    id: "comp1",
    userId: "user2",
    targetId: "dealer2",
    type: "service",
    title: "Bakım Sürecinde Gecikme",
    content: "Motosikletimi 10.000 km bakımı için bıraktım, 1 gün teslim edileceği söylendi ancak 4 gün sonra teslim edildi. Bu süreçte yeterli bilgilendirme yapılmadı.",
    status: "resolved",
    createdAt: "2024-03-10T09:15:00.000Z",
    response: {
      content: "Yaşadığınız olumsuz deneyim için özür dileriz. Bakım sürecinizde beklenmedik parça tedarik sorunları yaşanmıştır. Bu durumun tekrarlanmaması için süreçlerimizi gözden geçirdik. Anlayışınız için teşekkür ederiz.",
      createdAt: "2024-03-12T13:20:00.000Z"
    }
  }
]; 