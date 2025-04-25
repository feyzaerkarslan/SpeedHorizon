'use client';

import { TrashIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="w-24 h-24 relative bg-gray-100 rounded">
        <div className="absolute inset-0 bg-gray-200" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-blue-600 font-bold">{price.toLocaleString('tr-TR')} TL</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => quantity > 1 && onUpdateQuantity(id, quantity - 1)}
            className="w-8 h-8 flex items-center justify-center border rounded"
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="p-2 text-red-500 hover:text-red-700"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
