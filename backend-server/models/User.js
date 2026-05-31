const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'active',
    },
    mobile: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
