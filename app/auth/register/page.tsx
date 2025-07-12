'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSuccess('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
        setTimeout(() => router.push('/auth/login?registered=true'), 1500);
      } else {
        setError(result.message || 'Kayıt sırasında bir hata oluştu.');
      }
    } catch {
      setError('Sunucu hatası!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Kayıt Ol</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <input {...register('name', { required: true })} placeholder="Ad Soyad" className="mb-2 w-full p-2 border rounded" />
        <input {...register('email', { required: true })} type="email" placeholder="E-posta" className="mb-2 w-full p-2 border rounded" />
        <input {...register('password', { required: true })} type="password" placeholder="Şifre" className="mb-4 w-full p-2 border rounded" />
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded">
          {isSubmitting ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
        </button>
      </form>
    </div>
  );
} 