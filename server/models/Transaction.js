const { Schema } = require('mongoose');
const secondDb = require('./secondDb');

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  orderId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
  paymentMethod: { type: String },
  status: { type: String, default: 'Pending' },
  transactionId: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  userEmail: { type: String },
  SenderFirstname: { type: String },
  SenderLastname: { type: String },
  ReciverFirstname: { type: String },
  ReciverLastname: { type: String },
  mode: { type: String },
  time: { type: String },
});

const Transaction = secondDb.model('Transaction', transactionSchema);

module.exports = Transaction;
