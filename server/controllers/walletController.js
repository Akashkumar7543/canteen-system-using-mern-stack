const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");
const Transaction = require('../models/Transaction');
const Product = require('../models/productModel');
const Order = require('../models/orderModel')
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");
const Cart = require("../models/CartModel");
const mongoose = require("mongoose"); // Erase if already required
const uniqid = require("uniqid");


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const addMoney = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payment_capture = 1;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_order_${userId}`,
      payment_capture,
    };

    const response = await razorpay.orders.create(options);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyPayment = async (req, res) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      amount,
    } = req.body;
    try {
      const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generated_signature = hmac.digest("hex");
  
      if (generated_signature === razorpay_signature) {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        const currentBalance = Number(user.walletBalance) || 0;
        const newAmount = Number(amount);
  
        user.walletBalance = currentBalance + newAmount;
  
        const newTransaction = {
          amount: newAmount,
          type: "Credit",
          orderId: razorpay_order_id,
          date: new Date(),
          description: "Wallet recharge through Razorpay",
          paymentMethod: "Wallet Recharge",
          status: "Completed",
          transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          userId: user._id,
          userEmail: user.email,
          name: 'Nexus Wallet', // Example name; adjust as needed
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          method: 'Razorpay', // Example method; adjust as needed
          details: {
            id: '#00123521', // Example ID; adjust as needed
            method: 'Razorpay', // Example method; adjust as needed
            invoiceDate: 'April 29, 2023', // Example date; adjust as needed
            dueDate: 'June 5, 2023', // Example date; adjust as needed
            datePaid: 'June 4, 2023', // Example date; adjust as needed
          },
        };
  
        user.transactionHistory = user.transactionHistory || [];
        user.transactionHistory.push(newTransaction);
  
        await user.save();
        res.json({ success: true });
      } else {
        res.status(400).json({ message: "Invalid signature" });
      }
    } catch (error) {
      console.error("Error in verifyPayment function:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

const getWalletDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      walletBalance: user.walletBalance,
      transactionHistory: user.transactionHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const transferMoney = async (req, res) => {
    const { senderUsername, recipientUsername, amount } = req.body;
  
    try {
      const sender = await User.findOne({ username: senderUsername });
      const recipient = await User.findOne({ username: recipientUsername });
  
      if (!sender || !recipient) {
        return res.status(404).json({ message: 'Sender or recipient not found' });
      }
  
      // Check if sender and recipient are the same
      if (senderUsername === recipientUsername) {
        return res.status(400).json({ message: 'You cannot transfer money to yourself' });
      }
  
      if (sender.walletBalance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      // Deduct amount from sender's wallet
      sender.walletBalance -= amount;
      await sender.save();
  
      // Add amount to recipient's wallet
      recipient.walletBalance += amount;
      await recipient.save();
  
      // Create transaction for sender
      const senderTransaction = {
        amount,
        type: 'Debit',
        orderId: `transfer_${sender._id}_${recipient._id}`,
        date: new Date(),
        description: 'Quick Transfer',
        mode: 'Send To',
        paymentMethod: 'Quick Transfer Send',
        status: 'Completed',
        transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        userId: sender._id,
        userEmail: sender.email,
        ReciverFirstname: recipient.firstName,
        ReciverLastname: recipient.lastName,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
  
      // Create transaction for recipient
      const recipientTransaction = {
        amount,
        type: 'Credit',
        orderId: `transfer_${sender._id}_${recipient._id}`,
        date: new Date(),
        description: 'Money received from Quick Transfer',
        paymentMethod: 'Quick Transfer Received',
        mode: 'Received From',
        status: 'Completed',
        transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        userId: recipient._id,
        userEmail: recipient.email,
        SenderFirstname: sender.firstName,
        SenderLastname: sender.lastName,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
  
      // Save transactions to the primary database
      sender.transactionHistory = sender.transactionHistory || [];
      sender.transactionHistory.push(senderTransaction);
      await sender.save();
  
      recipient.transactionHistory = recipient.transactionHistory || [];
      recipient.transactionHistory.push(recipientTransaction);
      await recipient.save();
  
      // Save transactions to the secondary database
      await Transaction.create(senderTransaction);
      await Transaction.create(recipientTransaction);
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error in transferMoney function:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const getUsers = async (req, res) => {
    try {
      const users = await User.find({}, 'firstName lastName username image');
      res.json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  const getTransactions = async (req, res) => {
    try {
      const user = req.user; // Get the authenticated user from the request
      const transactions = user.transactionHistory; // Get the transaction history
  
      res.json(transactions); // Send the transaction history as the response
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
 
  const orderProductWithWallet = asyncHandler(async (req, res) => {
    const { userId, couponApplied } = req.body;// Assuming user ID comes from authenticated user
    validateMongoDbId(userId);

    try {
        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get the user's cart
        let userCart = await Cart.findOne({ orderby: user._id }).populate("products.product");
        if (!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Calculate final amount with coupon
        let finalAmount = userCart.cartTotal;
        if (couponApplied) {
            const validCoupon = await Coupon.findOne({ name: couponApplied });
            if (validCoupon) {
                let discount = validCoupon.discount || 0;
                finalAmount -= discount;
                if (finalAmount < 0) {
                    finalAmount = 0;
                }
            } else {
                return res.status(400).json({ message: "Invalid Coupon" });
            }
        }

        // Check wallet balance
        if (user.walletBalance < finalAmount) {
            return res.status(400).json({ message: "Insufficient wallet balance" });
        }

        // Deduct the amount from the user's wallet balance
        user.walletBalance -= finalAmount;

        // Create a new transaction for the purchase
        const newTransaction = {
            amount: finalAmount,
            type: "Debit",
            orderId: `order_${user._id}_${Date.now()}`,
            date: new Date(),
            description: `Purchased items Through Wallet`,
            paymentMethod: "Order Items from Wallet",
            status: "Completed",
            SenderFirstname: "Nexus",
            SenderLastname: "Purchased",
            transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            userId: user._id,
            userEmail: user.email,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };

        // Save the transaction in both the user's history and the secondary database
        user.transactionHistory = user.transactionHistory || [];
        user.transactionHistory.push(newTransaction);
        await user.save();
        await Transaction.create(newTransaction);

        // Create the order from the cart
        const order = new Order({
          paymentIntent: {
            id: uniqid(),
            method: "Wallet",
            amount: finalAmount,
            status: "Nexus Wallte",
            created: Date.now(),
            currency: "Rs",
          },
            userId: user._id,
            products: userCart.products,
            totalAmount: finalAmount,
            paymentMethod: "Wallet Order",
            status: "Completed",
            transactionId: newTransaction.transactionId,
        });
        await order.save();

        // Update product quantities
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } },
                },
            };
        });
        await Product.bulkWrite(update);

        // Clear the cart
        await Cart.findOneAndUpdate({ orderby: user._id }, { products: [], cartTotal: 0 });

        res.json({ success: true, message: "Order placed successfully using wallet!" });
    } catch (error) {
        console.error("Error in orderProductWithWallet function:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter

  // Validate the ID before proceeding
  try {
      validateMongoDbId(userId);
  } catch (error) {
      return res.status(400).json({ message: error.message });
  }

  try {
      // Fetch orders from the database
      const orders = await Order.find({ userId }).populate('products.product').populate('userId').sort({ createdAt: -1 }); 

      if (orders.length === 0) {
          return res.status(404).json({ message: "No orders found for this user" });
      }

      res.json({ success: true, orders });
  } catch (error) {
      console.error("Error in getOrdersByUser function:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

  
  


module.exports = {
  addMoney,
  verifyPayment,
  getWalletDetails,
  transferMoney,
  getUsers,
  getTransactions,
  orderProductWithWallet,
  getOrdersByUser


};
