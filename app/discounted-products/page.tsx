'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface DiscountedProduct {
  _id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  indirimliPrice?: number;
  type: string;
  href: string;
}

export default function DiscountedProductsPage() {
  const [products, setProducts] = useState<DiscountedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/discounted-products`)
        if (!res.ok) throw new Error('İndirimli ürünler getirilemedi.')
        const data = await res.json()
        let products = data
        if (Array.isArray(data)) {
          products = data.map((item: any) => ({
            _id: item._id,
            name: item.name,
            description: '',
            images: [item.image],
            price: item.originalPrice,
            indirimliPrice: item.discountedPrice,
            type: item.productType,
            href: `/${item.productType === 'motorcycle' ? 'motorcycles' : item.productType + 's'}/${item.productId}`
          }))
        } else if (data.success && Array.isArray(data.data)) {
          products = data.data
        }
        setProducts(products)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">İndirimli Ürünler</h1>
      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p>İndirimli ürün bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((item) => (
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
                    <p className="text-sm text-gray-500 line-through mb-1">{item.price.toLocaleString('tr-TR')} TL</p>
                    <p className="text-lg font-semibold text-blue-600 mb-2">{item.indirimliPrice ? item.indirimliPrice.toLocaleString('tr-TR') : item.price.toLocaleString('tr-TR')} TL</p>
                    <Link href={item.href} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors block text-center">
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