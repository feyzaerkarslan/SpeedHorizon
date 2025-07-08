'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
            <CheckCircleIcon className="w-24 h-24 mx-auto text-green-500" />
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Siparişiniz için teşekkürler!</h1>
            <p className="mt-3 text-lg text-gray-600">Siparişiniz başarıyla alındı ve en kısa sürede işleme konulacaktır.</p>
            
            {orderId && (
                <div className="mt-8 bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Sipariş Numaranız:</p>
                    <p className="text-xl font-mono text-gray-800 tracking-wider">{orderId}</p>
                </div>
            )}

            <div className="mt-10">
                <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}


export default function SuccessPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 p-4">
        <Suspense fallback={<div className="text-center text-lg">Yükleniyor...</div>}>
            <SuccessContent />
        </Suspense>
    </div>
  );
} 