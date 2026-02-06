<template>
  <div class="time-off-manager">
    <h2>Time Off Requests</h2>
    
    <div class="request-form">
      <h3>New Request</h3>
      <div class="form-group">
        <label>Employee:</label>
        <select v-model="newRequest.employeeId">
          <option value="">Select Employee</option>
          <option v-for="emp in employeeData" :key="emp.employeeId" :value="emp.employeeId">
            {{ emp.name }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Leave Type:</label>
        <select v-model="newRequest.type">
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Personal Leave">Personal Leave</option>
        </select>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Start Date:</label>
          <input type="date" v-model="newRequest.startDate">
        </div>
        <div class="form-group">
          <label>End Date:</label>
          <input type="date" v-model="newRequest.endDate">
        </div>
      </div>
      
      <div class="form-group">
        <label>Reason:</label>
        <textarea v-model="newRequest.reason" rows="3"></textarea>
      </div>
      
      <button @click="submitRequest" class="btn-primary">Submit Request</button>
    </div>
    
    <div class="requests-list">
      <h3>All Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Dates</th>
            <th>Days</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in timeOffRequests" :key="request.id">
            <td>{{ getEmployeeName(request.employeeId) }}</td>
            <td>
              <span class="badge" :class="request.type === 'Sick Leave' ? 'red' : 'blue'">
                {{ request.type }}
              </span>
            </td>
            <td>{{ formatDate(request.startDate) }} - {{ formatDate(request.endDate) }}</td>
            <td>{{ request.totalDays }}</td>
            <td>
              <span class="badge" :class="getStatusClass(request.status)">
                {{ request.status }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button v-if="request.status === 'Pending'" @click="approveRequest(request.id)" 
                        class="btn-small blue">Approve</button>
                <button v-if="request.status === 'Pending'" @click="rejectRequest(request.id)" 
                        class="btn-small red">Reject</button>
                <button @click="deleteRequest(request.id)" class="btn-small">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="stats">
      <div class="stat-card blue">
        <h4>{{ pendingCount }}</h4>
        <p>Pending</p>
      </div>
      <div class="stat-card green">
        <h4>{{ approvedCount }}</h4>
        <p>Approved</p>
      </div>
      <div class="stat-card red">
        <h4>{{ rejectedCount }}</h4>
        <p>Rejected</p>
      </div>
    </div>
  </div>
</template>

<script>
const employeeData = [
  {
    employeeId: 1,
    name: "Sibongile Nkosi",
    position: "Software Engineer",
    department: "Development",
    salary: 70000,
    employmentHistory: "Joined in 2015, promoted to Senior in 2018",
    contact: "sibongile.nkosi@moderntech.com"
  },
  {
    employeeId: 2,
    name: "Lungile Moyo",
    position: "HR Manager",
    department: "HR",
    salary: 80000,
    employmentHistory: "Joined in 2013, promoted to Manager in 2017",
    contact: "lungile.moyo@moderntech.com"
  },
  {
    employeeId: 3,
    name: "Thabo Molefe",
    position: "Quality Analyst",
    department: "QA",
    salary: 55000,
    employmentHistory: "Joined in 2018",
    contact: "thabo.molefe@moderntech.com"
  },
  {
    employeeId: 4,
    name: "Keshav Naidoo",
    position: "Sales Representative",
    department: "Sales",
    salary: 60000,
    employmentHistory: "Joined in 2020",
    contact: "keshav.naidoo@moderntech.com"
  },
  {
    employeeId: 5,
    name: "Zanele Khumalo",
    position: "Marketing Specialist",
    department: "Marketing",
    salary: 58000,
    employmentHistory: "Joined in 2019",
    contact: "zanele.khumalo@moderntech.com"
  },
  {
    employeeId: 6,
    name: "Sipho Zulu",
    position: "UI/UX Designer",
    department: "Design",
    salary: 65000,
    employmentHistory: "Joined in 2016",
    contact: "sipho.zulu@moderntech.com"
  },
  {
    employeeId: 7,
    name: "Naledi Moeketsi",
    position: "DevOps Engineer",
    department: "IT",
    salary: 72000,
    employmentHistory: "Joined in 2017",
    contact: "naledi.moeketsi@moderntech.com"
  },
  {
    employeeId: 8,
    name: "Farai Gumbo",
    position: "Content Strategist",
    department: "Marketing",
    salary: 56000,
    employmentHistory: "Joined in 2021",
    contact: "farai.gumbo@moderntech.com"
  },
  {
    employeeId: 9,
    name: "Karabo Dlamini",
    position: "Accountant",
    department: "Finance",
    salary: 62000,
    employmentHistory: "Joined in 2018",
    contact: "karabo.dlamini@moderntech.com"
  },
  {
    employeeId: 10,
    name: "Fatima Patel",
    position: "Customer Support Lead",
    department: "Support",
    salary: 58000,
    employmentHistory: "Joined in 2016",
    contact: "fatima.patel@moderntech.com"
  }
];

export default {
  name: 'TimeOffManager',
  data() {
    return {
      employeeData, 
      timeOffRequests: [
        { id: 1, employeeId: 1, type: 'Annual Leave', startDate: '2025-12-15', endDate: '2025-12-22', 
          totalDays: 8, reason: 'Vacation', status: 'Approved' },
        { id: 2, employeeId: 3, type: 'Sick Leave', startDate: '2025-12-10', endDate: '2025-12-12', 
          totalDays: 3, reason: 'Flu', status: 'Approved' },
        { id: 3, employeeId: 5, type: 'Personal Leave', startDate: '2025-12-20', endDate: '2025-12-20', 
          totalDays: 1, reason: 'Doctor appointment', status: 'Pending' }
      ],
      newRequest: {
        employeeId: '',
        type: 'Annual Leave',
        startDate: '',
        endDate: '',
        reason: '',
        totalDays: 0,
        status: 'Pending'
      },
      nextId: 4
    };
  },
  computed: {
    pendingCount() {
      return this.timeOffRequests.filter(r => r.status === 'Pending').length;
    },
    approvedCount() {
      return this.timeOffRequests.filter(r => r.status === 'Approved').length;
    },
    rejectedCount() {
      return this.timeOffRequests.filter(r => r.status === 'Rejected').length;
    }
  },
  methods: {
    getEmployeeName(employeeId) {
      const emp = this.employeeData.find(e => e.employeeId === employeeId);
      return emp ? emp.name : 'Unknown';
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },
    getStatusClass(status) {
      if (status === 'Approved') return 'green';
      if (status === 'Rejected') return 'red';
      return 'yellow';
    },
    submitRequest() {
      if (!this.newRequest.employeeId || !this.newRequest.startDate || !this.newRequest.endDate) {
        alert('Please fill all required fields');
        return;
      }
      
      const start = new Date(this.newRequest.startDate);
      const end = new Date(this.newRequest.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      const request = {
        id: this.nextId++,
        ...this.newRequest,
        totalDays: days
      };
      
      this.timeOffRequests.push(request);
      
      this.newRequest = {
        employeeId: '',
        type: 'Annual Leave',
        startDate: '',
        endDate: '',
        reason: '',
        totalDays: 0,
        status: 'Pending'
      };
      
      alert('Request submitted!');
    },
    approveRequest(id) {
      const request = this.timeOffRequests.find(r => r.id === id);
      if (request) request.status = 'Approved';
    },
    rejectRequest(id) {
      const request = this.timeOffRequests.find(r => r.id === id);
      if (request) request.status = 'Rejected';
    },
    deleteRequest(id) {
      if (confirm('Delete this request?')) {
        this.timeOffRequests = this.timeOffRequests.filter(r => r.id !== id);
      }
    }
  }
};
</script>

<style scoped>
.time-off-manager {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

h2, h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.request-form {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

table th {
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.badge {
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
}

.badge.blue {
  background-color: #3498db;
  color: white;
}

.badge.red {
  background-color: #e74c3c;
  color: white;
}

.badge.green {
  background-color: #2ecc71;
  color: white;
}

.badge.yellow {
  background-color: #f1c40f;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.btn-small {
  padding: 5px 10px;
  font-size: 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-small.blue {
  background-color: #3498db;
  color: white;
}

.btn-small.red {
  background-color: #e74c3c;
  color: white;
}

.stats {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.stat-card {
  flex: 1;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  color: white;
}

.stat-card.blue {
  background-color: #3498db;
}

.stat-card.green {
  background-color: #2ecc71;
}

.stat-card.red {
  background-color: #e74c3c;
}

.stat-card h4 {
  margin: 0;
  font-size: 24px;
  color: white;
}

.stat-card p {
  margin: 5px 0 0;
}
</style>