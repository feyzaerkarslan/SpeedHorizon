'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { UserIcon, HeartIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

type OrderItem = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout, getFavorites } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // loadFavorites ve loadOrders fonksiyonlarını useEffect'ten önce tanımla
  const loadFavorites = useCallback(async () => {
    try {
      setLoadingFavorites(true);
      const userFavorites = await getFavorites();
      setFavorites(userFavorites);
    } catch {
      console.error('Favoriler yüklenirken hata');
      toast.error('Favoriler yüklenirken bir hata oluştu.');
    } finally {
      setLoadingFavorites(false);
    }
  }, [getFavorites]);

  const loadOrders = useCallback(async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?userId=${user._id}`);
      const data = await res.json();
      if (data.success) setOrders(data.data);
      else setOrders([]);
    } catch {
      setOrders([]);
      toast.error('Siparişler yüklenirken bir hata oluştu.');
    } finally {
      setLoadingOrders(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      toast.error('Bu sayfayı görüntülemek için giriş yapmalısınız.');
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && activeTab === 'favorites') {
      loadFavorites();
    }
  }, [user, activeTab, loadFavorites]);

  useEffect(() => {
    if (user && activeTab === 'orders') {
      loadOrders();
    }
  }, [user, activeTab, loadOrders]);

  const handleLogout = () => {
    logout();
    toast.success('Başarıyla çıkış yapıldı.');
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-xl font-semibold">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              <div className="flex items-center space-x-4 p-4 mb-4">
                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-blue-600" />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                 </div>
              </div>

              <a
                onClick={() => setActiveTab('profile')}
                className={`cursor-pointer group rounded-md px-3 py-2 flex items-center text-sm font-medium ${activeTab === 'profile' ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <UserIcon className="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6" />
                <span>Profil Bilgileri</span>
              </a>
              <a
                onClick={() => setActiveTab('orders')}
                className={`cursor-pointer group rounded-md px-3 py-2 flex items-center text-sm font-medium ${activeTab === 'orders' ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ShoppingBagIcon className="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6" />
                <span>Siparişlerim</span>
              </a>
              <a
                onClick={() => setActiveTab('favorites')}
                className={`cursor-pointer group rounded-md px-3 py-2 flex items-center text-sm font-medium ${activeTab === 'favorites' ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <HeartIcon className="text-gray-500 group-hover:text-gray-600 mr-3 h-6 w-6" />
                <span>Favorilerim</span>
              </a>
              <a
                onClick={() => handleLogout()}
                className="cursor-pointer group rounded-md px-3 py-2 flex items-center text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6" />
                <span>Çıkış Yap</span>
              </a>
            </nav>
          </aside>

          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
             {activeTab === 'profile' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Profil Bilgileri</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Kişisel bilgilerinizi buradan güncelleyebilirsiniz.</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                   <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                      <input type="text" id="name" defaultValue={user.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                     <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta</label>
                      <input type="email" id="email" value={user.email} disabled className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end">
                       <button
                        type="submit"
                        className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700"
                        onClick={(e) => {e.preventDefault(); toast('Bu özellik henüz aktif değil.')}}
                      >
                        Değişiklikleri Kaydet
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Siparişlerim</h3>
                  <div className="mt-8 text-center text-gray-500 py-8">
                    {loadingOrders ? (
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order: Order) => (
                          <div key={order._id} className="border rounded-lg p-4 text-left">
                            <div className="font-semibold mb-2">Sipariş No: {order._id}</div>
                            <div className="text-sm text-gray-600 mb-1">Tarih: {new Date(order.createdAt).toLocaleString('tr-TR')}</div>
                            <div className="text-sm text-gray-600 mb-1">Toplam Tutar: {order.totalAmount?.toLocaleString('tr-TR')} TL</div>
                            <div className="text-sm text-gray-600 mb-1">Durum: {order.status}</div>
                            <div className="mt-2">
                              <span className="font-semibold">Ürünler:</span>
                              <ul className="list-disc ml-6">
                                {order.items.map((item: OrderItem, idx: number) => (
                                  <li key={idx}>{item.name} x {item.quantity} ({item.price?.toLocaleString('tr-TR')} TL)</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-400"/>
                        <p className="mt-4">Henüz siparişiniz bulunmamaktadır.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Favorilerim</h3>
                  <div className="mt-8 text-center text-gray-500 py-8">
                    {loadingFavorites ? (
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                    ) : (
                      favorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {favorites.map((product) => (
                            <div key={product._id} className="flex flex-col items-center">
                              {/* <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mb-2" /> */}
                              {/* <h4 className="text-lg font-semibold">{product.name}</h4> */}
                              {/* <button
                                onClick={() => handleRemoveFavorite(product._id, product.model)}
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                              >
                                Favorilerden Çıkar
                              </button> */}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>Henüz favori ürününüz bulunmamaktadır.</p>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
