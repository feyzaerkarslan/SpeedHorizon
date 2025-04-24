'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  CubeIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    name: 'Panel',
    href: '/admin',
    icon: ChartBarIcon,
  },
  {
    name: 'Stok Yönetimi',
    href: '/admin/stock',
    icon: CubeIcon,
  },
  {
    name: 'Kullanıcılar',
    href: '/admin/users',
    icon: UserGroupIcon,
  },
  {
    name: 'Siparişler',
    href: '/admin/orders',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Ayarlar',
    href: '/admin/settings',
    icon: CogIcon,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  SpeedHorizon Admin
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500">Admin Paneli</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] fixed">
          <nav className="mt-5 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`mr-4 h-6 w-6 ${
                      pathname === item.href ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col pl-64">
          <main className="flex-1 relative focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
