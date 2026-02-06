const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');

router.get('/', payrollController.getAllPayrolls);
router.get('/:employee_id', payrollController.getPayrollByEmployee);
router.post('/', payrollController.addPayroll);
router.put('/:payroll_id', payrollController.updatePayroll);

module.exports = router;
