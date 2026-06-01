const mongoose = require('mongoose');

const adminServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    priceFrom: {
      type: Number,
      required: true,
      min: 0,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    subcategoryName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminService', adminServiceSchema);
