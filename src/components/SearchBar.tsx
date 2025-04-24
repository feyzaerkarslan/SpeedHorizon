'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
}

// Örnek arama sonuçları
const mockResults: SearchResult[] = [
  {
    id: 1,
    name: 'SpeedMaster 650',
    category: 'Motor',
    price: 249999,
    image: '/motorcycle-1.jpg',
  },
  {
    id: 2,
    name: 'RoadKing 1000',
    category: 'Motor',
    price: 399999,
    image: '/motorcycle-2.jpg',
  },
  {
    id: 3,
    name: 'CityRunner 125',
    category: 'Scooter',
    price: 89999,
    image: '/motorcycle-3.jpg',
  },
  {
    id: 4,
    name: 'Motosiklet Kaskı',
    category: 'Aksesuar',
    price: 2499,
  },
  {
    id: 5,
    name: 'Motosiklet Montu',
    category: 'Aksesuar',
    price: 3999,
  },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length >= 2) {
      // Gerçek bir uygulamada burada API çağrısı yapılır
      const filteredResults = mockResults.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setIsSearching(true);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setIsSearching(false);
    }
  };

  return (
    <div className="relative max-w-2xl w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Motor, yedek parça veya aksesuar ara..."
          className="w-full px-4 py-3 pl-12 pr-10 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </form>

      {/* Arama Sonuçları Dropdown */}
      {isSearching && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/product/${result.id}`}
                className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => {
                  setQuery('');
                  setIsSearching(false);
                }}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                  {result.image && (
                    <div className="w-full h-full bg-gray-200 rounded-lg" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{result.name}</h4>
                  <p className="text-sm text-gray-500">{result.category}</p>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600">
                    {result.price.toLocaleString('tr-TR')} TL
                  </p>
                </div>
              </Link>
            ))}
            {/* Tüm sonuçları göster linki */}
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="block text-center py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border-t"
              onClick={() => {
                setQuery('');
                setIsSearching(false);
              }}
            >
              Tüm sonuçları göster
            </Link>
          </div>
        </div>
      )}

      {/* Sonuç bulunamadı */}
      {isSearching && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4 text-center text-gray-500">
            Aramanızla eşleşen sonuç bulunamadı.
          </div>
        </div>
      )}
    </div>
  );
}
