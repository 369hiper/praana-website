const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  diameter: {
    type: String
  },
  imageUrl: {
    type: String
  },
  category: {
    type: String
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  variants: [{
    name: String,
    sku: String,
    price: Number,
    color: String,
    specifications: Object, // Store variant-specific specs as JSON
    stockQuantity: {
      type: Number,
      default: 0
    }
  }],
  benefits: [{
    type: String
  }],
  pemfBenefits: [{
    title: String,
    description: String
  }],
  specifications: {
    type: Object // Store product specs as JSON
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);