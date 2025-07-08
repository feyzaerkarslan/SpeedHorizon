'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCartIcon, MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '@/src/contexts/CartContext';
import { useAuth } from '@/src/contexts/AuthContext';
import toast from 'react-hot-toast';

interface SparePart {
  _id: string;
  name: string;
  category: 'motor' | 'fren' | 'elektrik' | 'gövde' | 'lastik';
  price: number;
  stock: number;
  images: string[];
  description: string;
  compatibleModels: string[];
}

export default function SpareParts() {
  const { addToCart } = useCart();
  const { user, addToFavorites, removeFromFavorites, getFavorites } = useAuth();
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'motor' | 'fren' | 'elektrik' | 'gövde' | 'lastik'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/spareparts');
        const result = await response.json();
        if (result.success) {
          setSpareParts(result.data);
        } else {
          throw new Error('Yedek parça verileri alınamadı.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Yedek parçalar yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchSpareParts();
  }, []);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

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

  const handleFavoriteToggle = async (partId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }

    try {
      const isFavorite = favorites.includes(partId);
      
      if (isFavorite) {
        await removeFromFavorites(partId, 'SparePart');
        setFavorites(prev => prev.filter(id => id !== partId));
        toast.success('Favorilerden çıkarıldı.');
      } else {
        await addToFavorites(partId, 'SparePart');
        setFavorites(prev => [...prev, partId]);
        toast.success('Favorilere eklendi.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Bir hata oluştu.');
    }
  };

  const handleAddToCart = (part: SparePart) => {
    addToCart(part._id, 'SparePart', 1);
  };

  const filteredParts = spareParts.filter(part => {
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="text-center py-20">Yedek parçalar yükleniyor...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Yedek Parçalar
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Aracınızın performansını ve güvenliğini orijinal parçalarla koruyun.
        </p>
      </div>

      {/* Arama ve Filtreler */}
      <div className="mb-8 sticky top-16 bg-white bg-opacity-80 backdrop-blur-sm py-4 z-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Yedek parça ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['all', 'motor', 'fren', 'elektrik', 'gövde', 'lastik'].map(category => (
               <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Parça Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredParts.map((part) => (
          <div
            key={part._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-56">
              <Image
                src={part.images?.[0] || '/placeholder.png'}
                alt={part.name}
                fill
                className="object-cover"
              />
              
              {/* Favori butonu */}
              <button
                onClick={(e) => handleFavoriteToggle(part._id, e)}
                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                disabled={loadingFavorites}
              >
                {favorites.includes(part._id) ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
                )}
              </button>
              
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                Stok: {part.stock}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{part.name}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">{part.description}</p>
              
              <div className="flex justify-between items-center mt-auto pt-4">
                <p className="text-xl font-bold text-gray-900">
                  {part.price.toLocaleString('tr-TR')} TL
                </p>
                 <button
                  onClick={() => handleAddToCart(part)}
                  disabled={part.stock === 0}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Ekle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredParts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-700">Arama kriterlerinize uygun yedek parça bulunamadı.</h3>
          <p className="text-gray-500 mt-2">Farklı bir kategori veya arama terimi deneyebilirsiniz.</p>
        </div>
      )}
    </div>
  );
} 