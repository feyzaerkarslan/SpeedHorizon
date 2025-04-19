export interface Feedback {
  id: string;
  type: 'complaint' | 'suggestion';
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: Date;
  status: 'pending' | 'reviewing' | 'resolved';
  response?: {
    message: string;
    date: Date;
  };
}

// Örnek geri bildirimler
let feedbacks: Feedback[] = [
  {
    id: 'fb-1',
    type: 'complaint',
    name: 'Ali Demir',
    email: 'ali@example.com',
    phone: '5551112233',
    subject: 'Geç Teslimat',
    message: 'Sipariş ettiğim motosiklet aksesuar ürünleri belirtilen tarihten 1 hafta sonra teslim edildi.',
    date: new Date('2023-10-20'),
    status: 'resolved',
    response: {
      message: 'Sayın Ali Demir, yaşadığınız gecikmeden dolayı özür dileriz. Teslimat süreçlerimizi iyileştirmek için çalışıyoruz. Bir sonraki siparişinizde %10 indirim kuponu hesabınıza tanımlanmıştır.',
      date: new Date('2023-10-22')
    }
  },
  {
    id: 'fb-2',
    type: 'suggestion',
    name: 'Ayşe Yıldız',
    email: 'ayse@example.com',
    subject: 'Online Randevu Sistemi',
    message: 'Servis randevuları için mobil uygulama olsa çok daha kolay olurdu. Ayrıca randevu hatırlatma mesajı gönderilmesi de faydalı olacaktır.',
    date: new Date('2023-10-25'),
    status: 'reviewing'
  }
];

// Yeni şikayet/öneri oluştur
export const createFeedback = (
  type: Feedback['type'],
  name: string,
  email: string,
  subject: string,
  message: string,
  phone?: string
): Feedback => {
  const newFeedback: Feedback = {
    id: `fb-${Date.now()}`,
    type,
    name,
    email,
    phone,
    subject,
    message,
    date: new Date(),
    status: 'pending'
  };
  
  feedbacks.push(newFeedback);
  return newFeedback;
};

// Tüm geri bildirimleri getir
export const getAllFeedbacks = (): Feedback[] => {
  return [...feedbacks];
};

// Kullanıcının geri bildirimlerini getir
export const getUserFeedbacks = (email: string): Feedback[] => {
  return feedbacks.filter(fb => fb.email === email);
};

// Geri bildirimi güncelle
export const updateFeedback = (id: string, updates: Partial<Feedback>): Feedback | null => {
  const feedbackIndex = feedbacks.findIndex(fb => fb.id === id);
  
  if (feedbackIndex !== -1) {
    feedbacks[feedbackIndex] = {
      ...feedbacks[feedbackIndex],
      ...updates
    };
    return feedbacks[feedbackIndex];
  }
  
  return null;
};

// Geri bildirime yanıt ver
export const respondToFeedback = (id: string, responseMessage: string): Feedback | null => {
  const feedbackIndex = feedbacks.findIndex(fb => fb.id === id);
  
  if (feedbackIndex !== -1) {
    feedbacks[feedbackIndex] = {
      ...feedbacks[feedbackIndex],
      status: 'resolved',
      response: {
        message: responseMessage,
        date: new Date()
      }
    };
    return feedbacks[feedbackIndex];
  }
  
  return null;
};

// Geri bildirimi sil
export const deleteFeedback = (id: string): boolean => {
  const initialLength = feedbacks.length;
  feedbacks = feedbacks.filter(fb => fb.id !== id);
  return feedbacks.length < initialLength;
}; 