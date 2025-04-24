'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserIcon, HeartIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

// Örnek kullanıcı verileri
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  orders: [
    { id: 1, date: '2025-04-24', status: 'Teslim Edildi', total: 249999 },
    { id: 2, date: '2025-04-23', status: 'Kargoda', total: 399999 },
  ],
  favorites: [
    { id: 1, name: 'SpeedMaster 650', price: 249999, image: '/motorcycle-1.jpg' },
    { id: 2, name: 'RoadKing 1000', price: 399999, image: '/motorcycle-2.jpg' },
  ],
};

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    // Çıkış işlemi simülasyonu
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{userData.name}</h2>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <UserIcon className="w-5 h-5" />
              <span>Profilim</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>Siparişlerim</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'favorites' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <HeartIcon className="w-5 h-5" />
              <span>Favorilerim</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 text-red-600 hover:bg-red-50"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profil Bilgileri</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                    <input
                      type="text"
                      defaultValue={userData.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">E-posta</label>
                    <input
                      type="email"
                      defaultValue={userData.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Değişiklikleri Kaydet
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>
                <div className="space-y-4">
                  {userData.orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Sipariş #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total.toLocaleString('tr-TR')} TL</p>
                          <p className="text-sm text-green-600">{order.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Favorilerim</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.favorites.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 flex space-x-4">
                      <div className="w-24 h-24 bg-gray-100 rounded"></div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-blue-600 font-medium">
                          {item.price.toLocaleString('tr-TR')} TL
                        </p>
                        <button className="mt-2 text-sm text-red-600 hover:text-red-700">
                          Favorilerden Çıkar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
