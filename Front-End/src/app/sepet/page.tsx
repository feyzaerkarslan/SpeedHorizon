'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cart, CartItem, createOrder, PaymentMethod } from '@/data/cart';
import { formatCurrency } from '@/data/utils';
import { getCurrentUser } from '@/data/user';

export default function SepetPage() {
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cash'>('credit_card');
  const [showInstallments, setShowInstallments] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  
  // Demo sepet ürünleri
  const sepetUrunleri = [
    {
      id: 1,
      urunKodu: 'YZF-R1',
      urunAdi: 'Yamaha YZF-R1',
      fiyat: 850000,
      adet: 1,
      gorsel: '/images/yzf-r1.jpg'
    },
    {
      id: 7,
      urunKodu: 'EGZ-A01',
      urunAdi: 'Akrapovic Egzoz Sistemi',
      fiyat: 15000,
      indirimli: 12500,
      adet: 1,
      gorsel: '/images/egzoz.jpg'
    },
    {
      id: 8,
      urunKodu: 'KSK-001',
      urunAdi: 'Motosiklet Kaskı',
      fiyat: 5000,
      adet: 2,
      gorsel: '/images/kask.jpg'
    }
  ];

  // Toplam tutarı hesapla
  const toplam = sepetUrunleri.reduce((acc, urun) => {
    const fiyat = urun.indirimli || urun.fiyat;
    return acc + (fiyat * urun.adet);
  }, 0);
  
  // Kargo ücreti
  const kargoUcreti = toplam > 1000000 ? 0 : 250;
  
  // Genel toplam
  const genelToplam = toplam + kargoUcreti;

  // Ürün fiyatını formatla
  const formatFiyat = (fiyat: number) => {
    return new Intl.NumberFormat('tr-TR', { 
      style: 'currency', 
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(fiyat);
  };

  // Taksit seçenekleri
  const taksitSecenekleri = [
    { taksit: 1, oran: 0 },
    { taksit: 3, oran: 0.05 },
    { taksit: 6, oran: 0.08 },
    { taksit: 9, oran: 0.10 },
    { taksit: 12, oran: 0.15 }
  ];

  // Seçili taksite göre toplam tutarı hesapla
  const hesaplaTaksitliTutar = () => {
    const taksitSecenegi = taksitSecenekleri.find(t => t.taksit === selectedInstallment);
    if (!taksitSecenegi) return genelToplam;
    
    return genelToplam * (1 + taksitSecenegi.oran);
  };
  
  // Taksit tutarını hesapla
  const taksitTutari = () => {
    return hesaplaTaksitliTutar() / selectedInstallment;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>
        
        {sepetUrunleri.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Sepetiniz boş</h2>
            <p className="text-gray-500 mb-6">Hemen alışverişe başlayın ve sepetinizi doldurun.</p>
            <Link href="/motor-modelleri" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sepet Ürünleri */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {sepetUrunleri.map((urun) => (
                    <li key={urun.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                          <div className="h-full w-full bg-center bg-cover" style={{ backgroundImage: `url('${urun.gorsel}')` }}></div>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h2 className="text-lg font-medium text-gray-900">
                                <Link href={`/urun/${urun.id}`} className="hover:text-blue-600">
                                  {urun.urunAdi}
                                </Link>
                              </h2>
                              <p className="mt-1 text-sm text-gray-500">Ürün Kodu: {urun.urunKodu}</p>
                            </div>
                            <div className="text-right">
                              {urun.indirimli ? (
                                <div>
                                  <span className="text-sm text-gray-500 line-through">{formatFiyat(urun.fiyat)}</span>
                                  <p className="text-lg font-medium text-gray-900">{formatFiyat(urun.indirimli)}</p>
                                </div>
                              ) : (
                                <p className="text-lg font-medium text-gray-900">{formatFiyat(urun.fiyat)}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded">
                              <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-lg">−</button>
                              <span className="px-3 py-1 text-center w-12 select-none">{urun.adet}</span>
                              <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-lg">+</button>
                            </div>
                            <div>
                              <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                Sepetten Çıkar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <div className="flex justify-between">
                    <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      <span aria-hidden="true">←</span> Alışverişe Devam Et
                    </Link>
                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                      Sepeti Boşalt
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sipariş Özeti */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Sipariş Özeti</h3>
                </div>
                <div className="px-4 py-5 sm:p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-medium">{formatFiyat(toplam)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kargo</span>
                    {kargoUcreti === 0 ? (
                      <span className="font-medium text-green-600">Ücretsiz</span>
                    ) : (
                      <span className="font-medium">{formatFiyat(kargoUcreti)}</span>
                    )}
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-medium">Genel Toplam</span>
                      <span className="font-bold text-lg">{formatFiyat(genelToplam)}</span>
                    </div>
                    {toplam < 1000000 && (
                      <div className="mt-2 text-sm text-green-600">
                        {formatFiyat(1000000 - toplam)} daha harcayarak ücretsiz kargo fırsatından yararlanabilirsiniz.
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Ödeme Yöntemi Seçin:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        className={`flex items-center justify-center py-2 px-4 border ${paymentMethod === 'credit_card' ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-white'} rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        onClick={() => {
                          setPaymentMethod('credit_card');
                          setShowInstallments(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Kredi Kartı
                      </button>
                      <button 
                        className={`flex items-center justify-center py-2 px-4 border ${paymentMethod === 'cash' ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'} rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        onClick={() => {
                          setPaymentMethod('cash');
                          setShowInstallments(false);
                          setSelectedInstallment(1);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2h2" />
                        </svg>
                        Nakit
                      </button>
                    </div>
                  </div>
                  
                  {showInstallments && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Taksit Seçenekleri:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {taksitSecenekleri.map((taksit) => (
                          <button
                            key={taksit.taksit}
                            className={`py-2 px-3 border ${selectedInstallment === taksit.taksit ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-white border-gray-300 text-gray-700'} rounded-md text-xs font-medium hover:bg-gray-50`}
                            onClick={() => setSelectedInstallment(taksit.taksit)}
                          >
                            {taksit.taksit === 1 ? 'Tek Çekim' : `${taksit.taksit} Taksit`}
                            {taksit.oran > 0 && <span className="block text-xs mt-1">+%{taksit.oran * 100}</span>}
                          </button>
                        ))}
                      </div>
                      
                      {selectedInstallment > 1 && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Taksit Sayısı:</span>
                            <span className="font-medium">{selectedInstallment} ay</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-600">Aylık Taksit Tutarı:</span>
                            <span className="font-medium">{formatFiyat(taksitTutari())}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-600">Toplam Tutar:</span>
                            <span className="font-medium">{formatFiyat(hesaplaTaksitliTutar())}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <button className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {paymentMethod === 'credit_card' ? 
                      (selectedInstallment === 1 ? 'Tek Çekim ile Öde' : `${selectedInstallment} Taksit ile Öde`) : 
                      'Nakit ile Öde'}
                  </button>
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Siparişi tamamladığınızda, şartlar ve koşulları kabul etmiş olursunuz.
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Kupon Kodu</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Kupon kodu giriniz"
                    />
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Uygula
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );    
} 