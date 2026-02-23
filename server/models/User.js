const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  phone: String,
  addresses: [{
    type: {
      type: String,
      enum: ['billing', 'shipping'],
      default: 'shipping'
    },
    firstName: String,
    lastName: String,
    company: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);