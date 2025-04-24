'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import SearchBar from '@/components/SearchBar';

interface SearchResult {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
}

// Örnek arama sonuçları
const mockResults: SearchResult[] = [
  {
    id: 1,
    name: 'SpeedMaster 650',
    category: 'Motor',
    price: 249999,
    image: '/motorcycle-1.jpg',
    description: '650cc motor hacmi, 65 HP güç, ABS fren sistemi',
  },
  {
    id: 2,
    name: 'RoadKing 1000',
    category: 'Motor',
    price: 399999,
    image: '/motorcycle-2.jpg',
    description: '1000cc motor hacmi, 125 HP güç, gelişmiş süspansiyon sistemi',
  },
  {
    id: 3,
    name: 'CityRunner 125',
    category: 'Scooter',
    price: 89999,
    image: '/motorcycle-3.jpg',
    description: '125cc motor hacmi, ekonomik yakıt tüketimi',
  },
  {
    id: 4,
    name: 'Motosiklet Kaskı',
    category: 'Aksesuar',
    price: 2499,
    description: 'ECE sertifikalı, full face kask',
  },
  {
    id: 5,
    name: 'Motosiklet Montu',
    category: 'Aksesuar',
    price: 3999,
    description: 'Su geçirmez, koruyucu pedli mont',
  },
];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    // Gerçek bir uygulamada burada API çağrısı yapılır
    let filtered = mockResults.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
    );

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Fiyat filtresi
    if (priceRange !== 'all') {
      filtered = filtered.filter((item) => {
        switch (priceRange) {
          case 'under-100000':
            return item.price < 100000;
          case '100000-250000':
            return item.price >= 100000 && item.price < 250000;
          case 'over-250000':
            return item.price >= 250000;
          default:
            return true;
        }
      });
    }

    setResults(filtered);
  }, [query, selectedCategory, priceRange]);

  const categories = Array.from(new Set(mockResults.map((item) => item.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtreler */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filtreler
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">Tümü</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat Aralığı
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">Tümü</option>
                  <option value="under-100000">100.000 TL altı</option>
                  <option value="100000-250000">100.000 TL - 250.000 TL</option>
                  <option value="over-250000">250.000 TL üzeri</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sonuçlar */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">
            &quot;{query}&quot; için arama sonuçları ({results.length})
          </h2>

          <div className="space-y-6">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/product/${result.id}`}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-4"
              >
                <div className="flex gap-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0">
                    {result.image && (
                      <div className="w-full h-full bg-gray-200 rounded-lg" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{result.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{result.category}</p>
                    {result.description && (
                      <p className="text-gray-600 text-sm mb-4">{result.description}</p>
                    )}
                    <p className="text-lg font-semibold text-blue-600">
                      {result.price.toLocaleString('tr-TR')} TL
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {results.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">Aramanızla eşleşen sonuç bulunamadı.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Farklı anahtar kelimeler deneyebilir veya filtreleri değiştirebilirsiniz.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
