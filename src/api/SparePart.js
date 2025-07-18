const mongoose = require('mongoose');

const sparePartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1000 }, // Stok miktarı
  compatibleModels: [String],
  description: String,
  features: [String],
  images: [String],
  discounted: { type: Boolean, default: false },
});

module.exports = mongoose.model('SparePart', sparePartSchema); 