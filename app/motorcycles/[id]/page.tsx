'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { HeartIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { MdOutlineChevronRight, MdOutlineSpeed } from 'react-icons/md';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Bu gerçek bir veri işleyicisi değil, sadece örnek için
const getMotorcycle = (id: string) => {
  const motorcycles = {
    'mt-09': {
      id: 'mt-09',
      name: 'MT-09',
      category: 'Hyper Naked',
      price: 485000,
      colors: ['Siyah', 'Mavi', 'Gri'],
      description: 'Yeni nesil 889cc CP3 motoru, ultra hafif alüminyum şasisi ve en gelişmiş elektronik kontrol teknolojisi ile MT-09, Yamaha\'nın ikonik Hyper Naked tasarımını bir adım öteye taşıyor.',
      features: [
        '889cc sıvı soğutmalı DOHC 4 zamanlı 3 silindirli motor',
        'Yeni hafif alüminyum döküm şasi',
        '6 eksenli IMU sensör',
        'QSS Hızlı Vites Değiştirme Sistemi',
        'TFT Renkli Ekran'
      ],
      specs: {
        motor: '889cc, 3 silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
        şanzıman: '6 ileri',
        maksGüç: '119 PS @ 10,000 rpm',
        maksimumTork: '93 Nm @ 7,000 rpm',
        yakıtTüketimi: '5.0 l/100km',
        uzunluk: '2,090 mm',
        genişlik: '795 mm',
        yükseklik: '1,190 mm',
        seleYüksekliği: '825 mm',
        aksAralığı: '1,430 mm',
        ağırlık: '189 kg'
      },
      images: [
        '/motorcycles/mt-09/1.jpg',
        '/motorcycles/mt-09/2.jpg',
        '/motorcycles/mt-09/3.jpg',
        '/motorcycles/mt-09/4.jpg'
      ]
    },
    'r1': {
      id: 'r1',
      name: 'R1',
      category: 'Supersport',
      price: 850000,
      colors: ['Mavi', 'Siyah', 'Kırmızı'],
      description: 'YZF-R1, Yamaha\'nın yarış pistindeki MotoGP teknolojisini sokağa taşımak için tasarlanmış, en gelişmiş süper spor motosikletidir.',
      features: [
        '998cc sıvı soğutmalı, crossplane 4 zamanlı motor',
        'MotoGP teknolojisi elektronik kontrol sistemleri',
        'Yarış tipi alüminyum şasi',
        'Yarış tipi aerodinamik tasarım',
        'Brembo ön frenler'
      ],
      specs: {
        motor: '998cc, 4 silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
        şanzıman: '6 ileri',
        maksGüç: '200 PS @ 13,500 rpm',
        maksimumTork: '112.4 Nm @ 11,500 rpm',
        yakıtTüketimi: '6.8 l/100km',
        uzunluk: '2,055 mm',
        genişlik: '690 mm',
        yükseklik: '1,165 mm',
        seleYüksekliği: '855 mm',
        aksAralığı: '1,405 mm',
        ağırlık: '201 kg'
      },
      images: [
        '/motorcycles/r1/1.jpg',
        '/motorcycles/r1/2.jpg',
        '/motorcycles/r1/3.jpg',
        '/motorcycles/r1/4.jpg'
      ]
    },
    'tracer-9-gt': {
      id: 'tracer-9-gt',
      name: 'Tracer 9 GT',
      category: 'Sport Touring',
      price: 545000,
      colors: ['Mavi', 'Gri'],
      description: 'Yeni nesil 889cc CP3 motoru ve gelişmiş elektronik özellikleri ile Tracer 9 GT, uzun mesafe sürüşleri için mükemmel bir sport tourer motosiklet.',
      features: [
        '889cc sıvı soğutmalı DOHC 4 zamanlı 3 silindirli motor',
        'Elektronik süspansiyon',
        'Hızlı vites değiştirme sistemi',
        'Yan çantalar',
        'LED sis farları'
      ],
      specs: {
        motor: '889cc, 3 silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
        şanzıman: '6 ileri',
        maksGüç: '119 PS @ 10,000 rpm',
        maksimumTork: '93 Nm @ 7,000 rpm',
        yakıtTüketimi: '5.0 l/100km',
        uzunluk: '2,175 mm',
        genişlik: '885 mm',
        yükseklik: '1,430 mm',
        seleYüksekliği: '810 mm',
        aksAralığı: '1,500 mm',
        ağırlık: '220 kg'
      },
      images: [
        '/motorcycles/tracer-9-gt/1.jpg',
        '/motorcycles/tracer-9-gt/2.jpg',
        '/motorcycles/tracer-9-gt/3.jpg',
        '/motorcycles/tracer-9-gt/4.jpg'
      ]
    }
  };

  return motorcycles[id as keyof typeof motorcycles] || null;
};

