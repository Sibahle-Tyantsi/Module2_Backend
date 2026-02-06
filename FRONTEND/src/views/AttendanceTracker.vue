<template>
  <div class="attendance-tracker">
    <h2>Attendance Tracker</h2>

    <div class="controls">
      <div class="control-group">
        <label>Select Employee:</label>
        <select v-model="selectedEmployeeId">
          <option value="">All Employees</option>
          <option v-for="emp in employeeData" :key="emp.employeeId" :value="emp.employeeId">
            {{ emp.name }}
          </option>
        </select>
      </div>

      <div class="control-group">
        <label>Month:</label>
        <select v-model="currentMonth">
          <option v-for="(month, index) in months" :key="index" :value="index">
            {{ month }}
          </option>
        </select>
      </div>
    </div>

    <div class="summary-cards">
      <div class="summary-card present">
        <h4>{{ presentCount }}</h4>
        <p>Present Days</p>
      </div>
      <div class="summary-card absent">
        <h4>{{ absentCount }}</h4>
        <p>Absent Days</p>
      </div>
      <div class="summary-card rate">
        <h4>{{ attendanceRate }}%</h4>
        <p>Attendance Rate</p>
      </div>
    </div>

    <div class="calendar">
      <div class="calendar-header">
        <div v-for="day in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" :key="day" class="day-header">
          {{ day }}
        </div>
      </div>
      <div class="calendar-body">
        <div
          v-for="day in calendarDays"
          :key="day.date"
          :class="['calendar-day', { 
            'today': day.isToday,
            'weekend': day.isWeekend,
            'current-month': day.isCurrentMonth,
            'has-attendance': day.attendance
          }]"
          @click="toggleAttendance(day)"
        >
          <div class="day-number">{{ day.day }}</div>
          <div v-if="day.attendance" class="attendance-status">
            <span :class="['status-dot', day.attendance.status.toLowerCase()]"></span>
          </div>
        </div>
      </div>
    </div>

  
    <div class="attendance-list">
      <h3>Recent Records</h3>
      <div v-for="record in recentRecords" :key="record.id" class="record-item">
        <div class="record-date">{{ formatDate(record.date) }}</div>
        <div class="record-details">
          <span class="employee-name">{{ getEmployeeName(record.employeeId) }}</span>
          <span :class="['status-badge', record.status.toLowerCase()]">{{ record.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const employeeData = [
  { employeeId: 1, name: "Sibongile Nkosi" },
  { employeeId: 2, name: "Lungile Moyo" },
  { employeeId: 3, name: "Thabo Molefe" },
  { employeeId: 4, name: "Keshav Naidoo" },
  { employeeId: 5, name: "Zanele Khumalo" },
];

export default {
  name: "AttendanceTracker",
  data() {
    const today = new Date();
    return {
      employeeData,
      selectedEmployeeId: "",
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      attendanceRecords: [
        { id: 1, employeeId: 1, date: '2026-02-01', status: 'Present' },
        { id: 2, employeeId: 1, date: '2026-02-02', status: 'Present' },
        { id: 3, employeeId: 2, date: '2026-02-01', status: 'Absent' },
        { id: 4, employeeId: 3, date: '2026-02-01', status: 'Present' },
        { id: 5, employeeId: 5, date: '2026-02-03', status: 'Present' },
      ]
    };
  },
  computed: {
    calendarDays() {
      const days = [];
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
      const today = new Date();

      const startWeekDay = firstDay.getDay();
      for (let i = 0; i < startWeekDay; i++) {
        const prevDay = new Date(firstDay);
        prevDay.setDate(prevDay.getDate() - (startWeekDay - i));
        days.push({ date: prevDay.toISOString().split('T')[0], day: prevDay.getDate(), isCurrentMonth: false });
      }

      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(this.currentYear, this.currentMonth, i);
        const dateStr = date.toISOString().split('T')[0];
        const isToday = date.toDateString() === today.toDateString();
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        let attendance = null;
        if (this.selectedEmployeeId) {
          attendance = this.attendanceRecords.find(
            r => r.employeeId === parseInt(this.selectedEmployeeId) && r.date === dateStr
          );
        }
        days.push({ date: dateStr, day: i, isCurrentMonth: true, isToday, isWeekend, attendance });
      }
      return days;
    },
    recentRecords() {
      return this.attendanceRecords
        .filter(r => !this.selectedEmployeeId || r.employeeId === parseInt(this.selectedEmployeeId))
        .sort((a,b) => b.date.localeCompare(a.date))
        .slice(0,5);
    },
    presentCount() {
      const records = this.selectedEmployeeId
        ? this.attendanceRecords.filter(r => r.employeeId === parseInt(this.selectedEmployeeId))
        : this.attendanceRecords;
      return records.filter(r => r.status === 'Present').length;
    },
    absentCount() {
      const records = this.selectedEmployeeId
        ? this.attendanceRecords.filter(r => r.employeeId === parseInt(this.selectedEmployeeId))
        : this.attendanceRecords;
      return records.filter(r => r.status === 'Absent').length;
    },
    attendanceRate() {
      const total = this.presentCount + this.absentCount;
      return total > 0 ? Math.round((this.presentCount / total) * 100) : 0;
    }
  },
  methods: {
    getEmployeeName(id) {
      const emp = this.employeeData.find(e => e.employeeId === id);
      return emp ? emp.name : "Unknown";
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },
    toggleAttendance(day) {
      if (day.isCurrentMonth && this.selectedEmployeeId) {
        const idx = this.attendanceRecords.findIndex(r =>
          r.employeeId === parseInt(this.selectedEmployeeId) && r.date === day.date
        );
        if (idx >= 0) {
          const current = this.attendanceRecords[idx];
          current.status = current.status === 'Present' ? 'Absent' : 'Present';
        } else {
          this.attendanceRecords.push({ id: Date.now(), employeeId: parseInt(this.selectedEmployeeId), date: day.date, status: 'Present' });
        }
        this.attendanceRecords = [...this.attendanceRecords];
      }
    }
  }
};
</script>

<style scoped>
.attendance-tracker {
  padding: 25px;
  background: white;
  border-radius: 12px;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}
h2 { text-align: center; color: #040c29; margin-bottom: 25px; }

.controls { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 25px; }
.control-group { flex: 1; min-width: 180px; }
.control-group label { display: block; margin-bottom: 6px; font-weight: 600; color: #1e40af; }
.control-group select { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 15px; }

.summary-cards { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 30px; }
.summary-card { flex: 1; min-width: 120px; text-align: center; color: white; font-weight: 600; border-radius: 12px; padding: 18px; }
.summary-card.present { background: #22c55e; }
.summary-card.absent { background: #ef4444; }
.summary-card.rate { background: #2563eb; }

.calendar { margin-bottom: 30px; }
.calendar-header { display: grid; grid-template-columns: repeat(7,1fr); background: #f3f4f6; border-radius: 8px 8px 0 0; }
.day-header { padding: 12px 0; text-align: center; font-weight: 700; color: #0c2577ae; border-right: 1px solid #e5e7eb; }
.day-header:last-child { border-right: none; }
.calendar-body { display: grid; grid-template-columns: repeat(7,1fr); border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden; }
.calendar-day { min-height: 70px; padding: 6px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; position: relative; cursor: pointer; background: white; transition: background 0.2s; }
.calendar-day:hover { background: #f0f9ff; }
.calendar-day.today { background: #e0f2fe; font-weight: 700; }
.calendar-day.weekend { background: #fef2f2; }
.calendar-day.has-attendance .status-dot { display: inline-block; width: 12px; height: 12px; border-radius: 50%; position: absolute; bottom: 6px; right: 6px; }
.status-dot.present { background-color: #22c55e; }
.status-dot.absent { background-color: #ef4444; }

.attendance-list h3 { margin-bottom: 16px; color: #031347; }
.record-item { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid #f1f5f9; }
.record-date { font-weight: 600; color: #6b7280; }
.status-badge.present { background-color: #d1fae5; color: #16a34a; padding: 4px 10px; border-radius: 20px; font-weight: 600; }
.status-badge.absent { background-color: #fee2e2; color: #dc2626; padding: 4px 10px; border-radius: 20px; font-weight: 600; }

/* Responsive */
@media (max-width:768px){
  .controls{flex-direction:column;}
  .summary-cards{flex-direction:column;}
}
</style>
