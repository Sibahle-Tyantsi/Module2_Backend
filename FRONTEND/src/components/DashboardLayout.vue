<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <h2>HR System</h2>
      <ul>
        <li @click="$router.push('/dashboard')" :class="{ active: $route.path === '/dashboard' }">🏠 Dashboard</li>
        <li @click="$router.push('/dashboard/employees')" :class="{ active: $route.path === '/dashboard/employees' }">👥 Employees</li>
        <li @click="$router.push('/dashboard/attendance')" :class="{ active: $route.path === '/dashboard/attendance' }">⏱ Attendance</li>
        <li @click="$router.push('/dashboard/payroll')" :class="{ active: $route.path === '/dashboard/payroll' }">💰 Payroll</li>
        <li @click="$router.push('/dashboard/analytics')" :class="{ active: $route.path === '/dashboard/analytics' }">📊 Analytics</li>
        <li @click="$router.push('/dashboard/leave')" :class="{ active: $route.path === '/dashboard/leave' }">📝 Leave</li>
        <li @click="logout" class="logout-button">🚪 Logout</li>
      </ul>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userRole");
  router.push("/login");
}
</script>

<style scoped>

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f3f4f6; 
  font-family: 'Inter', sans-serif;
}


.sidebar {
  width: 260px;
  padding: 25px 20px;
  background: #111827; 
  color: #fff;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1f2937;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 35px;
  text-align: center;
  color: #fff;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar li {
  padding: 14px 18px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  transition: background 0.2s, color 0.2s, transform 0.15s;
}

.sidebar li:hover {
  background: #1f2937;
  color: #60a5fa; 
  transform: translateX(3px);
}

.sidebar li.active {
  background: #374151;
  color: #60a5fa;
  font-weight: 600;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.3);
}

.logout-button {
  margin-top: auto;
  padding: 14px 18px;
  background: #dc2626;
  color: #fff !important;
  font-weight: 600;
  border-radius: 10px;
  text-align: center;
  transition: 0.2s;
}

.logout-button:hover {
  background: #b91c1c;
}

.main-content {
  flex: 1;
  padding: 35px 45px;
  overflow-y: auto;
}

.main-content::-webkit-scrollbar {
  width: 8px;
}
.main-content::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 10px;
}
</style>