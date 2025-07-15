'use client';

import { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

interface PriceItem {
  _id: string;
  category: string;
  name: string;
  price: number;
  currency: string;
  description?: string;
  features?: string[];
}

export default function PriceList() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'scooter' | 'aksesuar' | 'yedek-parça' | 'servis'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceList, setPriceList] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pricelist`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPriceList(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = priceList.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  if (loading) return <div className="text-center py-20">Fiyatlar yükleniyor...</div>;

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

      {/* Fiyat Listesi Tablosu */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Açıklama</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600">{item.price} {item.currency}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.description || '-'}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 