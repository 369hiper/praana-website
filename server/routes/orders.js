const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

// GET all orders (with optional user filter)
router.get('/', async (req, res) => {
  try {
    const { userId, status, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {};

    if (userId) {
      query.userId = userId;
    }

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalOrders: total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, shippingAddress, billingAddress, paymentMethod, contactInfo } = req.body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map(item => {
      const totalPrice = item.unitPrice * item.quantity;
      subtotal += totalPrice;

      return {
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: totalPrice
      };
    });

    // Simple tax calculation (8.5% as example)
    const taxRate = 0.085;
    const taxAmount = subtotal * taxRate;
    const shippingCost = 0; // Could be calculated based on weight/distance

    const totalAmount = subtotal + taxAmount + shippingCost;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${uuidv4().substring(0, 8).toUpperCase()}`;

    const order = new Order({
      orderNumber,
      userId,
      items: orderItems,
      subtotal,
      taxAmount,
      shippingCost,
      totalAmount,
      shippingAddress,
      billingAddress,
      contactInfo, // NEW: Save contact info
      paymentMethod,
      paymentStatus: req.body.paymentStatus || 'pending_manual_verification'
    });

    await order.save();

    // Trigger Email Notifications (Async - don't block response)
    const emailService = require('../services/emailService');
    // 1. Notify Admin
    emailService.sendOrderNotificationToAdmin(order);
    // 2. Notify Customer
    emailService.sendOrderConfirmationToCustomer(order);

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE order status
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('items.productId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;