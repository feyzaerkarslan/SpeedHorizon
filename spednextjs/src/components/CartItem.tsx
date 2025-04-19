"use client";

import { CartItem as CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { motorcycle, quantity } = item;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQuantity(motorcycle.id, parseInt(e.target.value));
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="relative h-20 w-20 flex-shrink-0 mr-4">
        <Image
          src={motorcycle.imageUrl}
          alt={motorcycle.model}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium">SpeedHorizon {motorcycle.model}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {motorcycle.cc} cc
        </p>
        <div className="flex items-center mt-2">
          <label htmlFor={`quantity-${motorcycle.id}`} className="mr-2 text-sm">
            Adet:
          </label>
          <select
            id={`quantity-${motorcycle.id}`}
            value={quantity}
            onChange={handleQuantityChange}
            className="border rounded p-1 text-sm mr-4"
          >
            {[...Array(motorcycle.stock)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeItem(motorcycle.id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Kaldır
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-bold">{formatPrice(motorcycle.price)}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Toplam: {formatPrice(motorcycle.price * quantity)}
        </span>
      </div>
    </div>
  );
} 