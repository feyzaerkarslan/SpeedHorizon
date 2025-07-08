const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Siparişteki her bir ürünün şeması
const OrderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    productType: {
        type: String,
        required: true,
        enum: ['Motorcycle', 'Scooter', 'Accessory', 'SparePart'],
    },
    productModel: {
        type: String,
        required: true,
        enum: ['Motorcycle', 'Scooter', 'Accessory', 'SparePart'],
    },
}, { _id: false });

// Teslimat adresi şeması
const ShippingAddressSchema = new Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });


// Ana Sipariş Şeması
const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingAddress: ShippingAddressSchema,
    paymentType: {
        type: String,
        required: true,
        enum: ['cart', 'cash'],
    },
    installment: {
        type: Number,
        required: function() {
            return this.paymentType === 'cart';
        },
        enum: [1, 3, 6, 9, 12],
        default: 1,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema); 