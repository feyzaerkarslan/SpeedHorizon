'use client';

import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface StockItem {
  id: number;
  model: string;
  category: string;
  price: number;
  stock: number;
  color: string;
  power: string;
  status: string;
}

// Örnek stok verileri
const initialStock: StockItem[] = [
  {
    id: 1,
    model: 'SpeedMaster 650',
    category: 'Motor',
    price: 249999,
    stock: 5,
    color: 'Kırmızı',
    power: '65 HP',
    status: 'Aktif',
  },
  {
    id: 2,
    model: 'RoadKing 1000',
    category: 'Motor',
    price: 399999,
    stock: 3,
    color: 'Siyah',
    power: '125 HP',
    status: 'Aktif',
  },
  {
    id: 3,
    model: 'CityRunner 125',
    category: 'Scooter',
    price: 89999,
    stock: 8,
    color: 'Mavi',
    power: '12 HP',
    status: 'Aktif',
  },
];

export default function StockManagement() {
  const [stock, setStock] = useState<StockItem[]>(initialStock);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<StockItem | null>(null);
  const [formData, setFormData] = useState<Omit<StockItem, 'id'>>({
    model: '',
    category: 'Motor',
    price: 0,
    stock: 0,
    color: '',
    power: '',
    status: 'Aktif',
  });

  const handleAdd = () => {
    setFormData({
      model: '',
      category: 'Motor',
      price: 0,
      stock: 0,
      color: '',
      power: '',
      status: 'Aktif',
    });
    setShowAddModal(true);
  };

  const handleEdit = (item: StockItem) => {
    setCurrentItem(item);
    setFormData(item);
    setShowEditModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      setStock(stock.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showAddModal) {
      setStock([
        ...stock,
        {
          ...formData,
          id: Math.max(...stock.map(item => item.id)) + 1,
        },
      ]);
      setShowAddModal(false);
    } else if (showEditModal) {
      if (currentItem) {
        setStock(
          stock.map(item =>
            item.id === currentItem.id ? { ...item, ...formData } : item
          )
        );
      }
      setShowEditModal(false);
    }
  };

  const Modal = ({ show, onClose, title }: { show: boolean; onClose: () => void; title: string }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Motor">Motor</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Yedek Parça">Yedek Parça</option>
                  <option value="Aksesuar">Aksesuar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fiyat (TL)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stok Adedi</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Renk</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Motor Gücü</label>
                <input
                  type="text"
                  value={formData.power}
                  onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Durum</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Pasif">Pasif</option>
                  <option value="Tükendi">Tükendi</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stok Yönetimi</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Yeni Ürün Ekle
        </button>
      </div>

      {/* Stok Tablosu */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stok
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stock.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.model}</div>
                  <div className="text-sm text-gray-500">{item.color}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {Number(item.price).toLocaleString('tr-TR')} TL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Aktif'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'Pasif'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <Modal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Yeni Ürün Ekle"
      />
      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Ürün Düzenle"
      />
    </div>
  );
}
