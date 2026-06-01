const mongoose = require('mongoose');

const adminSubcategorySchema = new mongoose.Schema(
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
    slug: {
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

const adminCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    subcategories: {
      type: [adminSubcategorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminCategory', adminCategorySchema);
