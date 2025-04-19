import React from 'react';
import Link from 'next/link';

export default function HesabimPage() {
  // Demo kullanıcı bilgileri
  const user = {
    name: 'Ali Yılmaz',
    email: 'ali.yilmaz@example.com',
    phone: '+90 555 123 4567',
    address: 'Atatürk Caddesi No:42, Kadıköy, İstanbul',
    joined: '10.05.2022',
    orders: 8,
    points: 450
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Hesabım</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            {/* Sol menü */}
            <div className="p-6 bg-gray-50">
              <nav className="space-y-2">
                <Link href="/hesabim" className="block px-4 py-2 rounded-md bg-blue-100 text-blue-700 font-medium">
                  Genel Bakış
                </Link>
                <Link href="/siparislerim" className="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Siparişlerim
                </Link>
                <Link href="/favorilerim" className="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Favorilerim
                </Link>
                <Link href="/adreslerim" className="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Adreslerim
                </Link>
                <Link href="/bilgilerim" className="block px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Kişisel Bilgilerim
                </Link>
                <Link href="/cikis" className="block px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition mt-8">
                  Çıkış Yap
                </Link>
              </nav>
            </div>
            
            {/* Sağ içerik */}
            <div className="col-span-2 p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">Üyelik tarihi: {user.joined}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">SpeedPuan</h3>
                    <span className="bg-blue-700 text-white px-3 py-1 rounded-full font-bold">{user.points}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Alışverişlerinizde kullanabileceğiniz puanlar</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Toplam Sipariş</h3>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold">{user.orders}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Şimdiye kadar verdiğiniz sipariş sayısı</p>
                </div>
              </div>
              
              <div className="divide-y">
                <div className="py-4">
                  <h3 className="text-sm font-medium text-gray-500">E-posta</h3>
                  <p className="mt-1">{user.email}</p>
                </div>
                
                <div className="py-4">
                  <h3 className="text-sm font-medium text-gray-500">Telefon</h3>
                  <p className="mt-1">{user.phone}</p>
                </div>
                
                <div className="py-4">
                  <h3 className="text-sm font-medium text-gray-500">Teslimat Adresi</h3>
                  <p className="mt-1">{user.address}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Son Siparişleriniz</h3>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Sipariş #78524</div>
                        <div className="text-sm text-gray-500">15.06.2023</div>
                      </div>
                      <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        Teslim Edildi
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      2 ürün - 12.450,00 ₺
                    </div>
                    <div className="mt-2">
                      <Link href="/siparislerim/78524" className="text-sm text-blue-600 hover:text-blue-800">
                        Detayları Görüntüle →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Sipariş #78125</div>
                        <div className="text-sm text-gray-500">02.05.2023</div>
                      </div>
                      <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        Teslim Edildi
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      1 ürün - 5.750,00 ₺
                    </div>
                    <div className="mt-2">
                      <Link href="/siparislerim/78125" className="text-sm text-blue-600 hover:text-blue-800">
                        Detayları Görüntüle →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-right">
                  <Link href="/siparislerim" className="text-blue-600 hover:text-blue-800 font-medium">
                    Tüm Siparişlerim →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 