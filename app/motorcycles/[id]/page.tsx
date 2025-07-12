import Link from 'next/link';
import Image from 'next/image';
import { TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import MotorcycleActions from '../../../components/MotorcycleActions';
import MotorcycleImageGallery from '../../../components/MotorcycleImageGallery';

interface Motorcycle {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  features: string[];
  specs: {
    motor: string;
    maksGüç: string;
    ağırlık: string;
  };
  colors: { name: string; hex: string }[];
}

async function getMotorcycle(id: string): Promise<Motorcycle | null> {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/motorcycles/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Failed to fetch motorcycle:', error);
    return null;
  }
}

export async function generateStaticParams() {
  return [
    { id: 'mt-09' },
    { id: 'r1' },
    { id: 'tracer-9-gt' },
    { id: 'tenere-700' },
    { id: 'yz450f' },
    { id: 'xsr900' },
  ];
}

export default async function MotorcycleDetailsPage({ params }: { params: { id: string } }) {
  const motorcycle = await getMotorcycle(params.id);

  if (!motorcycle) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Motosiklet bulunamadı</h1>
        <p className="mt-4">Aradığınız motosiklet mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/motorcycles" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Tüm Motosikletler
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero banner */}
      <div className="bg-black text-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">{motorcycle.name}</h1>
              <p className="text-xl mb-8">{motorcycle.category}</p>
              <p className="text-3xl font-bold mb-6">{motorcycle.price.toLocaleString('tr-TR')} TL</p>
              <MotorcycleActions motorcycleId={motorcycle._id} />
            </div>
            <div className="lg:w-1/2 relative h-[300px] lg:h-[400px] w-full">
              <Image
                src={motorcycle.images[0]}
                alt={motorcycle.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left column */}
          <div className="lg:w-2/3">
            <MotorcycleImageGallery images={motorcycle.images} name={motorcycle.name} />
            
            <div className="prose max-w-none mt-8">
              <p className="text-lg mb-6">{motorcycle.description}</p>
              <h3 className="text-xl font-bold mb-4">Ana Özellikler</h3>
              <ul className="space-y-2">
                {motorcycle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Neden SpeedHorizon?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <TruckIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Hızlı ve Güvenli Teslimat</h4>
                      <p className="text-gray-600 text-sm">Türkiye&apos;nin her yerine sigortalı gönderim.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">2 Yıl Garanti</h4>
                      <p className="text-gray-600 text-sm">Tüm motosikletlerimizde 2 yıl üretici garantisi.</p>
                    </div>
                  </li>
                </ul>
              </div>
               <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-bold mb-4">Teknik Özellikler</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Motor</dt>
                      <dd className="font-medium">{motorcycle.specs.motor}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Maksimum Güç</dt>
                      <dd className="font-medium">{motorcycle.specs.maksGüç}</dd>
                    </div>
                     <div className="flex justify-between py-2">
                      <dt className="text-gray-600">Ağırlık</dt>
                      <dd className="font-medium">{motorcycle.specs.ağırlık}</dd>
                    </div>
                  </dl>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 