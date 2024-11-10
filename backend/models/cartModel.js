const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
