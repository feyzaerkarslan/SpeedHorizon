"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function ProfilePage() {
  const { user, isLoading, logout } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  
  useEffect(() => {
    // Eğer yükleme tamamlandıysa ve kullanıcı giriş yapmadıysa, giriş sayfasına yönlendir
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [isLoading, user, router]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Yükleniyor...</div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null; // useEffect'te yönlendirme yapılacak
  }
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profil Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex flex-col items-center mb-6">
                {user.avatar ? (
                  <div className="relative w-24 h-24 mb-4">
                    <Image 
                      src={user.avatar} 
                      alt={`${user.name} ${user.surname}`} 
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-600 dark:text-gray-300">
                      {user.name.charAt(0)}{user.surname.charAt(0)}
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-bold">{user.name} {user.surname}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user.email}</p>
              </div>
              
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === "profile" 
                      ? "bg-blue-500 text-white" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Profil Bilgilerim
                </button>
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === "orders" 
                      ? "bg-blue-500 text-white" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Siparişlerim
                </button>
                <button 
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === "addresses" 
                      ? "bg-blue-500 text-white" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Adreslerim
                </button>
                <button 
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === "favorites" 
                      ? "bg-blue-500 text-white" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Favorilerim
                </button>
                <button 
                  onClick={() => setActiveTab("feedback")}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === "feedback" 
                      ? "bg-blue-500 text-white" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Şikayet ve Öneriler
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Çıkış Yap
                </button>
              </nav>
            </div>
          </div>
          
          {/* İçerik Alanı */}
          <div className="w-full md:w-3/4 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {activeTab === "profile" && (
              <ProfileTab user={user} />
            )}
            
            {activeTab === "orders" && (
              <OrdersTab userId={user.id} />
            )}
            
            {activeTab === "addresses" && (
              <AddressesTab />
            )}
            
            {activeTab === "favorites" && (
              <FavoritesTab favoriteIds={user.favoriteIds} />
            )}
            
            {activeTab === "feedback" && (
              <FeedbackTab userId={user.id} />
            )}
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

// Profil Sekmesi
function ProfileTab({ user }: { user: any }) {
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Profil güncelleme işlemi
    alert("Profil bilgileriniz güncellendi");
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profil Bilgilerim</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Ad
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="surname">
              Soyad
            </label>
            <input
              id="surname"
              name="surname"
              type="text"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
      
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Şifre Değiştir</h3>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
              Mevcut Şifre
            </label>
            <input
              id="currentPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
              Yeni Şifre
            </label>
            <input
              id="newPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmNewPassword">
              Yeni Şifre Tekrar
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Şifreyi Değiştir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Siparişler Sekmesi
function OrdersTab({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // Normalde API isteği yapılacaktır
        const { orders } = await import('@/data/orders');
        const userOrders = orders.filter(order => order.userId === userId);
        setOrders(userOrders);
      } catch (error) {
        console.error("Siparişler yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [userId]);
  
  if (isLoading) {
    return <div className="text-center py-8">Siparişleriniz yükleniyor...</div>;
  }
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Henüz sipariş vermediniz.</p>
        <Link 
          href="/motorcycles" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Beklemede";
      case "processing": return "Hazırlanıyor";
      case "shipped": return "Kargoya Verildi";
      case "delivered": return "Teslim Edildi";
      case "cancelled": return "İptal Edildi";
      default: return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sipariş No:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tarih:</span>
                  <span>{formatDate(order.orderDate)}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Durum:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="relative h-16 w-16 flex-shrink-0 mr-4 bg-gray-100 dark:bg-gray-700 rounded">
                    <Image
                      src={item.motorcycle.imageUrl}
                      alt={item.motorcycle.model}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="font-medium">SpeedHorizon {item.motorcycle.model}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Adet: {item.quantity} | Renk: {item.selectedColor}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold">{formatPrice(item.motorcycle.price)}</div>
                    {item.motorcycle.discount && (
                      <div className="text-sm text-red-600">
                        %{item.motorcycle.discount} indirim
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Teslimat Adresi: {order.shippingAddress}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Takip No: {order.trackingNumber}
                    </p>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Toplam</div>
                  <div className="font-bold text-lg">{formatPrice(order.totalAmount)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Adresler Sekmesi
function AddressesTab() {
  const { user, updateUserAddress, deleteUserAddress } = useUser();
  const [addresses, setAddresses] = useState(user?.addresses || []);
  
  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Henüz kayıtlı adresiniz bulunmuyor.</p>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Yeni Adres Ekle
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Adreslerim</h2>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Yeni Adres Ekle
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div 
            key={address.title} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative"
          >
            {address.isDefault && (
              <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Varsayılan
              </span>
            )}
            
            <h3 className="font-bold text-lg mb-2">{address.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-1">{address.fullName}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-1">{address.address}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              {address.zipCode} {address.city}/{address.state}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{address.phone}</p>
            
            <div className="mt-4 flex space-x-3">
              {!address.isDefault && (
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Varsayılan Yap
                </button>
              )}
              <button 
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Düzenle
              </button>
              <button 
                className="text-sm text-red-600 hover:text-red-800"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Favoriler Sekmesi
function FavoritesTab({ favoriteIds }: { favoriteIds: string[] }) {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { removeFromFavorites } = useUser();
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const { motorcycles } = await import('@/data/motorcycles');
        const favoriteItems = motorcycles.filter(moto => favoriteIds.includes(moto.id));
        setFavorites(favoriteItems);
      } catch (error) {
        console.error("Favoriler yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, [favoriteIds]);
  
  if (isLoading) {
    return <div className="text-center py-8">Favorileriniz yükleniyor...</div>;
  }
  
  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Henüz favori ürününüz bulunmuyor.</p>
        <Link 
          href="/motorcycles" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Ürünleri Keşfet
        </Link>
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Favorilerim</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={item.imageUrl}
                alt={item.model}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">SpeedHorizon {item.model}</h3>
                <button 
                  onClick={() => removeFromFavorites(item.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex justify-between items-end">
                <div>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                    {item.cc} cc
                  </span>
                </div>
                
                <div className="text-right">
                  {item.discount ? (
                    <>
                      <div className="line-through text-sm text-gray-500">
                        {formatPrice(item.price)}
                      </div>
                      <div className="font-bold text-red-600">
                        {formatPrice(item.price - (item.price * item.discount / 100))}
                      </div>
                    </>
                  ) : (
                    <div className="font-bold">{formatPrice(item.price)}</div>
                  )}
                </div>
              </div>
              
              <Link
                href={`/motorcycles/${item.id}`}
                className="mt-3 w-full block text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Detayları Gör
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Şikayet ve Öneriler Sekmesi
function FeedbackTab({ userId }: { userId: string }) {
  const [feedbackType, setFeedbackType] = useState<"complaint" | "suggestion">("suggestion");
  const [category, setCategory] = useState("product");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Normalde burada bir API çağrısı olacak
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Form verilerini sıfırla
      setFeedbackType("suggestion");
      setCategory("product");
      setSubject("");
      setMessage("");
      
      // Başarılı mesajı göster
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      
      // Kullanıcıya geri bildirim
      alert("Geri bildiriminiz başarıyla gönderildi. En kısa sürede incelenecektir.");
    } catch (error) {
      console.error("Geri bildirim gönderilirken hata:", error);
      alert("Geri bildirim gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Şikayet ve Önerileriniz</h2>
      
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Geri bildiriminiz başarıyla gönderildi. En kısa sürede incelenecektir.</p>
        </div>
      )}
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
        <p className="text-blue-800 dark:text-blue-200">
          Değerli görüşleriniz, hizmet kalitemizi artırmamıza yardımcı olacaktır. Lütfen şikayet veya önerilerinizi bizimle paylaşın.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Geri Bildirim Türü</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="feedbackType"
                value="suggestion"
                checked={feedbackType === "suggestion"}
                onChange={() => setFeedbackType("suggestion")}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Öneri</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="feedbackType"
                value="complaint"
                checked={feedbackType === "complaint"}
                onChange={() => setFeedbackType("complaint")}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Şikayet</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="category">
            Kategori
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="product">Ürün</option>
            <option value="service">Hizmet</option>
            <option value="website">Web Sitesi</option>
            <option value="delivery">Teslimat</option>
            <option value="payment">Ödeme</option>
            <option value="other">Diğer</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="subject">
            Konu
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Konu başlığı"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="message">
            Mesajınız
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Lütfen şikayet veya önerinizi detaylı bir şekilde yazınız..."
            required
          ></textarea>
        </div>
        
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Kişisel verilerimin inceleme amacıyla kullanılmasını kabul ediyorum.
            </span>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Gönderiliyor..." : "Gönder"}
          </button>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            * Geri bildiriminiz için teşekkür ederiz
          </div>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Geçmiş Geri Bildirimleriniz</h3>
        
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          Henüz geri bildirim kaydınız bulunmuyor.
        </div>
      </div>
    </div>
  );
} 