import { useState } from 'react';
import Link from 'next/link';
import { Motorcycle } from '@/data/motorcycles';
import { formatCurrency, calculateDiscountPercentage } from '@/data/utils';
import { Cart } from '@/data/cart';
import { addToFavorites, removeFromFavorites, isFavorite } from '@/data/user';

interface ProductCardProps {
  product: Motorcycle;
  onAddToCart?: (product: Motorcycle) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isFav, setIsFav] = useState(isFavorite(product.id));
  
  const handleAddToCart = () => {
    Cart.addItem(product, 1);
    if (onAddToCart) onAddToCart(product);
  };
  
  const toggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(product.id);
      setIsFav(false);
    } else {
      addToFavorites(product.id);
      setIsFav(true);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-200 relative">
      {/* İndirim etiketi */}
      {product.discountedPrice && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
          %{calculateDiscountPercentage(product.price, product.discountedPrice)} İndirim
        </div>
      )}
      
      {/* Favori butonu */}
      <button 
        onClick={toggleFavorite}
        className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        aria-label={isFav ? "Favorilerden çıkar" : "Favorilere ekle"}
      >
        {isFav ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        )}
      </button>
      
      {/* Ürün resmi */}
      <Link href={`/urun/${product.id}`}>
        <div className="h-48 bg-gray-200 relative">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${product.image})` }}></div>
        </div>
      </Link>
      
      <div className="p-6">
        {/* Ürün adı */}
        <Link href={`/urun/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition">{product.name}</h3>
        </Link>
        
        {/* Kategori ve özellikler */}
        <div className="mb-3 flex gap-2 flex-wrap">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {product.category}
          </span>
          {product.power && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {product.power}
            </span>
          )}
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {product.color}
          </span>
        </div>
        
        {/* Fiyat */}
        <div className="flex items-center mb-4">
          {product.discountedPrice ? (
            <>
              <span className="text-gray-400 line-through mr-2">{formatCurrency(product.price)}</span>
              <span className="text-xl font-bold text-blue-600">{formatCurrency(product.discountedPrice)}</span>
            </>
          ) : (
            <span className="text-xl font-bold text-blue-600">{formatCurrency(product.price)}</span>
          )}
        </div>
        
        {/* Stok durumu */}
        <div className="flex justify-between items-center mb-4">
          {product.stock > 0 ? (
            <span className={`text-sm ${product.stock < 5 ? 'text-amber-500' : 'text-green-500'}`}>
              {product.stock < 5 ? `Son ${product.stock} ürün` : 'Stokta var'}
            </span>
          ) : (
            <span className="text-sm text-red-500">Stokta yok</span>
          )}
          
          {/* Taksit bilgisi */}
          {product.installmentOptions && product.installmentOptions.length > 0 && (
            <span className="text-xs text-gray-500">
              {product.installmentOptions[product.installmentOptions.length - 1]} taksit seçeneği
            </span>
          )}
        </div>
        
        {/* Sepete ekle butonu */}
        <button 
          onClick={handleAddToCart}
          className={`w-full font-medium py-2 px-4 rounded transition duration-300 ${
            product.stock > 0 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
        </button>
      </div>
    </div>
  );
} 