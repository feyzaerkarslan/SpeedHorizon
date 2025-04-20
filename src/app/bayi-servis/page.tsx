'use client';

import { useState } from 'react';
import Link from 'next/link';
import { dealerships, Dealership, getDealershipsByCity } from '@/data/dealerships';

export default function DealershipsPage() {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showServiceOnly, setShowServiceOnly] = useState<boolean>(false);
  
  // Şehirler alınıyor
  const cities = Array.from(new Set(dealerships.map(d => d.city))).sort();       
  
  // Filtrelenmiş bayileri al
  const filteredDealerships: Dealership[] = dealerships.filter(dealership => {
    if (showServiceOnly && !dealership.isServiceCenter) {
      return false;
    }
    
    if (selectedCity && dealership.city !== selectedCity) {
      return false;
    }
    
    return true; 
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Bayi ve Servis Noktaları</h1>
      <p className="text-gray-600 mb-8">Türkiye genelinde hizmet veren bayi ve servis noktalarımız aşağıda listelenmiştir.</p>
      
      {/* Filtreler */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex-1">
            <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
            <select 
              id="city-filter" 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Tüm Şehirler</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <input 
              id="service-only" 
              type="checkbox" 
              checked={showServiceOnly}
              onChange={(e) => setShowServiceOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="service-only" className="ml-2 text-sm font-medium text-gray-900">
              Sadece Servis Merkezleri
            </label>
          </div>
          
          <div>
            <button 
              onClick={() => {
                setSelectedCity('');
                setShowServiceOnly(false);
              }}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>
      </div>
      
      {/* Bayi Listesi */}
      {filteredDealerships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealerships.map((dealership) => (
            <div key={dealership.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{dealership.name}</h2>
                <div className="flex items-center mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${dealership.isServiceCenter ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {dealership.isServiceCenter ? 'Servis Merkezi' : 'Satış Noktası'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mt-0.5 mr-2 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <address className="not-italic text-gray-600">
                      {dealership.address}
                    </address>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a href={`tel:${dealership.phone}`} className="text-gray-600 hover:text-blue-600">
                      {dealership.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${dealership.email}`} className="text-gray-600 hover:text-blue-600">
                      {dealership.email}
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Çalışma Saatleri</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hafta içi:</span>
                      <span>{dealership.workingHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cumartesi:</span>
                      <span>{dealership.workingHours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pazar:</span>
                      <span>{dealership.workingHours.sunday}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Sunulan Hizmetler</h3>
                  <div className="flex flex-wrap gap-2">
                    {dealership.services.map((service, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                {dealership.isServiceCenter && (
                  <div className="mt-6">
                    <Link 
                      href={`/randevu-olustur?dealership=${dealership.id}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 w-full text-center"
                    >
                      Servis Randevusu Al
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Aradığınız kriterlere uygun bayi bulunamadı.</h2>
          <p className="text-gray-600 mb-4">Lütfen farklı filtre seçenekleri ile tekrar deneyin.</p>
          <button 
            onClick={() => {
              setSelectedCity('');
              setShowServiceOnly(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      )}
      
      {/* Harita */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Bayilerimizin Konumu</h2>
        <div className="bg-gray-200 rounded-lg overflow-hidden h-96 flex items-center justify-center">
          {/* Gerçek uygulamada burada gerçek bir harita gösterilir */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">Harita gösterimi demo amaçlıdır.</p>
            <p className="text-gray-600">Gerçek uygulamada burada Google Maps veya başka bir harita servisi kullanılır.</p>
          </div>
        </div>
      </div>
      
      {/* İletişim Bloku */}
      <div className="mt-12 bg-blue-50 rounded-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Bize Ulaşın</h2>
          <p className="text-gray-600">Herhangi bir sorunuz mu var? Lütfen bizimle iletişime geçin.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <p className="font-semibold">Çağrı Merkezi</p>
            <p className="text-gray-600">+90 212 555 1234</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="font-semibold">E-posta</p>
            <p className="text-gray-600">info@mototurk.com</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <p className="font-semibold">Merkez Ofis</p>
            <p className="text-gray-600">Motosiklet Caddesi No:123, İstanbul</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
