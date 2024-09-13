const mongoose = require('mongoose');

const secondDb = mongoose.createConnection(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = secondDb;
