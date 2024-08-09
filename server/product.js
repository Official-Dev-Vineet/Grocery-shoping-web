const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  color: String,
  weight: Number,
});

module.exports = mongoose.model('Product', productSchema);
