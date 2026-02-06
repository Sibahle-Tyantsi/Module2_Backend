import pool from '../models/db_connection.js';


export const getAllEmployees = async (req, res) => {
  try {
    const [employees] = await pool.query('SELECT * FROM employees');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const [results] = await pool.query(
      'SELECT * FROM employees WHERE id = ?',
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(results[0]);
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const { name, position, department, salary } = req.body;
    
     if (!name || !position || !department || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const salaryNum = parseFloat(salary.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(salaryNum) || salaryNum <= 0) {
      return res.status(400).json({ message: "Invalid salary format" });
    }
    
    const validDepartments = ['Development', 'HR', 'QA', 'Sales', 'Marketing', 'Design', 'IT', 'Finance', 'Support'];
    if (!validDepartments.includes(department)) {
      return res.status(400).json({ message: "Invalid department" });
    }
    
    const [result] = await pool.query(
      'INSERT INTO employees (name, position, department, salary) VALUES (?, ?, ?, ?)',
      [name, position, department, salary]
    );
    res.json({ message: 'Employee added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, department, salary } = req.body;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const [existing] = await pool.query(
      'SELECT id FROM employees WHERE id = ?', [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await pool.query(
      'UPDATE employees SET name=?, position=?, department=?, salary=? WHERE id=?',
      [name, position, department, salary, id]
    );

    res.json({ message: 'Employee updated' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM employees WHERE id=?', [id]);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
