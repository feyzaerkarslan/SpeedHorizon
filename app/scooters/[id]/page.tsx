'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, CheckIcon, TruckIcon, ShieldCheckIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/src/contexts/CartContext';
import toast from 'react-hot-toast';

// Bu tip tanımını API'den gelen veriye göre genişletebilirsiniz
interface Scooter {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  engine: string;
  power: string;
  weight: string;
  features: string[];
  stock: number;
  specs: { [key: string]: string };
}

export default function ScooterDetail({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { addToCart } = useCart();
  const [scooter, setScooter] = useState<Scooter | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'features'>('overview');

  useEffect(() => {
    const fetchScooter = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scooters/${params.id}`);
        const result = await response.json();
        if (result.success) {
          setScooter(result.data);
        } else {
          throw new Error('Scooter verisi alınamadı.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Scooter yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchScooter();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!scooter) return;
    addToCart(scooter._id, 'Scooter', 1);
  };

  if (loading) {
    return <div className="text-center py-20">Yükleniyor...</div>;
  }

  if (!scooter) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Scooter bulunamadı</h1>
        <Link href="/scooters" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Tüm Scooter&apos;lar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/scooters"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Tüm Scooter&apos;lar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={scooter.images?.[0] || '/placeholder.png'}
            alt={scooter.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{scooter.name}</h1>
          <p className="text-gray-600 mb-6 text-lg">{scooter.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Motor</p>
              <p className="font-medium text-lg">{scooter.engine}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Güç</p>
              <p className="font-medium text-lg">{scooter.power}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Ağırlık</p>
              <p className="font-medium text-lg">{scooter.weight}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              {scooter.price.toLocaleString('tr-TR')} TL
            </h2>
            <button 
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-lg font-semibold"
            >
              <ShoppingCartIcon className="w-6 h-6 mr-2" />
              Sepete Ekle
            </button>
          </div>

          {/* Sekmeler */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Genel Bakış
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'specs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Teknik Özellikler
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'features'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Özellikler
              </button>
            </nav>
          </div>

          {/* Sekme İçerikleri */}
          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="prose max-w-none">
                <p className="text-lg mb-6">{scooter.description}</p>
                <h3 className="text-xl font-bold mb-4">Ana Özellikler</h3>
                <ul className="space-y-2">
                  {scooter.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Motor ve Performans</h3>
                  <dl className="space-y-2">
                    {scooter.specs && Object.entries(scooter.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <dt className="text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                        <dd className="font-medium text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Standart Özellikler</h3>
                  <ul className="space-y-2">
                    {scooter.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Önerilen Aksesuarlar</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Premium Kask</h4>
                        <p className="text-sm text-gray-600">ECE 22.05 Sertifikalı</p>
                      </div>
                      <button 
                        onClick={() => toast.success('Kask sepete eklendi!')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Sepete Ekle
                      </button>
                    </li>
                    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Yağmurluk Seti</h4>
                        <p className="text-sm text-gray-600">Su Geçirmez, Nefes Alabilen</p>
                      </div>
                      <button 
                        onClick={() => toast.success('Yağmurluk seti sepete eklendi!')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Sepete Ekle
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Garanti ve Teslimat Bilgileri */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Teslimat ve Garanti</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <TruckIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Ücretsiz Teslimat</h4>
                <p className="text-sm text-gray-600">Tüm Türkiye&apos;ye ücretsiz teslimat</p>
              </div>
            </div>
            <div className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium">2 Yıl Garanti</h4>
                <p className="text-sm text-gray-600">Resmi SpeedHorizon garantisi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Ödeme Seçenekleri</h3>
          <p className="text-gray-700 mb-4">12 aya varan taksit seçenekleri ile SpeedHorizon&apos;dan satın alabilirsiniz.</p>
          <Link href="/financing" className="text-blue-600 hover:text-blue-800 font-medium">
            Finansman seçeneklerini görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
} 