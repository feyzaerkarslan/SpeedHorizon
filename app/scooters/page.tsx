'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useAuth } from '@/src/contexts/AuthContext';
import toast from 'react-hot-toast';

interface Scooter {
  _id: string;
  name: string;
  category: string;
  price: number;
  engine: string;
  power: string;
  weight: string;
  images: string[];
  features: string[];
  description: string;
  stock: number;
}

export default function Scooters() {
  const { user, addToFavorites, removeFromFavorites, getFavorites } = useAuth();
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'sport' | 'urban-mobility'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  useEffect(() => {
    const fetchScooters = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scooters`);
        const result = await response.json();
        if (result.success) {
          setScooters(result.data);
        } else {
          throw new Error('Skuter verileri alınamadı.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Skuterler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchScooters();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoadingFavorites(true);
      const userFavorites = await getFavorites();
      const favoriteIds = userFavorites.map(fav => fav._id);
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user, loadFavorites]);

  const handleFavoriteToggle = async (scooterId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }

    try {
      const isFavorite = favorites.includes(scooterId);
      
      if (isFavorite) {
        await removeFromFavorites(scooterId, 'Scooter');
        setFavorites(prev => prev.filter(id => id !== scooterId));
        toast.success('Favorilerden çıkarıldı.');
      } else {
        await addToFavorites(scooterId, 'Scooter');
        setFavorites(prev => [...prev, scooterId]);
        toast.success('Favorilere eklendi.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu.';
      toast.error(errorMessage);
    }
  };

  const filteredScooters = selectedCategory === 'all'
    ? scooters
    : scooters.filter(scooter => scooter.category.toLowerCase().includes(selectedCategory));

  if (loading) {
    return <div className="text-center py-20">Skuterler yükleniyor...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Scooter Modelleri</h1>

      {/* Kategori Filtreleri */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tüm Modeller
        </button>
        <button
          onClick={() => setSelectedCategory('sport')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'sport'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sport
        </button>
        <button
          onClick={() => setSelectedCategory('urban-mobility')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'urban-mobility'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Urban Mobility
        </button>
      </div>

      {/* Scooter Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredScooters.map((scooter) => (
          <div
            key={scooter._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={scooter.images?.[0] || '/placeholder.png'}
                alt={scooter.name}
                fill
                className="object-cover"
              />
              
              {/* Favori butonu */}
              <button
                onClick={(e) => handleFavoriteToggle(scooter._id, e)}
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                disabled={loadingFavorites}
              >
                {favorites.includes(scooter._id) ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
                )}
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{scooter.name}</h3>
              <p className="text-gray-600 mb-4">{scooter.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Motor</p>
                  <p className="font-medium">{scooter.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Güç</p>
                  <p className="font-medium">{scooter.power}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ağırlık</p>
                  <p className="font-medium">{scooter.weight}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">{scooter.price.toLocaleString()} ₺</span>
                <Link
                  href={`/scooters/${scooter._id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  Detaylı Bilgi
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              {/* Stok bilgisi */}
              <div className="mt-2">
                <span className={`text-sm px-2 py-1 rounded ${
                  scooter.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {scooter.stock > 0 ? `Stok: ${scooter.stock} adet` : 'Stokta yok'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Özellikler Tablosu */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Model Karşılaştırma</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Güç
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ağırlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fiyat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredScooters.map((scooter) => (
                <tr key={scooter._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{scooter.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{scooter.engine}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{scooter.power}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{scooter.weight}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{scooter.price.toLocaleString()} ₺</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 