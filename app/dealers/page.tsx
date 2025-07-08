'use client';

import { useState } from 'react';
import { MapPinIcon, PhoneIcon, ClockIcon, WrenchIcon } from '@heroicons/react/24/outline';

interface Dealer {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  services: string[];
  location: {
    lat: number;
    lng: number;
  };
}

const dealers: Dealer[] = [
  {
    id: 1,
    name: 'SpeedHorizon İstanbul Merkez',
    address: 'Maslak Mah. Büyükdere Cad. No:123, Sarıyer/İstanbul',
    phone: '(0212) 555 00 01',
    email: 'istanbul@speedhorizon.com',
    workingHours: 'Hafta içi: 09:00 - 18:00, Cumartesi: 10:00 - 16:00',
    services: [
      'Periyodik Bakım',
      'Arıza/Tamir',
      'Modifikasyon',
      'Yedek Parça Satışı',
      'Test Sürüşü'
    ],
    location: {
      lat: 41.1085,
      lng: 29.0107
    }
  },
  {
    id: 2,
    name: 'SpeedHorizon Ankara',
    address: 'Çankaya Mah. Atatürk Bulvarı No:456, Çankaya/Ankara',
    phone: '(0312) 555 00 02',
    email: 'ankara@speedhorizon.com',
    workingHours: 'Hafta içi: 09:00 - 18:00, Cumartesi: 10:00 - 16:00',
    services: [
      'Periyodik Bakım',
      'Arıza/Tamir',
      'Yedek Parça Satışı',
      'Test Sürüşü'
    ],
    location: {
      lat: 39.9334,
      lng: 32.8597
    }
  },
  {
    id: 3,
    name: 'SpeedHorizon İzmir',
    address: 'Alsancak Mah. Kıbrıs Şehitleri Cad. No:789, Konak/İzmir',
    phone: '(0232) 555 00 03',
    email: 'izmir@speedhorizon.com',
    workingHours: 'Hafta içi: 09:00 - 18:00, Cumartesi: 10:00 - 16:00',
    services: [
      'Periyodik Bakım',
      'Arıza/Tamir',
      'Modifikasyon',
      'Yedek Parça Satışı'
    ],
    location: {
      lat: 38.4237,
      lng: 27.1428
    }
  }
];

export default function Dealers() {
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bayi & Servis Noktaları</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bayi Listesi */}
        <div className="lg:col-span-1 space-y-4">
          {dealers.map((dealer) => (
            <div
              key={dealer.id}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
                selectedDealer?.id === dealer.id
                  ? 'ring-2 ring-blue-500'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedDealer(dealer)}
            >
              <h3 className="text-lg font-semibold mb-2">{dealer.name}</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  {dealer.address}
                </p>
                <p className="flex items-center">
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  {dealer.phone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bayi Detayları */}
        <div className="lg:col-span-2">
          {selectedDealer ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">{selectedDealer.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">İletişim Bilgileri</h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        {selectedDealer.address}
                      </p>
                      <p className="flex items-center">
                        <PhoneIcon className="w-5 h-5 mr-2" />
                        {selectedDealer.phone}
                      </p>
                      <p className="flex items-center">
                        <ClockIcon className="w-5 h-5 mr-2" />
                        {selectedDealer.workingHours}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Hizmetler</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedDealer.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <WrenchIcon className="w-4 h-4 mr-2" />
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Konum</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg">
                    {/* Google Maps iframe'i buraya eklenecek */}
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${selectedDealer.location.lng}!3d${selectedDealer.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${selectedDealer.location.lat}%2C${selectedDealer.location.lng}!5e0!3m2!1str!2str!4v1`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedDealer.location.lat},${selectedDealer.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  Yol Tarifi Al
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              Lütfen detaylarını görmek istediğiniz bayiyi seçin
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 