'use client';

import { useState } from 'react';
import { getMotorcyclesByCategory, Motorcycle, filterMotorcyclesByPower, filterMotorcyclesByColor, filterMotorcyclesByPrice } from '@/data/motorcycles';
import ProductCard from '@/components/ProductCard';

export default function MotorcycleModels() {
  const motorcycles = getMotorcyclesByCategory('Motor');
  
  const [filteredMotorcycles, setFilteredMotorcycles] = useState<Motorcycle[]>(motorcycles);
  const [minPower, setMinPower] = useState<number>(0);
  const [maxPower, setMaxPower] = useState<number>(250);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [sortOrder, setSortOrder] = useState<string>('featured'); 
  
  
  const colors = Array.from(new Set(motorcycles.map(m => m.color)));
  
  // Min ve Max beygir gücü değerlerini bulunuyor
  const powerValues = motorcycles
    .filter(m => m.power) // Güç değeri olmayanları filtrele
    .map(m => parseInt(m.power!.split(' ')[0])); // HP değerlerini al
  
  const minPowerValue = Math.min(...powerValues);
  const maxPowerValue = Math.max(...powerValues);
  
  // Filtreleri uygula
  const applyFilters = () => {
    let filtered = motorcycles;
    
    // Beygir gücü filtresi
    if (minPower > 0 || maxPower < maxPowerValue) {
      filtered = filterMotorcyclesByPower(minPower, maxPower);
    }
    
    // Renk filtresi
    if (selectedColor) {
      filtered = filterMotorcyclesByColor(selectedColor);
    }
    
    // Fiyat filtresi
    if (minPrice > 0 || maxPrice < 1000000) {
      filtered = filterMotorcyclesByPrice(minPrice, maxPrice);
    }
    
    // Sıralama
    if (sortOrder === 'price-asc') {
      filtered = [...filtered].sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
    } else if (sortOrder === 'price-desc') {
      filtered = [...filtered].sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
    }
    
    setFilteredMotorcycles(filtered);
  };
  
  // Filtreleri sıfırla
  const resetFilters = () => {
    setMinPower(0);
    setMaxPower(maxPowerValue);
    setSelectedColor('');
    setMinPrice(0);
    setMaxPrice(1000000);
    setSortOrder('featured');
    setFilteredMotorcycles(motorcycles);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Motor Modelleri</h1>
      <p className="text-gray-600 mb-8">Gücü ve performansı bir arada sunan motor modellerimizi keşfedin.</p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filtre bölümü */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Filtreler</h2>
            
            {/* Motor Gücü Filtresi */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Motor Gücü</h3>
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="range" 
                  min={minPowerValue} 
                  max={maxPowerValue} 
                  value={minPower} 
                  onChange={(e) => setMinPower(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm">{minPower} HP</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min={minPowerValue} 
                  max={maxPowerValue} 
                  value={maxPower} 
                  onChange={(e) => setMaxPower(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm">{maxPower} HP</span>
              </div>
            </div>
            
            {/* Renk Filtresi */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Renkler</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    id="all-colors" 
                    type="radio" 
                    name="color" 
                    checked={selectedColor === ''}
                    onChange={() => setSelectedColor('')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="all-colors" className="ms-2 text-sm font-medium text-gray-900">
                    Tüm Renkler
                  </label>
                </div>
                
                {colors.map((color) => (
                  <div key={color} className="flex items-center">
                    <input 
                      id={`color-${color}`} 
                      type="radio" 
                      name="color" 
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`color-${color}`} className="ms-2 text-sm font-medium text-gray-900">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fiyat Filtresi */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Fiyat Aralığı</h3>
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="range" 
                  min={0} 
                  max={1000000} 
                  step={10000}
                  value={minPrice} 
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm">{minPrice.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min={0} 
                  max={1000000} 
                  step={10000}
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm">{maxPrice.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
            
            {/* Filtre Butonları */}
            <div className="flex gap-2 mt-8">
              <button 
                onClick={applyFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 flex-1"
              >
                Filtrele
              </button>
              <button 
                onClick={resetFilters}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
              >
                Sıfırla
              </button>
            </div>
          </div>
        </div>
        
        {/* Ürün listesi */}
        <div className="lg:w-3/4">
          {/* Sıralama ve sonuç sayısı */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-gray-600">{filteredMotorcycles.length} ürün listeleniyor</span>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sırala:</label>
              <select 
                id="sort" 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
              >
                <option value="featured">Öne Çıkanlar</option>
                <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
                <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
              </select>
            </div>
          </div>
          
          {/* Ürün grid */}
          {filteredMotorcycles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMotorcycles.map((motorcycle) => (
                <ProductCard key={motorcycle.id} product={motorcycle} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Üzgünüz, aradığınız kriterlere uygun ürün bulunamadı.</h3>
              <p className="text-gray-600 mb-4">Lütfen filtreleri değiştirerek tekrar deneyin.</p>
              <button 
                onClick={resetFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
