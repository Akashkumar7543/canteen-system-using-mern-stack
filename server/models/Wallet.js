const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    walletBalance: { type: Number, default: 0 },
});

const Wallte = mongoose.model('Wallte', userSchema);

module.exports = Wallte;
