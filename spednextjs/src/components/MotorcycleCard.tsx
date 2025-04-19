"use client";

import { Motorcycle } from "@/data/motorcycles";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
}

export default function MotorcycleCard({ motorcycle }: MotorcycleCardProps) {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={motorcycle.imageUrl}
          alt={motorcycle.model}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">SpeedHorizon {motorcycle.model}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {motorcycle.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
            {motorcycle.cc} cc
          </span>
          <span className="font-bold text-lg">{formatPrice(motorcycle.price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Stok: {motorcycle.stock}
          </span>
          <button
            onClick={() => addItem(motorcycle)}
            disabled={motorcycle.stock === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
} 