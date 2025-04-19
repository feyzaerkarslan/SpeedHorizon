import Link from 'next/link';
import { getDiscountedMotorcycles, getMotorcyclesByCategory } from '../data/motorcycles';
import { formatCurrency, calculateDiscountPercentage } from '../data/utils';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-50"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        ></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">SpeedHorizon: Tutkuyla Sürüş</h1>
            <p className="text-xl mb-8">En yeni motosiklet modelleri, aksesuarlar ve profesyonel servis hizmetiyle yanınızdayız.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/motor-modelleri" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center">
                Motor Modelleri
              </Link>
              <Link href="/randevu-olustur" className="bg-transparent hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-6 rounded-lg border-2 border-white transition duration-300 text-center">
                Servis Randevusu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Kategoriler */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Kategoriler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/images/category-motors.jpg')" }}></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Motor Modelleri</h3>
                <p className="text-gray-600 mb-4">Güç ve performansı bir arada sunan en yeni motor modellerimizi keşfedin.</p>
                <Link href="/motor-modelleri" className="text-blue-600 hover:text-blue-800 font-medium">
                  Tüm Modeller &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/images/category-scooters.jpg')" }}></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Scooter Modelleri</h3>
                <p className="text-gray-600 mb-4">Şehir içi ulaşımda pratiklik ve konfor sunan scooter modellerimiz.</p>
                <Link href="/scooter-modelleri" className="text-blue-600 hover:text-blue-800 font-medium">
                  Tüm Modeller &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/images/category-parts.jpg')" }}></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Yedek Parçalar</h3>
                <p className="text-gray-600 mb-4">Orijinal ve kaliteli yedek parçalarla motosikletinizi yenileyin.</p>
                <Link href="/yedek-parcalar" className="text-blue-600 hover:text-blue-800 font-medium">
                  Tüm Parçalar &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/images/category-accessories.jpg')" }}></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Aksesuarlar</h3>
                <p className="text-gray-600 mb-4">Motosiklet deneyiminizi zenginleştirecek aksesuarlar burada.</p>
                <Link href="/aksesuarlar" className="text-blue-600 hover:text-blue-800 font-medium">
                  Tüm Aksesuarlar &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İndirimli Ürünler */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">İndirimli Ürünler</h2>
            <Link href="/indirimli-urunler" className="text-blue-600 hover:text-blue-800 font-medium">
              Tümünü Gör &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Örnek indirimli ürünler */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-200 relative">
                {/* İndirim etiketi */}
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  %{15 + index * 5} İndirim
                </div>
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url('/images/product-${index + 1}.jpg')` }}></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Örnek Ürün {index + 1}</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-gray-400 line-through mr-2">{formatCurrency((10000 + index * 5000))}</span>
                    <span className="text-xl font-bold text-blue-600">{formatCurrency((10000 + index * 5000) * 0.85)}</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300">
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmetlerimiz */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Profesyonel Servis</h3>
              <p className="text-gray-600">Uzman ekibimiz ile motosikletinize özel bakım ve servis hizmetleri sunuyoruz.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Garanti Paketi</h3>
              <p className="text-gray-600">Satın aldığınız ürünler için kapsamlı garanti ve güvenlik hizmetleri sağlıyoruz.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Motosiklet Topluluğu</h3>
              <p className="text-gray-600">Düzenli olarak organize ettiğimiz etkinliklerle motosiklet tutkunlarını bir araya getiriyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-center">Bizimle İletişime Geçin</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg mb-6 text-center">
              SpeedHorizon ile yolların keyfini çıkarın. En yeni modeller, uygun fiyatlar ve kaliteli hizmet için bize ulaşın.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/bayi-servis" className="bg-white text-blue-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Bayi Listesi
            </Link>
            <Link href="/iletisim" className="bg-transparent hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg border-2 border-white transition duration-300">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
