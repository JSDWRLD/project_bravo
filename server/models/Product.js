const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: { 
        // UserID auto assigned by mongo
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    }
});

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: { type: String, enum: ['retro-games', 'board-games', 'puzzles', 'accessories'] }, // Added "accessories"
  productImage: {
    type: [String],
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  productRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    required: true,
    min: 0,
  },
  reviews: [reviewSchema],
});

module.exports = mongoose.model('Product', productSchema);
