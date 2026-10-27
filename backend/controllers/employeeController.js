const mongoose = require('mongoose');
const Employee = require('../models/Employee');

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const checkId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid employee id' });
    return false;
  }
  return true;
};

// GET /api/employees?search=&department=
exports.getEmployees = asyncHandler(async (req, res) => {
  const { search, department } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: escapeRegex(search), $options: 'i' };
  if (department) filter.department = department;
  const employees = await Employee.find(filter).sort({ createdAt: -1 });
  res.status(200).json(employees);
});

// GET /api/employees/:id
exports.getEmployee = asyncHandler(async (req, res) => {
  if (!checkId(req.params.id, res)) return;
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.status(200).json(employee);
});

// POST /api/employees
exports.createEmployee = asyncHandler(async (req, res) => {
  const { name, email, department, salary } = req.body;
  const employee = await Employee.create({ name, email, department, salary });
  res.status(201).json(employee);
});

// PUT /api/employees/:id
exports.updateEmployee = asyncHandler(async (req, res) => {
  if (!checkId(req.params.id, res)) return;
  const { name, email, department, salary } = req.body;
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    { name, email, department, salary },
    { new: true, runValidators: true }
  );
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.status(200).json(employee);
});

// DELETE /api/employees/:id
exports.deleteEmployee = asyncHandler(async (req, res) => {
  if (!checkId(req.params.id, res)) return;
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.status(200).json({ message: 'Employee deleted successfully' });
});