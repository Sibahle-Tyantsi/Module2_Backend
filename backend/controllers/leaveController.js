const db = require('../config/db');

exports.getAllLeaves = (req, res) => {
  db.query('SELECT * FROM leave_requests', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getLeavesByEmployee = (req, res) => {
  const { employee_id } = req.params;
  db.query('SELECT * FROM leave_requests WHERE employee_id=?', [employee_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.addLeaveRequest = (req, res) => {
  const { employee_id, date, status, reason } = req.body;
  db.query(
    'INSERT INTO leave_requests (employee_id, date, status, reason) VALUES (?, ?, ?, ?)',
    [employee_id, date, status, reason],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Leave request added' });
    }
  );
};

exports.updateLeaveRequest = (req, res) => {
  const { employee_id, date } = req.params;
  const { status, reason } = req.body;
  db.query(
    'UPDATE leave_requests SET status=?, reason=? WHERE employee_id=? AND date=?',
    [status, reason, employee_id, date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Leave request updated' });
    }
  );
};
