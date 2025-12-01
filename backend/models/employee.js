const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  
  // Define Employee
  first_name: { type: String, required: true, trim: true },
  last_name:  { type: String, required: true, trim: true },

  email:      { type: String, required: true, trim: true, lowercase: true, unique: true },
  position:   { type: String, required: true, trim: true },
  salary:     { type: Number, required: true, min: 0 },
  department: { type: String, required: true, trim: true },

  hired: { type: Date, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
}, { collection: 'employees' });

// Save Employee
employeeSchema.pre('save', function(next) {
  this.updated = new Date();
  next();
});

module.exports = mongoose.model('employee', employeeSchema);