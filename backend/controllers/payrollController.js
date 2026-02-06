const db = require('../config/db');

exports.getAllPayrolls = (req, res) => {
  db.query('SELECT * FROM payrolldata', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getPayrollByEmployee = (req, res) => {
  const { employee_id } = req.params;
  db.query('SELECT * FROM payrolldata WHERE employee_id=?', [employee_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.addPayroll = (req, res) => {
  const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
  db.query(
    'INSERT INTO payrolldata (employee_id, hours_worked, leave_deductions, final_salary) VALUES (?, ?, ?, ?)',
    [employee_id, hours_worked, leave_deductions, final_salary],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Payroll data added' });
    }
  );
};

exports.updatePayroll = (req, res) => {
  const { payroll_id } = req.params;
  const { hours_worked, leave_deductions, final_salary } = req.body;
  db.query(
    'UPDATE payrolldata SET hours_worked=?, leave_deductions=?, final_salary=? WHERE payroll_id=?',
    [hours_worked, leave_deductions, final_salary, payroll_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Payroll data updated' });
    }
  );
};
