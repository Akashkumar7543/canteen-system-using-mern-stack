const express = require('express');
const Razorpay = require('razorpay');
const { nanoid } = require('nanoid');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const User = require('../models/User');
const Cart = require('../models/CartModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const validateMongoDbId = require('../utils/validateMongodbId');
const payemntauth = require('../middlewares/payementauth');



const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_YkjUOMagr2LMMH', // Replace with your Razorpay Key ID
  key_secret: 'KB93CdYUOhg9QXQCJXivW6il', // Replace with your Razorpay Key Secret
});

// Create order route
router.post('/orders', asyncHandler(async (req, res) => {
  const { amount } = req.body;

  // Ensure amount is an integer
  const amountInPaise = Math.round(amount * 100);

  const options = {
    amount: amountInPaise,
    currency: 'INR',
    receipt: nanoid(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
}));

// Verify payment and create order route
router.post('/verify',payemntauth, asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const { id, COD, couponApplied } = req.user;

  validateMongoDbId(id);

  const hmac = crypto.createHmac('sha256', razorpay.key_secret);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === razorpay_signature) {
    // Payment is successful, create the order
    try {
      const user = await User.findById(id);
      let userCart = await Cart.findOne({ orderby: user.id });
      let finalAmount = 0;
      if (couponApplied && userCart.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount;
      } else {
        finalAmount = userCart.cartTotal;
      }

      let newOrder = await new Order({
        products: userCart.products,
        paymentIntent: {
          id: razorpay_payment_id,
          method: "Razorpay",
          amount: finalAmount,
          status: "Paid",
          created: Date.now(),
          currency: "INR",
        },
        orderby: user._id,
        orderStatus: "Processing",
      }).save();

      let update = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product },
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        };
      });
      const updated = await Product.bulkWrite(update, {});

      res.json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json({ status: 'failure', message: 'Invalid signature' });
  }
}));
router.post('/updateCart', payemntauth, async (req, res) => {
  const { products } = req.body; // Expecting updated products array in the request body
  const userId = req.user.id; // Assuming user ID is available in req.user from authentication middleware

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Update the cart's products
    cart.products = products;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
