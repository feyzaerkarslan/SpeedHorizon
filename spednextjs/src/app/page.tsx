import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[80vh] bg-gray-900">
          <Image
            src="/images/hero-yamaha.jpg"
            alt="SpeedHorizon Motorsikletleri"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
              SpeedHorizon Motorsiklet Dünyası
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
              Yolların efendisi olmak için tasarlanan güç ve performansla tanışın
            </p>
            <Link
              href="/motorcycles"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors"
            >
              Motorsikletleri Keşfet
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Neden SpeedHorizon?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Üstün Performans</h3>
              <p className="text-gray-600 dark:text-gray-300">
                SpeedHorizon motorsikletleri, güçlü motorları ve yenilikçi teknolojileriyle sınıfının en iyisidir.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Güvenilirlik</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dayanıklılığı ve uzun ömürlü kalitesi ile bilinen SpeedHorizon, sizi asla yarı yolda bırakmaz.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Şık Tasarım</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Her model, benzersiz tasarım çizgileriyle dikkat çeker ve sürücüsüne prestij katar.
              </p>
            </div>
          </div>
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
