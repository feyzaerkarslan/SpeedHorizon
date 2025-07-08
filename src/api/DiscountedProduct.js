const mongoose = require('mongoose');

const discountedProductSchema = new mongoose.Schema({
  productType: { type: String, required: true }, // motorcycle, scooter, spare-part, accessory
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image: { type: String },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
});

module.exports = mongoose.model('DiscountedProduct', discountedProductSchema); 