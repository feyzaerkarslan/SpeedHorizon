'use client';

import { useState } from 'react';
import { CalendarIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
];

const serviceTypes = [
  { id: 'maintenance', name: 'Periyodik Bakım', duration: '1 saat' },
  { id: 'repair', name: 'Arıza/Tamir', duration: '2+ saat' },
  { id: 'inspection', name: 'Kontrol/Muayene', duration: '30 dakika' },
  { id: 'modification', name: 'Modifikasyon', duration: '3+ saat' },
];

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceType: '',
    vehicleModel: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ad Soyad alanı zorunludur';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon alanı zorunludur';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz (5XX XXX XX XX)';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Lütfen bir servis türü seçin';
    }
    
    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = 'Motosiklet modeli zorunludur';
    }
    
    if (!formData.date) {
      newErrors.date = 'Randevu tarihi zorunludur';
    }
    
    if (!formData.time) {
      newErrors.time = 'Randevu saati zorunludur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    setLoading(true);

    // Backend'e göndermek için veriyi hazırla
    const appointmentData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone.replace(/\D/g, ''), // Sadece rakamları al
      vehicleType: 'Motosiklet', // Varsayılan veya formdan alınabilir
      vehicleModel: formData.vehicleModel,
      serviceType: serviceTypes.find(s => s.id === formData.serviceType)?.name || '',
      preferredDate: new Date(`${formData.date}T${formData.time}`),
      notes: formData.notes
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Randevunuz başarıyla oluşturuldu!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          serviceType: '',
          vehicleModel: '',
          notes: '',
        });
      } else {
        throw new Error(result.message || 'Randevu oluşturulamadı.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Servis Randevusu</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceTypes.map((service) => (
            <div
              key={service.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.serviceType === service.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setFormData({ ...formData, serviceType: service.id })}
            >
              <h3 className="font-medium text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-500">Süre: {service.duration}</p>
            </div>
          ))}
          {errors.serviceType && (
            <p className="text-red-500 text-sm mt-1 col-span-full">{errors.serviceType}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adınız Soyadınız
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta Adresiniz
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon Numaranız
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                placeholder="(5XX) XXX-XXXX"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motosiklet Modeliniz
              </label>
              <input
                type="text"
                required
                value={formData.vehicleModel}
                onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.vehicleModel ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.vehicleModel && (
                <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Randevu Tarihi
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]} // Geçmiş tarihleri engelle
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Randevu Saati
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 appearance-none focus:ring-blue-500 ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Saat seçiniz</option>
                    {availableTimeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <ClockIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ek Notlar (isteğe bağlı)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300"
              placeholder="Aracınızdaki sorun veya özel talepleriniz hakkında bilgi verebilirsiniz."
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300"
            >
              {loading ? 'Randevu Oluşturuluyor...' : 'Randevuyu Onayla'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
