const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  status: { type: String, enum: ["student", "employee"] },
  hashedpassword: String, // Hashed using bcrypt
});

module.exports = mongoose.model("User", userSchema);
