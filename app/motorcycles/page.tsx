'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdjustmentsHorizontalIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useAuth } from '@/src/contexts/AuthContext';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function MotorcyclesPage() {
  const [motorcycles, setMotorcycles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const { user, addToFavorites, removeFromFavorites, getFavorites } = useAuth();
  
  // Filtreleme state'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [engineSize, setEngineSize] = useState('');
  const [powerRange, setPowerRange] = useState([0, 200]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/motorcycles`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setMotorcycles(data.data);
      })
      .catch(err => {
        console.error('API isteği başarısız:', err);
      });
  }, []);

  const loadFavorites = useCallback(async () => {
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
  }, [getFavorites]);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user, loadFavorites]);

  const handleFavoriteToggle = async (motorcycleId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }

    try {
      const isFavorite = favorites.includes(motorcycleId);
      
      if (isFavorite) {
        await removeFromFavorites(motorcycleId, 'Motorcycle');
        setFavorites(prev => prev.filter(id => id !== motorcycleId));
        toast.success('Favorilerden çıkarıldı.');
      } else {
        await addToFavorites(motorcycleId, 'Motorcycle');
        setFavorites(prev => [...prev, motorcycleId]);
        toast.success('Favorilere eklendi.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu.';
      toast.error(errorMessage);
    }
  };

  const categories = [
    'Tümü',
    'Adventure',
    'Hyper Naked',
    'Off Road',
    'Sport Heritage',
    'Sport Touring',
    'Supersport'
  ];

  // Gelişmiş filtreleme fonksiyonu
  const filteredMotorcycles = motorcycles.filter(moto => {
    // Kategori filtresi
    const matchesCategory = activeCategory === 'Tümü' || moto.category === activeCategory;
    
    // Arama filtresi
    const matchesSearch = searchQuery === '' || 
      moto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moto.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Fiyat filtresi
    const matchesPrice = moto.price >= priceRange[0] && moto.price <= priceRange[1];
    
    // Motor hacmi filtresi
    const matchesEngineSize = engineSize === '' || 
      moto.engineSize?.toString().includes(engineSize);
    
    // Güç filtresi
    const matchesPower = moto.power >= powerRange[0] && moto.power <= powerRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice && matchesEngineSize && matchesPower;
  });

  // Filtreleri sıfırla
  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 1000000]);
    setEngineSize('');
    setPowerRange([0, 200]);
  };

  return (
    <div className="bg-white">
      {/* Hero banner */}
      <div className="bg-black text-white relative h-[40vh] min-h-[320px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <div className="absolute inset-0 bg-[url('/motorcycles-hero.jpg')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-20">
          <h1 className="text-5xl font-bold mb-4">Motor Modelleri</h1>
          <p className="text-lg mb-8">
            SpeedHorizon motosikletleri, tutkunun ve mühendisliğin mükemmel birleşimidir. Her model, sürücüsüne benzersiz bir deneyim sunmak için tasarlanmıştır.
          </p>
        </div>
      </div>

      {/* Category navigation */}
      <div className="sticky top-16 bg-white border-b border-gray-200 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Category tabs for desktop */}
            <div className="hidden md:flex space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                    activeCategory === category
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile dropdown */}
            <div className="md:hidden w-full">
              <button
                className="flex items-center justify-between w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>{activeCategory}</span>
                <ChevronDownIcon className="h-5 w-5" />
              </button>
              {showFilters && (
                <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setActiveCategory(category);
                        setShowFilters(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters button */}
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Filtreler</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Arama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Model adı ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Fiyat Aralığı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat: {priceRange[0].toLocaleString('tr-TR')} - {priceRange[1].toLocaleString('tr-TR')} TL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000000])}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Motor Hacmi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Motor Hacmi</label>
                <input
                  type="text"
                  placeholder="cc (örn: 600)"
                  value={engineSize}
                  onChange={(e) => setEngineSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Güç Aralığı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Güç: {powerRange[0]} - {powerRange[1]} HP
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min HP"
                    value={powerRange[0]}
                    onChange={(e) => setPowerRange([parseInt(e.target.value) || 0, powerRange[1]])}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max HP"
                    value={powerRange[1]}
                    onChange={(e) => setPowerRange([powerRange[0], parseInt(e.target.value) || 200])}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Filtreleri Sıfırla */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Motorcycles grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredMotorcycles.length} motosiklet bulundu
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMotorcycles.map((motorcycle) => (
            <Link 
              key={motorcycle._id || motorcycle.id} 
              href={`/motorcycles/${motorcycle._id || motorcycle.id}`}
              className="group"
            >
              <div className="bg-gray-100 overflow-hidden aspect-w-16 aspect-h-9 rounded-lg relative">
                {/* Burada gerçek bir resim olmalı */}
                <Image
                  src={motorcycle.images?.[0] || '/placeholder.png'}
                  alt={motorcycle.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Favori butonu */}
                <button
                  onClick={(e) => handleFavoriteToggle(motorcycle._id || motorcycle.id, e)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                  disabled={loadingFavorites}
                >
                  {favorites.includes(motorcycle._id || motorcycle.id) ? (
                    <HeartIconSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIconSolid className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  )}
                </button>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {motorcycle.new && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Yeni</span>
                  )}
                  {motorcycle.popular && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">Popüler</span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                    {motorcycle.name}
                  </h3>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {motorcycle.category}
                  </span>
                </div>
                <p className="mt-2 font-medium text-lg">
                  {motorcycle.price?.toLocaleString('tr-TR')} TL
                </p>
                {/* Motor bilgileri */}
                <div className="mt-2 flex space-x-4 text-sm text-gray-600">
                  {motorcycle.engineSize && (
                    <span>{motorcycle.engineSize}cc</span>
                  )}
                  {motorcycle.power && (
                    <span>{motorcycle.power} HP</span>
                  )}
                </div>
                {/* Stok bilgisi */}
                <div className="mt-2">
                  <span className={`text-sm px-2 py-1 rounded ${
                    motorcycle.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {motorcycle.stock > 0 ? `Stok: ${motorcycle.stock} adet` : 'Stokta yok'}
                  </span>
                </div>
                <div className="mt-3 text-blue-600 text-sm font-medium group-hover:underline">
                  Detayları Görüntüle
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredMotorcycles.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700">Arama kriterlerinize uygun motosiklet bulunamadı.</h3>
            <p className="text-gray-500 mt-2">Farklı filtreler deneyebilir veya filtreleri sıfırlayabilirsiniz.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}
      </div>

      {/* Call to action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hayalinizdeki Motosikleti Bulamadınız mı?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            SpeedHorizon bayilerinde daha fazla model bulabilirsiniz. Size en yakın bayimizi ziyaret edin
            veya bir temsilci ile görüşün.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/dealers" className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors">
              Bayi Bulun
            </Link>
            <Link href="/contact" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 font-medium hover:bg-gray-50 transition-colors">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}