const express = require('express');
const { body } = require('express-validator');

// Controller functions
const {
  listEmployees, 
  createEmployee, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee
} = require('../controllers/employee-controller');

// Create router
const router = express.Router();

// Get all employees
router.get('/employees', listEmployees);

// Create an employee record
router.post('/employees', [
  body('first_name').isString().trim().notEmpty(),
  body('last_name').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('position').isString().trim().notEmpty(),
  body('salary').isNumeric(),
  body('hired').isISO8601().toDate(),
  body('department').isString().trim().notEmpty()
], createEmployee);

// Find employee by ID
router.get('/employees/:employee_id', getEmployeeById);

// Update employee records by employee ID
router.put('/employees/:employee_id', [
  body().custom(b => {
    const allowed = ['first_name','last_name','email','position','salary','hired','department'];
    const keys = Object.keys(b || {});
    if (keys.length === 0) throw new Error('At least one field is required');
    const invalid = keys.filter(k => !allowed.includes(k));
    if (invalid.length) throw new Error('Invalid fields: ' + invalid.join(', '));
    return true;
  }),

  body('email').optional().isEmail().normalizeEmail(),
  body('salary').optional().isNumeric(),
  body('hired').optional().isISO8601().toDate()
], updateEmployee);


// Delete an employee record
router.delete('/employees/:employee_id', deleteEmployee);

// Export router
module.exports = router;
