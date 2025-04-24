'use client';

import { useState } from 'react';
import { AdjustmentsHorizontalIcon, FunnelIcon } from '@heroicons/react/24/outline';
import StockBadge from '@/components/StockBadge';

const motorcycles = [
  {
    id: 1,
    name: 'SpeedMaster 650',
    price: 249999,
    power: '65 HP',
    color: 'Kırmızı',
    image: '/motorcycle-1.jpg',
    stock: 5,
  },
  {
    id: 2,
    name: 'RoadKing 1000',
    price: 399999,
    power: '125 HP',
    color: 'Siyah',
    image: '/motorcycle-2.jpg',
    stock: 3,
  },
  {
    id: 3,
    name: 'CityRunner 125',
    price: 89999,
    power: '12 HP',
    color: 'Mavi',
    image: '/motorcycle-3.jpg',
    stock: 0,
  },
];

export default function Motorcycles() {
  const [priceFilter, setPriceFilter] = useState('all');
  const [powerFilter, setPowerFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Motor Modelleri</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Filtrele:</span>
          </div>
          
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Fiyat</option>
            <option value="low">200.000 TL altı</option>
            <option value="mid">200.000 TL - 300.000 TL</option>
            <option value="high">300.000 TL üzeri</option>
          </select>

          <select
            value={powerFilter}
            onChange={(e) => setPowerFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Motor Gücü</option>
            <option value="low">50 HP altı</option>
            <option value="mid">50-100 HP</option>
            <option value="high">100 HP üzeri</option>
          </select>

          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Renk</option>
            <option value="red">Kırmızı</option>
            <option value="black">Siyah</option>
            <option value="blue">Mavi</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {motorcycles.map((motorcycle) => (
          <div key={motorcycle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {/* Replace with actual image */}
              <div className="w-full h-48 bg-gray-300" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{motorcycle.name}</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Motor Gücü: {motorcycle.power}</p>
                <p className="text-gray-600">Renk: {motorcycle.color}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-blue-600">
                    {motorcycle.price.toLocaleString('tr-TR')} TL
                  </p>
                  <StockBadge stock={motorcycle.stock} />
                </div>
              </div>
              <div className="mt-4 space-x-2">
                <button 
                  className={`${motorcycle.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white px-4 py-2 rounded`}
                  disabled={motorcycle.stock === 0}
                >
                  {motorcycle.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                  Detaylar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
