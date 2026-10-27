const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    },
    department: { type: String, required: [true, 'Department is required'], trim: true },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
      validate: { validator: (v) => v > 0, message: 'Salary must be greater than zero' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);