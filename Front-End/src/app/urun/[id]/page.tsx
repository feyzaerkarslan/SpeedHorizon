import React from 'react';
import Link from 'next/link';
 
// Demo ürün veritabanı
const urunler = [
  {
    id: 1,
    urunKodu: 'YZF-R1',
    urunAdi: 'Yamaha YZF-R1',
    kategori: 'Motor',
    fiyat: 850000,
    stok: 5,
    gorsel: '/images/yzf-r1.jpg',
    resimler: [
      '/images/yzf-r1.jpg',
      '/images/yzf-r1-2.jpg',
      '/images/yzf-r1-3.jpg',
    ],
    aciklama: 'YZF-R1, Yamaha\'nın yarış teknolojilerini yollara taşıyan süper spor motosikletidir.',
    ozellikler: {
      motor: '998 cc, sıvı soğutmalı, 4 zamanlı, DOHC, 4 valf',
      guc: '200 HP',
      sanziman: '6 vitesli',
      agirlik: '200 kg',
      yakitDeposu: '17 litre'
    }
  },
  {
    id: 7,
    urunKodu: 'EGZ-A01',
    urunAdi: 'Akrapovic Egzoz Sistemi',
    kategori: 'YedekParca',
    fiyat: 15000,
    indirimli: 12500,
    stok: 8,
    gorsel: '/images/egzoz.jpg',
    resimler: [
      '/images/egzoz.jpg',
      '/images/egzoz-2.jpg',
    ],
    aciklama: 'Akrapovic titanyum egzoz sistemi, hem performans artışı sağlar hem de daha güçlü bir ses verir.',
    ozellikler: {
      malzeme: 'Titanyum',
      agirlik: '3.2 kg',
      uyumluModeller: 'Yamaha YZF-R1, R6',
      performansArtisi: '%5-8'
    }
  },
  {
    id: 8,
    urunKodu: 'KSK-001',
    urunAdi: 'Motosiklet Kaskı',
    kategori: 'Aksesuar',
    fiyat: 5000,
    stok: 12,
    gorsel: '/images/kask.jpg',
    resimler: [
      '/images/kask.jpg',
      '/images/kask-2.jpg',
      '/images/kask-3.jpg',
    ],
    aciklama: 'Yüksek güvenlik standartlarına sahip, aerodinamik tasarımlı tam yüz motosiklet kaskı.',
    ozellikler: {
      malzeme: 'Kompozit Fiber',
      agirlik: '1.5 kg',
      sertifikalar: 'ECE 22.05, DOT',
      beden: 'S, M, L, XL'
    }
  }
];

// Ürün bulucu
const findUrun = (id: string) => {
  const urunId = parseInt(id, 10);
  return urunler.find(urun => urun.id === urunId) || null;
};

// Ürün fiyatını formatla
const formatFiyat = (fiyat: number) => {
  return new Intl.NumberFormat('tr-TR', { 
    style: 'currency', 
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(fiyat);
};

export default function UrunDetay({ params }: { params: { id: string } }) {
  const urun = findUrun(params.id);
  
  if (!urun) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Ürün Görseli */}
            <div>
              <div className="bg-gray-200 rounded-lg overflow-hidden h-80 relative">
                <div 
                  className="absolute inset-0 bg-center bg-cover" 
                  style={{ backgroundImage: `url('${urun.gorsel}')` }}
                ></div>
              </div>
              
              {/* Ürün Galerisi */}
              {urun.resimler && urun.resimler.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {urun.resimler.map((resim, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-200 rounded-md overflow-hidden h-20 cursor-pointer"
                    >
                      <div 
                        className="h-full w-full bg-center bg-cover" 
                        style={{ backgroundImage: `url('${resim}')` }}
                      ></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Ürün Bilgileri */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{urun.urunAdi}</h1>
              <p className="text-sm text-gray-500 mb-4">Ürün Kodu: {urun.urunKodu} | Kategori: {urun.kategori}</p>
              
              <div className="mb-6">
                {urun.indirimli ? (
                  <div className="flex items-center">
                    <span className="text-gray-500 line-through mr-2">{formatFiyat(urun.fiyat)}</span>
                    <span className="text-2xl font-bold text-blue-600">{formatFiyat(urun.indirimli)}</span>
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                      %{Math.round(((urun.fiyat - urun.indirimli) / urun.fiyat) * 100)} İndirim
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-blue-600">{formatFiyat(urun.fiyat)}</span>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">{urun.aciklama}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 rounded-full mr-2 ${urun.stok > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={urun.stok > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {urun.stok > 0 ? 'Stokta' : 'Tükendi'}
                  </span>
                  {urun.stok > 0 && <span className="text-gray-500 ml-2">({urun.stok} adet)</span>}
                </div>
                
                {urun.stok > 0 ? (
                  <div className="flex space-x-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-lg">−</button>
                      <span className="px-3 py-1 text-center w-12 select-none">1</span>
                      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-lg">+</button>
                    </div>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
                      Sepete Ekle
                    </button>
                  </div>
                ) : (
                  <button 
                    className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded cursor-not-allowed" 
                    disabled
                  >
                    Stokta Yok
                  </button>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3">Ürün Özellikleri</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(urun.ozellikler).map(([key, value]) => (
                    <div key={key} className="flex">
                      <dt className="text-gray-500 min-w-[100px]">{key.charAt(0).toUpperCase() + key.slice(1)}:</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Alışverişe Devam Et
            </Link>
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorilere Ekle
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Paylaş
              </button>
            </div>
          </div>
        </div>
        
        {/* İlgili Ürünler */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {urunler.filter(item => item.id !== urun.id).slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url('${item.gorsel}')` }}></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link href={`/urun/${item.id}`} className="hover:text-blue-600">
                      {item.urunAdi}
                    </Link>
                  </h3>
                  <div className="mb-3">
                    {item.indirimli ? (
                      <div className="flex items-center">
                        <span className="text-gray-500 line-through mr-2">{formatFiyat(item.fiyat)}</span>
                        <span className="text-lg font-bold text-blue-600">{formatFiyat(item.indirimli)}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-blue-600">{formatFiyat(item.fiyat)}</span>
                    )}
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition text-sm">
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
