"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { useState } from "react";
import Link from "next/link";

export default function Cart() {
  const { 
    items, 
    totalPrice, 
    totalItems, 
    clearCart, 
    getDiscountedTotal, 
    getSavingsAmount 
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  const discountedTotal = getDiscountedTotal();
  const savingsAmount = getSavingsAmount();
  const hasDiscountedItems = savingsAmount > 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
        <span>Sepetim ({totalItems})</span>
        {hasDiscountedItems && (
          <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            İndirim!
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold">Sepetim ({totalItems})</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Sepetiniz boş
              </div>
            ) : (
              items.map((item) => <CartItem key={item.motorcycle.id} item={item} />)
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {hasDiscountedItems && (
                <div className="mb-3 bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Normal Fiyat:</span>
                    <span className="line-through">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-600 dark:text-red-400">
                    <span>Tasarruf:</span>
                    <span>-{formatPrice(savingsAmount)}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mb-4">
                <span className="font-bold">Toplam:</span>
                <span className="font-bold">
                  {hasDiscountedItems ? formatPrice(discountedTotal) : formatPrice(totalPrice)}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Sepeti Temizle
                </button>
                <Link 
                  href="/checkout"
                  className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
                >
                  Siparişi Tamamla
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 