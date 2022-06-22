const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  featured: { type: Boolean, default: false },
  name: {
    type: String,
    required: [true, 'product name must be provided'],
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  price: { type: Number, required: [true, 'product price must be provided'] },
  rating: { type: Number, default: 0 },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported',
    },
    // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Product', ProductSchema);
