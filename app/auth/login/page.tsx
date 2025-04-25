'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'En az 8 karakter',
    validator: (password) => password.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'En az 1 büyük harf',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    label: 'En az 1 küçük harf',
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    label: 'En az 1 rakam',
    validator: (password) => /[0-9]/.test(password),
  },
  {
    id: 'special',
    label: 'En az 1 özel karakter',
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get('registered');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simüle edilmiş giriş işlemi
      console.log('Giriş yapılıyor:', formData);
      router.push('/profile');
    } catch (error) {
      console.error('Giriş hatası:', error);
    }
  };

  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set([...prev, fieldName]));
  };

  const calculatePasswordStrength = (password: string) => {
    const meetsRequirements = passwordRequirements.filter(req =>
      req.validator(password)
    ).length;
    return (meetsRequirements / passwordRequirements.length) * 100;
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Hesabınıza Giriş Yapın
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hesabınız yok mu?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
            Hemen kaydolun
          </Link>
        </p>
      </div>

      {justRegistered && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
          Kaydınız başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">
              Email adresi
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email adresi"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => handleFieldBlur('email')}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
              placeholder="Şifre"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setPasswordStrength(calculatePasswordStrength(e.target.value));
              }}
              onBlur={() => handleFieldBlur('password')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {formData.password && (
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded">
              <div
                className={`h-full rounded ${
                  passwordStrength >= 80
                    ? 'bg-green-500'
                    : passwordStrength >= 60
                    ? 'bg-yellow-500'
                    : passwordStrength >= 40
                    ? 'bg-orange-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
            <ul className="text-sm space-y-1">
              {passwordRequirements.map((req) => (
                <li
                  key={req.id}
                  className={`flex items-center ${
                    touchedFields.has('password')
                      ? req.validator(formData.password)
                        ? 'text-green-600'
                        : 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {req.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
