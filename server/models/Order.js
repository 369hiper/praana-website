const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String, // Changed from ObjectId to String to allow flexible product IDs
    required: true
  },
  variantId: String,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String, // Relaxed from ObjectId to String for guest checkout
    default: 'guest'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  billingAddress: {
    firstName: String,
    lastName: String,
    company: String,
    address: String, // Changed from addressLine1/2 to single address field to match frontend
    city: String,
    state: String,
    zipCode: String, // Changed from postalCode to zipCode
    country: String,
    phone: String,
    email: String // Added email
  },
  shippingAddress: {
    firstName: String,
    lastName: String,
    company: String,
    address: String, // Changed from addressLine1/2 to single address field
    city: String,
    state: String,
    zipCode: String, // Changed from postalCode to zipCode
    country: String,
    phone: String,
    email: String // Added email
  },
  contactInfo: {
    preferredMethod: String,
    whatsapp: String,
    telegram: String
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    default: 'pending'
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);