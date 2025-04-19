import React from 'react';
import Link from 'next/link';

export default function UrunEklePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Yeni Ürün Ekle</h1>
          </div>
          
          <form className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="urunKodu" className="block text-sm font-medium text-gray-700">Ürün Kodu</label>
                <input
                  type="text"
                  id="urunKodu"
                  name="urunKodu"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Kategori</label>
                <select
                  id="kategori"
                  name="kategori"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="Motor">Motor</option>
                  <option value="Scooter">Scooter</option>
                  <option value="YedekParca">Yedek Parça</option>
                  <option value="Aksesuar">Aksesuar</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="urunAdi" className="block text-sm font-medium text-gray-700">Ürün Adı</label>
              <input
                type="text"
                id="urunAdi"
                name="urunAdi"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="fiyat" className="block text-sm font-medium text-gray-700">Fiyat (₺)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="fiyat"
                    name="fiyat"
                    min="0"
                    step="0.01"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₺</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="miktar" className="block text-sm font-medium text-gray-700">Stok Miktarı</label>
                <input
                  type="number"
                  id="miktar"
                  name="miktar"
                  min="0"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="birim" className="block text-sm font-medium text-gray-700">Birim</label>
                <select
                  id="birim"
                  name="birim"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="Adet">Adet</option>
                  <option value="Çift">Çift</option>
                  <option value="Litre">Litre</option>
                  <option value="Kilogram">Kilogram</option>
                  <option value="Set">Set</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700">Ürün Açıklaması</label>
              <textarea
                id="aciklama"
                name="aciklama"
                rows={4}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Ürün Görseli</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="gorsel" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Dosya yükle</span>
                      <input id="gorsel" name="gorsel" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">veya sürükle bırak</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF maksimum 10MB</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="marka" className="block text-sm font-medium text-gray-700">Marka</label>
                <input
                  type="text"
                  id="marka"
                  name="marka"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="stokTakibi"
                name="stokTakibi"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="stokTakibi" className="block text-sm text-gray-700">
                Stok takibi yap
              </label>
            </div>
            
            <div>
              <label htmlFor="kritikStokSeviyesi" className="block text-sm font-medium text-gray-700">Kritik Stok Seviyesi</label>
              <input
                type="number"
                id="kritikStokSeviyesi"
                name="kritikStokSeviyesi"
                min="0"
                defaultValue="3"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full max-w-xs shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="mt-1 text-sm text-gray-500">Bu seviyeye düşüldüğünde sistem uyarı verecektir.</p>
            </div>
            
            <div className="pt-5 border-t border-gray-200 flex justify-between">
              <Link href="/stok" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                İptal
              </Link>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="bg-gray-200 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Temizle
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 