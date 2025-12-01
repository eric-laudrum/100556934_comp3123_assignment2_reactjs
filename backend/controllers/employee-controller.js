const { validationResult } = require('express-validator');
const Employee = require('../models/employee');

// --------------------------   List all employees on file ------------------------
exports.listEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().lean();
    res.status(200).json(employees.map(employee => ({
        employee_id: employee._id.toString(),
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        position: employee.position,
        salary: employee.salary,
        hired: employee.hired,
        department: employee.department
    })));
  } catch (employee) { next(employee); }
};

// --------------------------   Create a new employee record ------------------------
exports.createEmployee = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: false, errors: errors.array() });
    const emp = await Employee.create(req.body);
    res.status(201).json({ message: 'Employee created successfully.', employee_id: emp._id.toString() });
  } catch (e) {
    if (e.code === 11000) { e.status = 409; e.message = 'Employee email already exists'; }
    next(e);
  }
};

// --------------------------   Get employee record by ID ------------------------
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employee_id).lean();
    if (!employee) return res.status(404).json({ status: false, message: 'Employee not found' });
    res.status(200).json({
      employee_id: employee._id.toString(),
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      position: employee.position,
      salary: employee.salary,
      hired: employee.hired,
      department: employee.department
    });
  } catch (e) { next(e); }
};

// --------------------------   Update Employee Record ------------------------
exports.updateEmployee = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: false, errors: errors.array() });

    const updated = await Employee.findByIdAndUpdate(
      req.params.employee_id,
      { $set: { ...req.body, updated: new Date() } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ status: false, message: 'Employee not found' });
    res.status(200).json({ message: 'Employee updated successfully.' });
  } catch (e) { next(e); }
};

 // --------------------------   Delete employee record  ------------------------

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee_id = req.params.employee_id;
    if (!employee_id) return res.status(400).json({ status: false, message: 'employee_id query parameter is required' });
    const deleted = await Employee.findByIdAndDelete(employee_id);
    if (!deleted) return res.status(404).json({ status: false, message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (e) { next(e); }
};