export default function MotorcycleDetails({ params }: { params: { id: string } }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const motorcycle = getMotorcycle(params.id);

  if (!motorcycle) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Motosiklet bulunamadı</h1>
        <p className="mt-4">İstediğiniz motosiklet mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/motorcycles" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3">
          Tüm Motosikletler
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero banner */}
      <div className="bg-black text-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">{motorcycle.name}</h1>
              <p className="text-xl mb-8">{motorcycle.category}</p>
              <p className="text-3xl font-bold mb-6">{motorcycle.price.toLocaleString('tr-TR')} TL</p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors">
                  Sipariş Ver
                </button>
                <button className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-colors">
                  Test Sürüşü
                </button>
                <button className="border border-white text-white p-3 rounded-full hover:bg-white hover:text-black transition-colors">
                  <HeartIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative h-[300px] lg:h-[400px] w-full">
              {/* Burada gerçek bir resim olmalı, bu bir placeholder */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left column */}
          <div className="lg:w-2/3">
            {/* Product images */}
            <div className="mb-12">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                {/* Burada gerçek bir resim olmalı, bu bir placeholder */}
                <div className="h-96 bg-gray-200 w-full"></div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    className="relative h-24 rounded-md bg-gray-100 hover:ring-2 hover:ring-blue-600"
                  >
                    {/* Burada küçük thumbnail resimler olmalı */}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tab.Group>
              <Tab.List className="flex space-x-1 border-b border-gray-200">
                {['Özellikler', 'Teknik Bilgiler', 'Aksesuarlar'].map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'py-4 px-6 text-sm font-medium leading-5',
                        'focus:outline-none',
                        selected
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-700 hover:text-gray-900'
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-4">
                <Tab.Panel className="p-4">
                  <div className="prose max-w-none">
                    <p className="text-lg mb-6">{motorcycle.description}</p>
                    <h3 className="text-xl font-bold mb-4">Ana Özellikler</h3>
                    <ul className="space-y-2">
                      {motorcycle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Motor ve Performans</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Motor</dt>
                          <dd className="font-medium">{motorcycle.specs.motor}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Şanzıman</dt>
                          <dd className="font-medium">{motorcycle.specs.şanzıman}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Maksimum Güç</dt>
                          <dd className="font-medium">{motorcycle.specs.maksGüç}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Maksimum Tork</dt>
                          <dd className="font-medium">{motorcycle.specs.maksimumTork}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Yakıt Tüketimi</dt>
                          <dd className="font-medium">{motorcycle.specs.yakıtTüketimi}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Boyutlar ve Ağırlık</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Uzunluk</dt>
                          <dd className="font-medium">{motorcycle.specs.uzunluk}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Genişlik</dt>
                          <dd className="font-medium">{motorcycle.specs.genişlik}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Yükseklik</dt>
                          <dd className="font-medium">{motorcycle.specs.yükseklik}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Sele Yüksekliği</dt>
                          <dd className="font-medium">{motorcycle.specs.seleYüksekliği}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Aks Aralığı</dt>
                          <dd className="font-medium">{motorcycle.specs.aksAralığı}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-gray-600">Ağırlık</dt>
                          <dd className="font-medium">{motorcycle.specs.ağırlık}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="p-4">
                  <p className="text-center text-gray-500 py-8">Bu model için aksesuarlar yakında eklenecek.</p>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>

          {/* Right column */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 mb-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Renk Seçenekleri</h3>
              <div className="flex space-x-3 mb-6">
                {motorcycle.colors.map((color, idx) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      selectedColor === idx ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: getColorCode(color) }}
                    onClick={() => setSelectedColor(idx)}
                    aria-label={color}
                  ></button>
                ))}
              </div>
              <p className="text-gray-700">Seçilen renk: <span className="font-medium">{motorcycle.colors[selectedColor]}</span></p>
            </div>

            <div className="bg-gray-50 p-6 mb-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Teslimat ve Garanti</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <TruckIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Ücretsiz Teslimat</h4>
                    <p className="text-sm text-gray-600">Tüm Türkiye'ye ücretsiz teslimat</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">2 Yıl Garanti</h4>
                    <p className="text-sm text-gray-600">Resmi Yamaha Türkiye garantisi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Ödeme Seçenekleri</h3>
              <p className="text-gray-700 mb-4">12 aya varan taksit seçenekleri ile SpeedHorizon'dan satın alabilirsiniz.</p>
              <Link href="/financing" className="text-blue-600 hover:text-blue-800 font-medium">
                Finansman seçeneklerini görüntüle
              </Link>
            </div>

            <div className="mt-8">
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Ödeme Seçenekleri</h3>
                <p>Kredi kartına 12 aya varan taksit imkanlarıyla bu motosikleti hemen satın alabilirsiniz.</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-xl font-semibold mb-4">Kullanıcı Yorumları</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      MB
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Mehmet B.</p>
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>
                  <p>Bu motosikleti 2 yıldır kullanıyorum ve performansından çok memnunum. Yakıt tüketimi oldukça ekonomik ve sürüş konforu üst düzeyde.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Benzer Modeller</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bu örnek için sabit olarak eklenmiş benzer ürünler */}
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="bg-white overflow-hidden group">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold group-hover:text-blue-600">Örnek Model {idx + 1}</h3>
                  <p className="text-sm text-gray-600 mb-3">Adventure</p>
                  <p className="font-semibold">350,000 TL</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Renk isimlerini CSS renk kodlarına çeviren helper fonksiyon
function getColorCode(colorName: string): string {
  const colorMap: Record<string, string> = {
    'Siyah': '#000000',
    'Mavi': '#003399',
    'Gri': '#808080',
    'Kırmızı': '#cc0000',
  };
  
  return colorMap[colorName] || '#000000';
} 