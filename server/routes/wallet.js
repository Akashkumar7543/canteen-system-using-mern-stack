const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet.js');
router.post('/verify', async (req, res) => {
    const { order_id, payment_id, signature, userId, amount } = req.body;
  
    const generatedSignature = crypto.createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET')
      .update(order_id + '|' + payment_id)
      .digest('hex');
  
    if (generatedSignature === signature) {
      try {
        let wallet = await Wallet.findOne({ userId });
        if (!wallet) {
          wallet = new Wallet({ userId, balance: 0, transactions: [] });
        }
        wallet.balance += amount;
        wallet.transactions.push({ type: 'credit', amount });
        await wallet.save();
        res.json(wallet);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(400).json({ error: 'Payment verification failed' });
    }
  });

// Get wallet details

router.get('/:userId', async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add money to wallet
router.post('/add', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, balance: 0, transactions: [] });
    }
    wallet.balance += amount;
    wallet.transactions.push({ type: 'credit', amount });
    await wallet.save();
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deduct money from wallet
router.post('/deduct', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    wallet.balance -= amount;
    wallet.transactions.push({ type: 'debit', amount });
    await wallet.save();
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
