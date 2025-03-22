const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    weight: Number,
    maxPr: Map, // Exercise names as keys and max personal records as values
    // posts objectd
    // progress object to track progress with date
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;