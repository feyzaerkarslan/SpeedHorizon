'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useCart } from '@/src/contexts/CartContext';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';

type Inputs = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type CardInputs = {
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const PaymentPage = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
  const { register: registerCard, handleSubmit: handleCardSubmit, formState: { errors: cardErrors } } = useForm<CardInputs>();
  const [paymentType, setPaymentType] = useState<'cart' | 'cash'>('cart');
  const [installment, setInstallment] = useState<number>(1);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [installmentError, setInstallmentError] = useState<string | null>(null);
  const [cardInfo, setCardInfo] = useState<CardInputs>({ cardNumber: '', expiry: '', cvc: '' });

  const handlePaymentTypeChange = (type: 'cart' | 'cash') => {
    setPaymentType(type);
    if (type === 'cash') {
      setInstallment(1);
    }
  };

  const handleInstallmentChange = (taksit: number) => {
    console.log('Taksit seçildi:', taksit);
    setInstallment(taksit);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPaymentError(null);
    setInstallmentError(null);
    
    if (!user) {
      toast.error('Sipariş vermek için giriş yapmalısınız.');
      return router.push('/auth/login');
    }
    if (cart.length === 0) {
      toast.error('Sepetiniz boş.');
      return;
    }
    if (!paymentType) {
      setPaymentError('Lütfen bir ödeme yöntemi seçin.');
      return;
    }
    if (paymentType === 'cart' && (!installment || ![1, 3, 6, 9, 12].includes(installment))) {
      setInstallmentError('Lütfen bir taksit seçeneği belirleyin.');
      return;
    }
    if (paymentType === 'cart' && (!cardInfo.cardNumber || !cardInfo.expiry || !cardInfo.cvc)) {
      toast.error('Kart bilgileri eksik!');
      return;
    }

    const orderData = {
      user: user._id,
      items: cart.map(item => {
        let productType = item.productType || item.productModel;
        if (!productType) {
          const lowerCaseName = item.name.toLowerCase();
          if (lowerCaseName.includes('mt-') || lowerCaseName.includes('r1') || lowerCaseName.includes('tracer')) {
             productType = 'Motorcycle';
          } else if (lowerCaseName.includes('nmax') || lowerCaseName.includes('x-max') || lowerCaseName.includes("d'elight")) {
             productType = 'Scooter';
          } else if (lowerCaseName.includes('amortisör') || lowerCaseName.includes('fren') || lowerCaseName.includes('filtre')) {
             productType = 'SparePart';
          } else {
             productType = 'Accessory';
          }
        }
        const validTypes = ['Motorcycle', 'Scooter', 'Accessory', 'SparePart'];
        if (!validTypes.includes(productType)) productType = 'Accessory';
        return {
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          productType,
          productModel: productType
        }
      }),
      totalAmount,
      shippingAddress: data,
      paymentType,
      installment: paymentType === 'cart' ? installment : undefined,
    };

    console.log("Gönderilecek Sipariş Verisi:", JSON.stringify(orderData, null, 2));

    try {
      if (paymentType === 'cart') {
          const cardRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/creditcards`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: user._id,
            cardNumber: cardInfo.cardNumber,
            expiry: cardInfo.expiry,
            cvc: cardInfo.cvc
          })
        });
        const cardResult = await cardRes.json();
        if (!cardResult.success) {
          toast.error(cardResult.message || 'Kart kaydedilemedi!');
          return;
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Sipariş oluşturulurken bir hata oluştu.');
      }
      
      toast.success('Siparişiniz başarıyla alındı!');
      clearCart();
      router.push('/payment/success');

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu.';
      toast.error(errorMessage);
    }
  };

  const calculateInstallmentAmount = (taksitSayisi: number) => {
    if (taksitSayisi > 1) {
      return (totalAmount / taksitSayisi).toFixed(2);
    }
    return totalAmount.toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Ödeme</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Teslimat Adresi</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ödeme Yöntemi</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentType"
                    value="cart"
                    checked={paymentType === 'cart'}
                    onChange={() => handlePaymentTypeChange('cart')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Kart ile Ödeme</span>
                  </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentType"
                    value="cash"
                    checked={paymentType === 'cash'}
                    onChange={() => handlePaymentTypeChange('cash')}
                    className="form-radio h-4 w-4 text-green-600"
                  />
                  <span className="ml-2">Nakit ile Ödeme</span>
                </label>
              </div>
              {paymentError && <p className="text-red-500 text-xs mt-1">{paymentError}</p>}
            </div>
            {paymentType === 'cart' && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-3">Kart Bilgileri</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Kart Numarası"
                      {...registerCard('cardNumber', { required: 'Kart numarası zorunlu' })}
                      value={cardInfo.cardNumber}
                      onChange={e => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {cardErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{cardErrors.cardNumber.message}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="AA/YY"
                      {...registerCard('expiry', { required: 'Son kullanma tarihi zorunlu' })}
                      value={cardInfo.expiry}
                      onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {cardErrors.expiry && <p className="text-red-500 text-xs mt-1">{cardErrors.expiry.message}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="CVC"
                      {...registerCard('cvc', { required: 'CVC zorunlu' })}
                      value={cardInfo.cvc}
                      onChange={e => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {cardErrors.cvc && <p className="text-red-500 text-xs mt-1">{cardErrors.cvc.message}</p>}
                  </div>
                </div>
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Taksit Seçimi</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[1, 3, 6, 9, 12].map((taksit) => (
                      <label key={taksit} className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="installment"
                          value={taksit}
                          checked={installment === taksit}
                          onChange={() => handleInstallmentChange(taksit)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 ${
                          installment === taksit 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300'
                        }`}>
                          {installment === taksit && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-center">
                          {taksit === 1 ? 'Peşin' : `${taksit} Taksit`}
                        </span>
                        {taksit > 1 && (
                          <div className="text-xs text-gray-500 text-center mt-1">
                            {calculateInstallmentAmount(taksit)} TL
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                  {installmentError && <p className="text-red-500 text-xs mt-2">{installmentError}</p>}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Tam Ad</label>
                <input {...register('fullName', { required: 'Bu alan zorunludur' })} id="fullName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres</label>
                <input {...register('address', { required: 'Bu alan zorunludur' })} id="address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Şehir</label>
                <input {...register('city', { required: 'Bu alan zorunludur' })} id="city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Posta Kodu</label>
                <input {...register('postalCode', { required: 'Bu alan zorunludur' })} id="postalCode" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
              </div>
               <div className="sm:col-span-2">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Ülke</label>
                <input {...register('country', { required: 'Bu alan zorunludur' })} id="country" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>
            </div>
             <button type="submit" disabled={isSubmitting || cart.length === 0} className="mt-6 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
              {isSubmitting ? 'Sipariş Veriliyor...' : 'Siparişi Tamamla'}
          </button>
        </form>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="space-y-4">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                            </div>
                            <p className="font-medium">{(item.price * item.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Sepetinizde ürün bulunmamaktadır.</p>
                )}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
                <p>Toplam</p>
                <p>{totalAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
