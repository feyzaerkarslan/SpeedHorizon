const mongoose = require('mongoose');

const specsSchema = new mongoose.Schema({
  motor: String,
  şanzıman: String,
  maksGüç: String,
  maksimumTork: String,
  yakıtTüketimi: String,
  uzunluk: String,
  genişlik: String,
  yükseklik: String,
  seleYüksekliği: String,
  aksAralığı: String,
  ağırlık: String,
}, { _id: false });

const motorcycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  engineSize: { type: Number }, // Motor hacmi (cc)
  power: { type: Number }, // Güç (HP)
  stock: { type: Number, default: 1000 }, // Stok miktarı
  colors: [String],
  description: String,
  features: [String],
  specs: specsSchema,
  images: [String],
  new: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  discounted: { type: Boolean, default: false },
  indirimliPrice: { type: Number, default: null },
});

module.exports = mongoose.model('Motorcycle', motorcycleSchema); 