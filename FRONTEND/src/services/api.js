

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = {

  async getEmployees() {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) throw new Error("Failed to fetch employees");
    return response.json();
  },

  async getEmployeeById(id) {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    if (!response.ok) throw new Error("Failed to fetch employee");
    return response.json();
  },

  async createEmployee(employeeData) {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employeeData)
    });

    if (!response.ok) throw new Error("Failed to create employee");
    return response.json();
  },

  async updateEmployee(id, employeeData) {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employeeData)
    });

    if (!response.ok) throw new Error("Failed to update employee");
    return response.json();
  },

  async deleteEmployee(id) {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Failed to delete employee");
    return response.json();
  }

};
