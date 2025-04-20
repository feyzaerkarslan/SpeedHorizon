'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { dealerships } from '@/data/dealerships';
import { createAppointment, ServiceType, isAppointmentTimeAvailable, getAvailableAppointmentHours } from '@/data/appointments';
import { generateAppointmentHours } from '@/data/utils';
import { getCurrentUser } from '@/data/user';

export default function AppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = getCurrentUser();
  
  // URL'den bayi parametresi al
  const urlDealershipId = searchParams.get('dealership');
  
  // Form state
  const [dealershipId, setDealershipId] = useState(urlDealershipId || '');
  const [name, setName] = useState(user.isLoggedIn ? user.name : '');
  const [phone, setPhone] = useState(user.isLoggedIn && user.phone ? user.phone : '');
  const [email, setEmail] = useState(user.isLoggedIn ? user.email : '');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [serviceType, setServiceType] = useState<ServiceType>('Periyodik Bakım');
  const [motorcycleBrand, setMotorcycleBrand] = useState<string>('Yamaha');
  const [motorcycleModel, setMotorcycleModel] = useState<string>('');
  const [motorcycleYear, setMotorcycleYear] = useState<string>(new Date().getFullYear().toString());
  const [motorcyclePlate, setMotorcyclePlate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  
  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Hizmet tipleri
  const serviceTypes: ServiceType[] = [
    'Periyodik Bakım',
    'Arıza Tespiti',
    'Mekanik Onarım',
    'Elektrik/Elektronik Onarım',
    'Lastik Değişimi',
    'Akü Değişimi',
    'Yağ Değişimi',
    'Test Sürüşü',
    'Diğer'
  ];
  
  // Tarih değişince mevcut saatleri güncelle
  useEffect(() => {
    if (date && dealershipId) {
      // Gerçek uygulamada backend'e sorgu yapılır
      // Şu an için tüm saatleri gösteriyoruz
      setAvailableTimes(generateAppointmentHours());
    } else {
      setAvailableTimes([]);
    }
  }, [date, dealershipId]);
  
  // Minimum tarih bugün olmalı
  const today = new Date().toISOString().split('T')[0];
  
  // Marka modelleri (örnek)
  const brands = ['Yamaha', 'Honda', 'Suzuki', 'Kawasaki', 'Ducati', 'BMW', 'KTM', 'Diğer'];
  
  // Yıl seçenekleri
  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
  
  // Form doğrulama
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!dealershipId) {
      newErrors.dealershipId = 'Lütfen bir servis merkezi seçin';
    }
    
    if (!name.trim()) {
      newErrors.name = 'Ad Soyad alanı zorunludur';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Telefon alanı zorunludur';
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }
    
    if (!email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (!date) {
      newErrors.date = 'Lütfen bir tarih seçin';
    }
    
    if (!time) {
      newErrors.time = 'Lütfen bir saat seçin';
    }
    
    if (!motorcycleBrand) {
      newErrors.motorcycleBrand = 'Lütfen motosiklet markasını seçin';
    }
    
    if (!motorcycleModel.trim()) {
      newErrors.motorcycleModel = 'Motosiklet modeli alanı zorunludur';
    }
    
    if (!motorcycleYear) {
      newErrors.motorcycleYear = 'Lütfen motosiklet yılını seçin';
    }
    
    if (motorcyclePlate && !/^[0-9]{2}[A-Z]{1,3}[0-9]{2,4}$/.test(motorcyclePlate.toUpperCase().replace(/\s/g, ''))) {
      newErrors.motorcyclePlate = 'Geçerli bir plaka giriniz (ör: 34ABC123)';
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
      createAppointment(
        dealershipId,
        new Date(date),
        time,
        name,
        phone,
        email,
        serviceType,
        {
          brand: motorcycleBrand,
          model: motorcycleModel,
          year: parseInt(motorcycleYear),
          plate: motorcyclePlate
        },
        notes
      );
      
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('Randevu oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      setSubmitSuccess(false);
    }
  };
  
  // Servis merkezleri
  const serviceCenters = dealerships.filter(d => d.isServiceCenter);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Servis Randevusu Oluştur</h1>
      <p className="text-gray-600 mb-8">Motosikletinizin bakım ve onarımı için servis randevusu alabilirsiniz.</p>
      
      {submitSuccess ? (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Randevunuz Başarıyla Oluşturuldu!</h2>
          <p className="text-gray-600 mb-6">Randevu bilgileriniz belirttiğiniz e-posta adresine gönderilmiştir.</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-300"
            >
              Yeni Randevu Oluştur
            </button>
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded transition duration-300"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Servis Merkezi */}
            <div>
              <label htmlFor="dealershipId" className="block text-sm font-medium text-gray-700 mb-1">Servis Merkezi *</label>
              <select 
                id="dealershipId" 
                value={dealershipId}
                onChange={(e) => setDealershipId(e.target.value)}
                className={`bg-gray-50 border ${errors.dealershipId ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              >
                <option value="">Servis Merkezi Seçin</option>
                {serviceCenters.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.name} - {center.city}
                  </option>
                ))}
              </select>
              {errors.dealershipId && <p className="mt-1 text-sm text-red-600">{errors.dealershipId}</p>}
            </div>
            
            {/* Ad Soyad, Telefon ve E-posta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
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
            
            {/* Tarih ve Saat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Tarih *</label>
                <input 
                  type="date" 
                  id="date" 
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`bg-gray-50 border ${errors.date ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Saat *</label>
                <select 
                  id="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!date || !dealershipId}
                  className={`bg-gray-50 border ${errors.time ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${(!date || !dealershipId) ? 'cursor-not-allowed opacity-60' : ''}`}
                >
                  <option value="">Saat Seçin</option>
                  {availableTimes.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                {(!date || !dealershipId) && (
                  <p className="mt-1 text-sm text-gray-500">Önce tarih ve servis merkezi seçin</p>
                )}
              </div>
            </div>
            
            {/* Servis Tipi */}
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Servis Tipi *</label>
              <select 
                id="serviceType" 
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as ServiceType)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Motosiklet Bilgileri */}
            <div>
              <h3 className="text-lg font-medium mb-3">Motosiklet Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="motorcycleBrand" className="block text-sm font-medium text-gray-700 mb-1">Marka *</label>
                  <select 
                    id="motorcycleBrand" 
                    value={motorcycleBrand}
                    onChange={(e) => setMotorcycleBrand(e.target.value)}
                    className={`bg-gray-50 border ${errors.motorcycleBrand ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  {errors.motorcycleBrand && <p className="mt-1 text-sm text-red-600">{errors.motorcycleBrand}</p>}
                </div>
                
                <div>
                  <label htmlFor="motorcycleModel" className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                  <input 
                    type="text" 
                    id="motorcycleModel" 
                    value={motorcycleModel}
                    onChange={(e) => setMotorcycleModel(e.target.value)}
                    className={`bg-gray-50 border ${errors.motorcycleModel ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    placeholder="MT-09, YZF-R1, vb."
                  />
                  {errors.motorcycleModel && <p className="mt-1 text-sm text-red-600">{errors.motorcycleModel}</p>}
                </div>
                
                <div>
                  <label htmlFor="motorcycleYear" className="block text-sm font-medium text-gray-700 mb-1">Yıl *</label>
                  <select 
                    id="motorcycleYear" 
                    value={motorcycleYear}
                    onChange={(e) => setMotorcycleYear(e.target.value)}
                    className={`bg-gray-50 border ${errors.motorcycleYear ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.motorcycleYear && <p className="mt-1 text-sm text-red-600">{errors.motorcycleYear}</p>}
                </div>
                
                <div>
                  <label htmlFor="motorcyclePlate" className="block text-sm font-medium text-gray-700 mb-1">Plaka</label>
                  <input 
                    type="text" 
                    id="motorcyclePlate" 
                    value={motorcyclePlate}
                    onChange={(e) => setMotorcyclePlate(e.target.value)}
                    className={`bg-gray-50 border ${errors.motorcyclePlate ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    placeholder="34ABC123"
                  />
                  {errors.motorcyclePlate && <p className="mt-1 text-sm text-red-600">{errors.motorcyclePlate}</p>}
                </div>
              </div>
            </div>
            
            {/* Notlar */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Ek Bilgiler / Notlar
                <span className="text-gray-500 font-normal ml-1">(İsteğe bağlı)</span>
              </label>
              <textarea 
                id="notes" 
                rows={3} 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Motosiklet durumu, yaşadığınız sorunlar veya diğer notlar"
              ></textarea>
            </div>
            
            {/* Hata mesajı */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {submitError}
              </div>
            )}
            
            {/* Gönder butonu */}
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-300"
              >
                Randevu Oluştur
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Bilgilendirme Notları */}
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-lg font-semibold mb-4">Önemli Bilgiler</h2>
        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
          <p className="text-sm text-gray-700 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 mr-2 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Randevu saatinden 15 dakika önce servis merkezinde hazır bulunmanız önerilir.
          </p>
          <p className="text-sm text-gray-700 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 mr-2 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Randevu iptali veya değişikliği için en az 24 saat önceden bildirim yapılmalıdır.
          </p>
          <p className="text-sm text-gray-700 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 mr-2 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Servis merkezlerimiz hafta içi 09:00-18:00, cumartesi günleri ise 10:00-16:00 saatleri arasında hizmet vermektedir.
          </p>
        </div>
      </div>
    </div>
  );
} 