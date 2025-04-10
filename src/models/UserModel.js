const mongoose = require('mongoose')
const userShema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    city: { type: String },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User",userShema);
module.exports = User;

