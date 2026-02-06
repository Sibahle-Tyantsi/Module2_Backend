const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.get('/', leaveController.getAllLeaves);
router.get('/:employee_id', leaveController.getLeavesByEmployee);
router.post('/', leaveController.addLeaveRequest);
router.put('/:employee_id/:date', leaveController.updateLeaveRequest);

module.exports = router;
