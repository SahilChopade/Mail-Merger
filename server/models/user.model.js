const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isPasswordSet: { type: Boolean, default: false },
    googleId: { type: String },
    refreshToken: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
module.exports = User
