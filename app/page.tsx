import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const categories = [
    {
      title: 'Motor Modelleri',
      href: '/motorcycles',
      description: 'En yeni ve güçlü motosiklet modelleri',
    },
    {
      title: 'Scooter Modelleri',
      href: '/scooters',
      description: 'Şehir içi ulaşım için ideal scooter seçenekleri',
    },
    {
      title: 'Yedek Parçalar',
      href: '/spare-parts',
      description: 'Orijinal yedek parça garantisi',
    },
    {
      title: 'Aksesuarlar',
      href: '/accessories',
      description: 'Sürüş deneyiminizi zenginleştirin',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        <div className="relative z-20 h-full flex flex-col justify-center items-start px-8 md:px-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            SpeedHorizon ile<br />Yolculuğa Çık
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Premium motosiklet modelleri, yedek parçalar ve aksesuarlar ile
            hayalinizdeki motosiklete sahip olun.
          </p>
          <Link
            href="/motorcycles"
            className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
          >
            Modelleri Keşfet
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
              {category.title}
            </h3>
            <p className="mt-2 text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Güvenli Ödeme</h3>
          <p className="text-gray-600">
            Kredi kartı veya nakit ödeme seçenekleriyle güvenli alışveriş
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Servis Ağı</h3>
          <p className="text-gray-600">
            Türkiye genelinde yaygın bayi ve servis ağı
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Taksit İmkanı</h3>
          <p className="text-gray-600">
            Uygun taksit seçenekleriyle motosiklet sahibi olun
          </p>
        </div>
      </div>
    </div>
  )
}
