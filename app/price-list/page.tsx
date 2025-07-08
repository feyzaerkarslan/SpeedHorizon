'use client';

import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

interface PriceItem {
  id: string;
  category: 'scooter' | 'aksesuar' | 'yedek-parça' | 'servis';
  name: string;
  price: string;
  description: string;
  features?: string[];
}

const priceList: PriceItem[] = [
  // Scooter Fiyatları
  {
    id: 'scooter-1',
    category: 'scooter',
    name: 'SpeedHorizon Sport X1',
    price: '₺125.000',
    description: '150cc Sport Scooter',
    features: [
      'ABS Fren Sistemi',
      'LED Aydınlatma',
      'Dijital Gösterge Paneli',
      'Sport Sürüş Modu',
      'USB Şarj Portu'
    ]
  },
  {
    id: 'scooter-2',
    category: 'scooter',
    name: 'SpeedHorizon Sport X2',
    price: '₺145.000',
    description: '200cc Sport Scooter',
    features: [
      'ABS Fren Sistemi',
      'LED Aydınlatma',
      'Dijital Gösterge Paneli',
      'Sport Sürüş Modu',
      'USB Şarj Portu',
      'Hızlı Şarj Sistemi'
    ]
  },
  {
    id: 'scooter-3',
    category: 'scooter',
    name: 'SpeedHorizon Urban E1',
    price: '₺95.000',
    description: '125cc Urban Mobility',
    features: [
      'ABS Fren Sistemi',
      'LED Aydınlatma',
      'Dijital Gösterge Paneli',
      'Eco Sürüş Modu',
      'USB Şarj Portu',
      'Geniş Depolama Alanı'
    ]
  },
  {
    id: 'scooter-4',
    category: 'scooter',
    name: 'SpeedHorizon Urban E2',
    price: '₺105.000',
    description: '150cc Urban Mobility',
    features: [
      'ABS Fren Sistemi',
      'LED Aydınlatma',
      'Dijital Gösterge Paneli',
      'Eco Sürüş Modu',
      'USB Şarj Portu',
      'Geniş Depolama Alanı',
      'Akıllı Bağlantı Sistemi'
    ]
  },

  // Aksesuar Fiyatları
  {
    id: 'accessory-1',
    category: 'aksesuar',
    name: 'Premium Kask',
    price: '₺2.500',
    description: 'ECE 22.05 Sertifikalı'
  },
  {
    id: 'accessory-2',
    category: 'aksesuar',
    name: 'Yağmurluk Seti',
    price: '₺1.200',
    description: 'Su Geçirmez, Nefes Alabilen'
  },
  {
    id: 'accessory-3',
    category: 'aksesuar',
    name: 'Özel Tasarım Koltuk',
    price: '₺3.500',
    description: 'Hafızalı Köpük, Su Geçirmez'
  },
  {
    id: 'accessory-4',
    category: 'aksesuar',
    name: 'GPS Navigasyon',
    price: '₺4.500',
    description: 'Su Geçirmez, Bluetooth Bağlantılı'
  },

  // Yedek Parça Fiyatları
  {
    id: 'part-1',
    category: 'yedek-parça',
    name: 'Motor Yağı Filtresi',
    price: '₺150',
    description: 'Orijinal Yedek Parça'
  },
  {
    id: 'part-2',
    category: 'yedek-parça',
    name: 'Ön Fren Balatası',
    price: '₺250',
    description: 'Premium Fren Balatası'
  },
  {
    id: 'part-3',
    category: 'yedek-parça',
    name: 'Akü',
    price: '₺1.200',
    description: '12V 7Ah'
  },
  {
    id: 'part-4',
    category: 'yedek-parça',
    name: 'Ön Lastik',
    price: '₺850',
    description: '120/70-14'
  },

  // Servis Fiyatları
  {
    id: 'service-1',
    category: 'servis',
    name: 'Periyodik Bakım',
    price: '₺1.500',
    description: 'Yağ Değişimi, Filtre Kontrolü, Genel Bakım'
  },
  {
    id: 'service-2',
    category: 'servis',
    name: 'Fren Sistemi Bakımı',
    price: '₺800',
    description: 'Fren Balatası Değişimi, Hidrolik Kontrol'
  },
  {
    id: 'service-3',
    category: 'servis',
    name: 'Motor Revizyonu',
    price: '₺3.500',
    description: 'Motor Parçaları Kontrolü ve Bakımı'
  },
  {
    id: 'service-4',
    category: 'servis',
    name: 'Elektronik Sistem Kontrolü',
    price: '₺600',
    description: 'Sensör Kontrolü, Bağlantı Testi'
  }
];

export default function PriceList() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'scooter' | 'aksesuar' | 'yedek-parça' | 'servis'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredItems = priceList.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
    const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Fiyat Listesi</h1>

      {/* Filtreler ve Sıralama */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setSelectedCategory('scooter')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'scooter'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Scooter
          </button>
          <button
            onClick={() => setSelectedCategory('aksesuar')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'aksesuar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Aksesuar
          </button>
          <button
            onClick={() => setSelectedCategory('yedek-parça')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'yedek-parça'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Yedek Parça
          </button>
          <button
            onClick={() => setSelectedCategory('servis')}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'servis'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Servis
          </button>
        </div>

        {/* Sıralama Butonu */}
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Fiyata Göre Sırala
          {sortOrder === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4" />
          ) : (
            <ArrowDownIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Fiyat Listesi */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ürün/Hizmet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Açıklama
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  {item.features && (
                    <div className="mt-2">
                      <ul className="text-xs text-gray-500 space-y-1">
                        {item.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-blue-600">{item.price}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bilgilendirme */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Fiyat Bilgilendirmesi</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• Tüm fiyatlarımıza KDV dahildir.</li>
          <li>• Fiyatlarımız günlük kur değişimlerine göre güncellenebilir.</li>
          <li>• Kampanya ve indirimler için bayilerimizle iletişime geçebilirsiniz.</li>
          <li>• Servis fiyatlarına yedek parça ücretleri dahil değildir.</li>
        </ul>
      </div>
    </div>
  );
} 