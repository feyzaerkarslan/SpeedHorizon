"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const { register: registerUser, isLoading } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "İsim en az 2 karakter olmalıdır";
      isValid = false;
    }
    
    if (!formData.surname || formData.surname.length < 2) {
      newErrors.surname = "Soyisim en az 2 karakter olmalıdır";
      isValid = false;
    }
    
    if (!formData.email) {
      newErrors.email = "E-posta adresi gereklidir";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
      isValid = false;
    }
    
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz";
      isValid = false;
    }
    
    if (!formData.password || formData.password.length < 4) {
      newErrors.password = "Şifre en az 4 karakter olmalıdır";
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const { confirmPassword, ...registerData } = formData;
      const success = await registerUser(registerData);
      
      if (success) {
        router.push("/profile");
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Hesap Oluştur</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  İsim
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Ahmet"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="surname">
                  Soyisim
                </label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Yılmaz"
                />
                {errors.surname && (
                  <p className="mt-1 text-sm text-red-600">{errors.surname}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ornek@mail.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Telefon Numarası
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="05XX XXX XX XX"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Şifre
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                Şifre Tekrarı
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                <span>
                  <a href="#" className="text-blue-600 hover:text-blue-500">Kullanım şartlarını</a>{" "}
                  ve{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">Gizlilik politikasını</a>{" "}
                  kabul ediyorum
                </span>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Hesap oluşturuluyor..." : "Kaydol"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Zaten hesabınız var mı?{" "}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Giriş yapın
              </Link>
            </p>
          </div>
        </div>
      </div>
      
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