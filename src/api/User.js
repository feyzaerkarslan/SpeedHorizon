const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref: 'Product' // Model adı dinamik olacağı için burada ref kullanmıyoruz.
  },
  productModel: {
    type: String,
    required: true,
    enum: ['Motorcycle', 'Scooter', 'Accessory', 'SparePart']
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, { _id: false });

const favoriteItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productModel: {
    type: String,
    required: true,
    enum: ['Motorcycle', 'Scooter', 'Accessory', 'SparePart']
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [cartItemSchema],
  favorites: [favoriteItemSchema]
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema); 