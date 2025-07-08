'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MotorcycleImageGalleryProps {
  images: string[];
  name: string;
}

export default function MotorcycleImageGallery({ images, name }: MotorcycleImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200" />;
  }

  return (
    <div className="mb-12">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage]}
          alt={name}
          width={800}
          height={600}
          className="object-cover w-full h-full"
          priority
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, idx) => (
          <button
            key={idx}
            className={`relative h-24 rounded-md overflow-hidden ${
              selectedImage === idx ? 'ring-2 ring-offset-2 ring-blue-600' : ''
            }`}
            onClick={() => setSelectedImage(idx)}
          >
            <Image
              src={image}
              alt={`${name} - Görsel ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
} 