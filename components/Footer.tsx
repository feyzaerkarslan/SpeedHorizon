'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const menuGroups = [
    {
      title: 'Kurumsal',
      items: [
        { name: 'Hakkımızda', href: '/about' },
        { name: 'Markalarımız', href: '/brands' },
        { name: 'Kariyer', href: '/careers' },
        { name: 'İletişim', href: '/contact' },
      ]
    },
    {
      title: 'Ürünler',
      items: [
        { name: 'Motor Modelleri', href: '/motorcycles' },
        { name: 'Scooter Modelleri', href: '/scooters' },
        { name: 'Yedek Parçalar', href: '/spare-parts' },
        { name: 'Aksesuarlar', href: '/accessories' },
      ]
    },
    {
      title: 'Hizmetler',
      items: [
        { name: 'Servis', href: '/service' },
        { name: 'Garanti', href: '/warranty' },
        { name: 'Bayi & Servis Ağı', href: '/dealers' },
        { name: 'Sürüş Eğitimi', href: '/training' },
      ]
    },
    {
      title: 'Müşteri Hizmetleri',
      items: [
        { name: 'Randevu Al', href: '/appointment' },
        { name: 'Şikayet/Öneri', href: '/feedback' },
        { name: 'Sıkça Sorulan Sorular', href: '/faq' },
        { name: 'Kullanım Kılavuzları', href: '/manuals' },
      ]
    }
  ];

  const paymentMethods = [
    { id: 'visa', name: 'Visa' },
    { id: 'mastercard', name: 'Mastercard' },
    { id: 'amex', name: 'American Express' },
    { id: 'troy', name: 'Troy' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand and Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-extrabold text-white">
                <span className="text-blue-500">SPEED</span>HORIZON
              </span>
            </Link>
            <address className="not-italic mb-6 text-gray-400">
              <p>Ataşehir, İstanbul</p>
              <p>Türkiye</p>
              <p className="mt-4">
                <a href="tel:+902165551234" className="hover:text-blue-400">+90 216 555 12 34</a>
              </p>
              <p>
                <a href="mailto:info@speedhorizon.com" className="hover:text-blue-400">info@speedhorizon.com</a>
              </p>
            </address>
            <div className="flex space-x-4 mb-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Menu Groups */}
          {menuGroups.map((group) => (
            <div key={group.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-blue-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap gap-4 justify-center">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white text-gray-900 px-3 py-1 rounded">
                {method.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} SpeedHorizon. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">
                Kullanım Koşulları
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">
                Gizlilik Politikası
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-gray-300 text-sm">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 