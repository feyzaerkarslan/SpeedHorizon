'use client';

import { useCart } from '@/src/contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface MotorcycleActionsProps {
  motorcycleId: string;
}

export default function MotorcycleActions({ motorcycleId }: MotorcycleActionsProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(motorcycleId, 'Motorcycle', 1);
  };

  return (
    <div className="flex space-x-4">
      <button 
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors rounded-md flex items-center"
      >
        <ShoppingCartIcon className="w-5 h-5 mr-2" />
        Sepete Ekle
      </button>
    </div>
  );
} 