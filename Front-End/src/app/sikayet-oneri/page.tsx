'use client';

import { useState, FormEvent } from 'react';
import { createFeedback } from '@/data/feedback';
import { isValidComplaint } from '@/data/utils';
import { getCurrentUser } from '@/data/user';

export default function FeedbackPage() {
  const user = getCurrentUser();
  
  const [feedbackType, setFeedbackType] = useState<'complaint' | 'suggestion'>('complaint');
  const [name, setName] = useState(user.isLoggedIn ? user.name : '');
  const [email, setEmail] = useState(user.isLoggedIn ? user.email : '');
  const [phone, setPhone] = useState(user.isLoggedIn && user.phone ? user.phone : '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form doğrula
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Ad Soyad alanı zorunludur';
    }
    
    if (!email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (phone && !/^[0-9]{10,11}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }
    
    if (!subject.trim()) {
      newErrors.subject = 'Konu alanı zorunludur';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Mesaj alanı zorunludur';
    } else if (!isValidComplaint(message)) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form gönderme
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      createFeedback(
        feedbackType,
        name,
        email,
        subject,
        message,
        phone || undefined
      );
      
      setSubmitSuccess(true);
      
      // Formu temizle
      setFeedbackType('complaint');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      
    } catch (error) {
      setSubmitError('Geri bildiriminiz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      setSubmitSuccess(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Şikayet ve Önerileriniz</h1>
      <p className="text-gray-600 mb-8">Şikayet ve önerilerinizi bizimle paylaşabilirsiniz. Geri bildirimleriniz bizim için değerlidir.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {submitSuccess ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Geri Bildiriminiz Alındı!</h2>
              <p className="text-gray-600 mb-6">Geri bildiriminiz tarafımıza ulaşmıştır. En kısa sürede değerlendirilerek sizinle iletişime geçilecektir.</p>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-300"
              >
                Yeni Geri Bildirim Oluştur
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Geri bildirim tipi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Geri Bildirim Tipi</label>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input 
                        id="complaint" 
                        type="radio" 
                        name="feedback-type" 
                        value="complaint"
                        checked={feedbackType === 'complaint'}
                        onChange={() => setFeedbackType('complaint')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="complaint" className="ml-2 text-sm font-medium text-gray-900">
                        Şikayet
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        id="suggestion" 
                        type="radio" 
                        name="feedback-type" 
                        value="suggestion"
                        checked={feedbackType === 'suggestion'}
                        onChange={() => setFeedbackType('suggestion')}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="suggestion" className="ml-2 text-sm font-medium text-gray-900">
                        Öneri
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* İsim ve e-posta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      placeholder="Ad Soyad"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      placeholder="ornek@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
                
                {/* Telefon ve konu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      placeholder="555 123 4567"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Konu *</label>
                    <input 
                      type="text" 
                      id="subject" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`bg-gray-50 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      placeholder="Geri bildirim konusu"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>
                </div>
                
                {/* Mesaj */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız *</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    placeholder="Lütfen geri bildiriminizi detaylı bir şekilde yazınız"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                
                {/* Hata mesajı */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                    {submitError}
                  </div>
                )}
                
                {/* Gönder butonu */}
                <div>
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 w-full md:w-auto"
                  >
                    Gönder
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Sağ sidebar */}
        <div>
          <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-4">İletişim Bilgileri</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <div>
                  <p className="font-medium">Çağrı Merkezi</p>
                  <p className="text-gray-600">+90 212 555 1234</p>
                  <p className="text-sm text-gray-500 mt-1">Hafta içi 09:00 - 18:00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <div>
                  <p className="font-medium">E-posta</p>
                  <p className="text-gray-600">info@mototurk.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div>
                  <p className="font-medium">Merkez Ofis</p>
                  <p className="text-gray-600">Motosiklet Caddesi No:123, İstanbul, Türkiye</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Sık Sorulan Sorular</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Şikayet veya önerimi ne kadar sürede yanıtlarsınız?</h3>
                <p className="text-gray-600 text-sm mt-1">Tüm geri bildirimler en geç 48 saat içerisinde değerlendirilir ve tarafınıza dönüş yapılır.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Sipariş ile ilgili sorunları nasıl bildirebilirim?</h3>
                <p className="text-gray-600 text-sm mt-1">Sipariş numaranızı belirterek bu form üzerinden bildirebilir veya çağrı merkezimizi arayabilirsiniz.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Servis randevusu için nereye başvurmalıyım?</h3>
                <p className="text-gray-600 text-sm mt-1">Servis randevularınız için <a href="/randevu-olustur" className="text-blue-600 hover:text-blue-800">Randevu Oluştur</a> sayfamızı kullanabilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 