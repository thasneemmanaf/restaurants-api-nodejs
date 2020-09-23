const mongoose = require("mongoose");
const validator = require("validator");

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have an email id"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minlength: 5,
    select: false,
  },
});

// User model
module.exports = mongoose.model("User", userSchema);
