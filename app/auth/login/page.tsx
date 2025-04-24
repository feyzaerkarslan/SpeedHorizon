'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

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

export default function Login() {
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
  const [error, setError] = useState('');

  const calculatePasswordStrength = (password: string) => {
    const meetsRequirements = passwordRequirements.filter((req) =>
      req.validator(password)
    ).length;
    return (meetsRequirements / passwordRequirements.length) * 100;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-orange-500';
    if (passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields((prev) => new Set([...prev, fieldName]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tüm gereksinimleri kontrol et
    const allRequirementsMet = passwordRequirements.every((req) =>
      req.validator(formData.password)
    );

    if (!allRequirementsMet) {
      toast.error('Lütfen tüm şifre gereksinimlerini karşılayın.');
      return;
    }

    // Simüle edilmiş giriş işlemi
    // Burada gerçek API çağrısı yapılacak
    console.log('Giriş başarılı:', formData);
    toast.success('Başarıyla giriş yapıldı!');
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() => handleFieldBlur('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {touchedFields.has('email') && !formData.email && (
                <p className="mt-1 text-sm text-red-600">
                  E-posta adresi gereklidir
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onBlur={() => handleFieldBlur('password')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Şifre Gücü Göstergesi */}
              {formData.password && (
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Şifre Gücü: {passwordStrength <= 25 ? 'Zayıf' : passwordStrength <= 50 ? 'Orta' : passwordStrength <= 75 ? 'İyi' : 'Güçlü'}
                  </p>
                </div>
              )}

              {/* Şifre Gereksinimleri */}
              <div className="mt-2 space-y-2">
                {passwordRequirements.map((req) => (
                  <div
                    key={req.id}
                    className={`flex items-center text-sm ${
                      req.validator(formData.password)
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    <span className="mr-2">
                      {req.validator(formData.password) ? '✓' : '○'}
                    </span>
                    {req.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Beni hatırla
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Şifremi unuttum
              </a>
            </div>
          </div>

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
    </div>
  );
}
