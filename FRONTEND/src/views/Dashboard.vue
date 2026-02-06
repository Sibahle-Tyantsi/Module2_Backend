
<template>
  <div class="dashboard-page">
    <h1>Welcome to HR Dashboard</h1>
    
    <div class="stats-grid">
      <div class="stat-card">
        <h3>{{ totalEmployees }}</h3>
        <p>Total Employees</p>
      </div>
      <div class="stat-card">
        <h3>{{ departments }}</h3>
        <p>Departments</p>
      </div>
      <div class="stat-card">
        <h3>R{{ payrollTotal.toLocaleString() }}</h3>
        <p>Monthly Payroll</p>
      </div>
    </div>

    <div class="recent-employees">
      <h2>Recent Employees</h2>
      <ul>
        <li v-for="emp in recentEmployees" :key="emp.employeeId">
          <strong>{{ emp.name }}</strong> • {{ emp.position }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { api } from "@/services/api.js";

export default {
  name: "Dashboard",

  data() {
    return {
      employeeData: []
    };
  },

  async created() {
    await this.loadEmployees();
  },

  methods: {
    async loadEmployees() {
      this.employeeData = await api.getEmployees();
    }
  },

  computed: {
    totalEmployees() {
      return this.employeeData.length;
    },
    departments() {
      const deps = new Set(this.employeeData.map(emp => emp.department));
      return deps.size;
    },
    payrollTotal() {
      if (!this.employeeData.length) return 0;

      const salaries = this.employeeData.map(emp => emp.salary).filter(s => !isNaN(s));
      if (!salaries.length) return 0;

      const total = salaries.reduce((sum, val) => sum + val, 0);
      return total / salaries.length;
    },

recentEmployees() {
      return [...this.employeeData]
        .sort((a, b) => b.employeeId - a.employeeId)
        .slice(0, 3);
    }
  }
};

</script>

<style scoped>
.dashboard-page {
  padding: 1.5rem;
}
h1 {
  color: #1f2937;
  margin-bottom: 2rem;
  font-size: 1.875rem;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  text-align: center;
}
.stat-card h3 {
  color: #111827;
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
}
.stat-card p {
  color: #6b7280;
  margin: 0;
}
.recent-employees h2 {
  color: #1f2937;
  margin-bottom: 1rem;
}
.recent-employees ul {
  list-style: none;
  padding: 0;
}
.recent-employees li {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
}
.recent-employees li:last-child {
  border-bottom: none;
}
</style>