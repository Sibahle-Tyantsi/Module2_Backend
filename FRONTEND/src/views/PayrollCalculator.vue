<template>
  <div class="payroll-calculator">
    <div class="card">
      <h2>Payroll Calculator</h2>

      <!-- Employee Selector -->
      <div class="employee-selector">
        <label>Select Employee</label>
        <select v-model="selectedEmployeeId" @change="loadEmployeeData">
          <option value="">— Choose an employee —</option>
          <option
            v-for="emp in employeeData"
            :key="emp.employeeId"
            :value="emp.employeeId"
          >
            {{ emp.name }} • {{ emp.department }}
          </option>
        </select>
      </div>

      <!-- Employee Info -->
      <div v-if="selectedEmployee" class="employee-info">
        <h3>Employee Details</h3>

        <p><strong>Name:</strong> {{ selectedEmployee.name }}</p>
        <p><strong>Position:</strong> {{ selectedEmployee.position }}</p>
        <p><strong>Department:</strong> {{ selectedEmployee.department }}</p>
        <p><strong>Salary:</strong> R{{ selectedEmployee.salary.toLocaleString() }}</p>
      </div>

      <!-- Payroll Section -->
      <div v-if="selectedEmployee" class="payroll-section">
        <h3>Payroll Inputs</h3>

        <div class="input-group">
          <label>Base Salary</label>
          <input type="number" v-model.number="baseSalary" @input="calculatePayroll" />
        </div>

        <div class="input-group">
          <label>Hours Worked</label>
          <input type="number" v-model.number="hoursWorked" @input="calculatePayroll" />
        </div>

        <div class="input-group">
          <label>Leave Deductions (hours)</label>
          <input type="number" v-model.number="leaveDeductions" @input="calculatePayroll" />
        </div>

        <!-- Results -->
        <div class="results-card">
          <p>Gross Salary: <strong>R{{ grossSalary.toFixed(2) }}</strong></p>
          <p>Tax ({{ taxRate }}%): <strong>-R{{ taxAmount.toFixed(2) }}</strong></p>
          <p>Other Deductions: <strong>-R{{ otherDeductions.toFixed(2) }}</strong></p>
          <p>Net Salary: <strong>R{{ netSalary.toFixed(2) }}</strong></p>
        </div>

        <button @click="generatePayslip">Generate Payslip</button>
      </div>
    </div>
  </div>
</template>

<script>
const employeeData = [
  { employeeId: 1, name: "Sibongile Nkosi", position: "Software Engineer", department: "Development", salary: 70000 },
  { employeeId: 2, name: "Lungile Moyo", position: "HR Manager", department: "HR", salary: 80000 },
  { employeeId: 3, name: "Thabo Molefe", position: "QA Analyst", department: "QA", salary: 55000 }
];

export default {
  name: "PayrollCalculator",

  data() {
    return {
      employeeData,
      selectedEmployeeId: "",
      selectedEmployee: null,

      baseSalary: 0,
      hoursWorked: 160,
      leaveDeductions: 0,

      taxRate: 15,
      otherDeductions: 1200,

      grossSalary: 0,
      taxAmount: 0,
      netSalary: 0
    };
  },

  methods: {
    loadEmployeeData() {
      this.selectedEmployee = this.employeeData.find(
        emp => emp.employeeId === Number(this.selectedEmployeeId)
      );

      if (this.selectedEmployee) {
        this.baseSalary = this.selectedEmployee.salary;
        this.calculatePayroll();
      }
    },

    calculatePayroll() {
      const hourlyRate = this.baseSalary / 160;
      const leaveDeductionAmount = this.leaveDeductions * hourlyRate;

      this.grossSalary = (this.hoursWorked * hourlyRate) - leaveDeductionAmount;
      this.taxAmount = (this.grossSalary * this.taxRate) / 100;
      this.netSalary = this.grossSalary - this.taxAmount - this.otherDeductions;
    },

    generatePayslip() {
      if (!this.selectedEmployee) return;

      alert(
        `Payslip Generated!\nEmployee: ${this.selectedEmployee.name}\nNet Salary: R${this.netSalary.toFixed(2)}`
      );
    }
  }
};
</script>

<style scoped>
.payroll-calculator {
  padding: 2rem;
  min-height: 100vh;
  background-color: #f8fafc; /* same as dashboard background */
  font-family: 'Inter', sans-serif;
}

/* Card container */
.card {
  max-width: 700px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  padding: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
}

h2 {
  text-align: center;
  color: #0f766e; /* teal same as dashboard headings */
  font-weight: 700;
  font-size: 1.875rem;
  margin-bottom: 2rem;
}

/* Employee Selector */
.employee-selector {
  margin-bottom: 2rem;
}

.employee-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151; /* same gray as dashboard text */
}

.employee-selector select {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 2px solid #d1d5db; /* same border gray */
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.employee-selector select:focus {
  outline: none;
  border-color: #0f766e;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
}

/* Employee Info */
.employee-info {
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background: #f0fdfa; /* light teal background */
  border-left: 5px solid #0f766e; /* teal accent */
  border-radius: 8px;
}

.employee-info p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #374151; /* gray text */
}

/* Payroll Inputs */
.payroll-section {
  margin-top: 2rem;
}

.input-group {
  margin-bottom: 1.25rem;
}

.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #6b7280; /* gray label */
}

.input-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid #d1d5db; /* gray border */
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #0f766e;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
}

/* Results Card */
.results-card {
  background: #f0fdfa; /* soft teal */
  border: 1px solid #ccfbf1; /* lighter teal border */
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.results-card p {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  font-weight: 600;
  color: #374151; /* consistent gray text */
}

.results-card p .gross {
  color: #111827;
}

.results-card p .negative {
  color: #ef4444; /* red deductions */
}

.results-card p .net {
  color: #16a34a; /* green net salary */
  font-size: 1.125rem;
}

/* Buttons */
button {
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.875rem 1.25rem;
  transition: all 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

button.generate {
  background-color: #0f766e;
  color: #ffffff;
}

button.save {
  background-color: transparent;
  color: #0f0655b5;
  border: 2px solid #270f7688;
}

button.save:hover {
  background-color: #ccfbf1;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.empty-state h3 {
  color: #111827;
  margin-bottom: 0.75rem;
}

.empty-state p {
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 640px) {
  .card {
    padding: 1.5rem;
  }
  button {
    width: 100%;
    margin-bottom: 1rem;
  }
}


</style>
