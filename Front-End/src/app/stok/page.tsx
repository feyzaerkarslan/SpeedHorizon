import React from 'react';
import Link from 'next/link';

export default function StokPage() {
  // Demo stok bilgileri
  const stokBilgileri = [
    { id: 1, urunKodu: 'YZF-R1', urunAdi: 'Yamaha YZF-R1', kategori: 'Motor', miktar: 5, durum: 'Stokta', sonGuncelleme: '15.06.2023' },
    { id: 2, urunKodu: 'MT-09', urunAdi: 'Yamaha MT-09', kategori: 'Motor', miktar: 3, durum: 'Stokta', sonGuncelleme: '12.06.2023' },
    { id: 3, urunKodu: 'XMAX-300', urunAdi: 'Yamaha XMAX 300', kategori: 'Scooter', miktar: 7, durum: 'Stokta', sonGuncelleme: '10.06.2023' },
    { id: 4, urunKodu: 'TRACER-9', urunAdi: 'Yamaha Tracer 9 GT', kategori: 'Motor', miktar: 2, durum: 'Stokta', sonGuncelleme: '08.06.2023' },
    { id: 5, urunKodu: 'NMAX-125', urunAdi: 'Yamaha NMAX 125', kategori: 'Scooter', miktar: 0, durum: 'Tükendi', sonGuncelleme: '05.06.2023' },
    { id: 6, urunKodu: 'MY-001', urunAdi: 'Motor Yağı', kategori: 'YedekParca', miktar: 35, durum: 'Stokta', sonGuncelleme: '02.06.2023' },
    { id: 7, urunKodu: 'EGZ-A01', urunAdi: 'Akrapovic Egzoz Sistemi', kategori: 'YedekParca', miktar: 8, durum: 'Stokta', sonGuncelleme: '01.06.2023' },
    { id: 8, urunKodu: 'KSK-001', urunAdi: 'Motosiklet Kaskı', kategori: 'Aksesuar', miktar: 12, durum: 'Stokta', sonGuncelleme: '30.05.2023' },
    { id: 9, urunKodu: 'MNT-001', urunAdi: 'Motosiklet Montu', kategori: 'Aksesuar', miktar: 6, durum: 'Stokta', sonGuncelleme: '28.05.2023' },
    { id: 10, urunKodu: 'ELD-001', urunAdi: 'Motosiklet Eldiveni', kategori: 'Aksesuar', miktar: 20, durum: 'Stokta', sonGuncelleme: '25.05.2023' },
  ];

  // Stok durumu istatistikleri
  const istatistikler = {
    toplamUrun: stokBilgileri.length,
    toplamStok: stokBilgileri.reduce((toplam, urun) => toplam + urun.miktar, 0),
    tukenenUrun: stokBilgileri.filter(urun => urun.durum === 'Tükendi').length,
    kritikStok: stokBilgileri.filter(urun => urun.miktar > 0 && urun.miktar <= 3).length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-700 px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Stok Yönetimi</h1>
            <div className="flex space-x-3">
              <Link href="/urun-ekle" className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition">
                Yeni Ürün Ekle
              </Link>
              <button className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md font-medium transition">
                Stok Güncelle
              </button>
            </div>
          </div>
          
          {/* İstatistikler */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800 uppercase">Toplam Ürün</h3>
              <p className="mt-2 text-3xl font-bold text-blue-900">{istatistikler.toplamUrun}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-green-800 uppercase">Toplam Stok</h3>
              <p className="mt-2 text-3xl font-bold text-green-900">{istatistikler.toplamStok}</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="text-sm font-medium text-yellow-800 uppercase">Kritik Stok</h3>
              <p className="mt-2 text-3xl font-bold text-yellow-900">{istatistikler.kritikStok}</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-sm font-medium text-red-800 uppercase">Tükenen Ürünler</h3>
              <p className="mt-2 text-3xl font-bold text-red-900">{istatistikler.tukenenUrun}</p>
            </div>
          </div>
          
          {/* Filtreler */}
          <div className="px-6 py-4 bg-gray-50 border-y border-gray-200 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Kategori</label>
                <select id="kategori" name="kategori" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="">Tümü</option>
                  <option value="Motor">Motor</option>
                  <option value="Scooter">Scooter</option>
                  <option value="YedekParca">Yedek Parça</option>
                  <option value="Aksesuar">Aksesuar</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="durum" className="block text-sm font-medium text-gray-700">Durum</label>
                <select id="durum" name="durum" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="">Tümü</option>
                  <option value="Stokta">Stokta</option>
                  <option value="Tükendi">Tükendi</option>
                  <option value="Kritik">Kritik Stok</option>
                </select>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <label htmlFor="arama" className="block text-sm font-medium text-gray-700 sr-only">Ara</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="arama"
                  id="arama"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Ürün adı veya kodu ara..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stok tablosu */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün Kodu
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün Adı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Miktar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Son Güncelleme
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stokBilgileri.map((urun) => (
                  <tr key={urun.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {urun.urunKodu}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {urun.urunAdi}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {urun.kategori}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {urun.miktar}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {urun.durum === 'Stokta' && urun.miktar > 3 && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {urun.durum}
                        </span>
                      )}
                      {urun.durum === 'Stokta' && urun.miktar <= 3 && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Kritik Stok
                        </span>
                      )}
                      {urun.durum === 'Tükendi' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {urun.durum}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {urun.sonGuncelleme}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">Düzenle</button>
                      <button className="text-red-600 hover:text-red-900">Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Sayfalama */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Önceki
              </a>
              <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Sonraki
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Toplam <span className="font-medium">10</span> sonuçtan <span className="font-medium">1</span> ile <span className="font-medium">10</span> arası gösteriliyor
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Önceki</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </a>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Sonraki</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 