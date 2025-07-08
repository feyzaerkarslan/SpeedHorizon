'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCart } from '@/src/contexts/CartContext';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const { cartCount } = useCart();

  const menuItems = [
    { 
      name: 'Motor Modelleri', 
      href: '/motorcycles',
      subCategories: [
        { name: 'Adventure', href: '/motorcycles/adventure' },
        { name: 'Hyper Naked', href: '/motorcycles/hyper-naked' },
        { name: 'Off Road', href: '/motorcycles/off-road' },
        { name: 'Sport Heritage', href: '/motorcycles/sport-heritage' },
        { name: 'Sport Touring', href: '/motorcycles/sport-touring' },
        { name: 'Supersport', href: '/motorcycles/supersport' },
      ]
    },
    { 
      name: 'Scooter Modelleri', 
      href: '/scooters',
      subCategories: [
        { name: 'Sport', href: '/scooters/sport' },
        { name: 'Urban Mobility', href: '/scooters/urban-mobility' },
      ]
    },
    { 
      name: 'Yedek Parçalar', 
      href: '/spare-parts',
      subCategories: []
    },
    { 
      name: 'Aksesuarlar', 
      href: '/accessories',
      subCategories: []
    },
    { 
      name: 'Bayi & Servis', 
      href: '/dealers',
      subCategories: []
    },
    { name: 'İndirimli Ürünler', href: '/discounted-products', subCategories: [] },
  ];

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-800 py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center space-x-6 text-sm h-8">
          <Link href="/appointment" className="text-gray-300 hover:text-white transition-colors">Randevu Al</Link>
          <Link href="/feedback" className="text-gray-300 hover:text-white transition-colors">Şikayet/Öneri</Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-white">
                <span className="text-blue-500">SPEED</span>HORIZON
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-1">
              {menuItems.map((item) => (
                <div 
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setHoveredCategory(item.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    href={item.href}
                    className="px-3 py-5 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                  
                  {item.subCategories.length > 0 && hoveredCategory === item.name && (
                    <div className="absolute z-20 left-0 w-60 bg-white text-black mt-0 shadow-lg rounded-b-md overflow-hidden animate-fade-in-down">
                      {item.subCategories.map((subCat) => (
                        <Link
                          key={subCat.name}
                          href={subCat.href}
                          className="block px-4 py-2 hover:bg-gray-100 transition"
                        >
                          {subCat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/cart" className="relative text-white hover:text-blue-500 transition-colors">
                      <ShoppingCartIcon className="h-6 w-6" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                    <Link href="/profile" className="text-white hover:text-blue-500 transition-colors">
                      <UserIcon className="h-6 w-6" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/register"
                      className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors"
                    >
                      Üye Ol
                    </Link>
                    <Link
                      href="/auth/login"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Giriş Yap
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link href="/cart" className="relative text-white hover:text-blue-500 transition-colors mr-2">
                <ShoppingCartIcon className="h-6 w-6" />
                 {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                 )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
               <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
            ))}
            
            <div className="pt-4 pb-3 border-t border-gray-700">
               {!loading && (
                <>
                  {user ? (
                     <Link
                        href="/profile"
                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Profilim
                      </Link>
                  ) : (
                    <div className="flex flex-col space-y-2">
                       <Link
                        href="/auth/register"
                        className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Üye Ol
                      </Link>
                      <Link
                        href="/auth/login"
                        className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Giriş Yap
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
