"use client";

import { motorcycles } from "@/data/motorcycles";
import MotorcycleCard from "@/components/MotorcycleCard";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function MotorcyclesPage() {
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "cc-asc" | "cc-desc">("default");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and sort motorcycles
  const filteredMotorcycles = motorcycles
    .filter((moto) => 
      moto.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moto.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "cc-asc":
          return a.cc - b.cc;
        case "cc-desc":
          return b.cc - a.cc;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">SpeedHorizon Motorsikletleri</h1>
          
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Motorsiklet ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="sortBy" className="mr-2 text-gray-700 dark:text-gray-300">
                Sırala:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Varsayılan</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="cc-asc">Motor Hacmi: Düşükten Yükseğe</option>
                <option value="cc-desc">Motor Hacmi: Yüksekten Düşüğe</option>
              </select>
            </div>
          </div>
          
          {filteredMotorcycles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Arama kriterlerine uygun motorsiklet bulunamadı.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMotorcycles.map((motorcycle) => (
                <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2024 SpeedHorizon Motorsiklet. Tüm hakları saklıdır.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">Gizlilik Politikası</a>
              <a href="#" className="hover:text-blue-400">Kullanım Şartları</a>
              <a href="#" className="hover:text-blue-400">İletişim</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 