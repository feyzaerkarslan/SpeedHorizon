'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResult {
  _id: string;
  name: string;
  description: string;
  images: string[];
  type: 'motorcycle' | 'scooter' | 'spare-part' | 'accessory';
  href: string;
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          setLoading(true)
          // API URL'ini ortam değişkeninden al
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
          const res = await fetch(`${apiUrl}/api/search?q=${encodeURIComponent(query)}`)
          if (!res.ok) {
            throw new Error('Arama sonuçları getirilemedi.')
          }
          const data = await res.json()
          if (data.success) {
            setResults(data.data)
          } else {
            throw new Error(data.message || 'Bir hata oluştu.')
          }
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Bir hata oluştu.';
          setError(errorMessage);
        } finally {
          setLoading(false)
        }
      }
      fetchResults()
    } else {
      setLoading(false)
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Arama Sonuçları: <span className="text-blue-600">{query}</span>
      </h1>

      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <>
          {results.length === 0 ? (
            <p>Aramanızla eşleşen sonuç bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                  <div className="relative h-48">
                    <Image
                      src={item.images?.[0] || '/placeholder.png'}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                    <p className="text-gray-600 text-sm mb-4 truncate">{item.description}</p>
                    <Link 
                      href={item.href}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Detayları Gör
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <SearchPageContent />
    </Suspense>
  );
} 