const mongoose = require('mongoose');

const priceListSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Ürün veya model adı
  category: { type: String, required: true },  // Kategori (ör: scooter, motorcycle, aksesuar)
  price: { type: Number, required: true },     // Fiyat
  currency: { type: String, default: '₺' },    // Para birimi
  updatedAt: { type: Date, default: Date.now } // Son güncelleme
});

module.exports = mongoose.model('PriceList', priceListSchema); 