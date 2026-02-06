// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';

// Views
import Login from '@/views/Login.vue';
import DashboardLayout from '@/components/DashboardLayout.vue';
import Dashboard from '@/views/Dashboard.vue';
import EmployeeList from '@/views/EmployeeList.vue';
import EmployeeProfile from '@/views/EmployeeProfile.vue';
import EditProfile from '@/views/EditProfile.vue';
import AddEmployee from '@/views/AddEmployee.vue';
import AttendanceTracker from '@/views/AttendanceTracker.vue';
import TimeOffManager from '@/views/TimeOffManager.vue';
import PayrollCalculator from '@/views/PayrollCalculator.vue';

const routes = [
 
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      
     
      { path: 'employees', name: 'Employees', component: EmployeeList },
      { path: 'employee/:id', name: 'EmployeeProfile', component: EmployeeProfile, props: true },
      { path: 'employee/:id/edit', name: 'EditProfile', component: EditProfile, props: true },
      { path: 'employee/new', name: 'AddEmployee', component: AddEmployee },
      
     
      { path: 'attendance', name: 'Attendance', component: AttendanceTracker },
      { path: 'leave', name: 'Leave', component: TimeOffManager },
      { path: 'payroll', name: 'Payroll', component: PayrollCalculator },
      { path: 'analytics', name: 'Analytics', component: Dashboard } 
    ]
  },
  
  
  { path: '/employees', redirect: '/dashboard/employees' },
  { path: '/employee/:id', redirect: to => `/dashboard/employee/${to.params.id}` },
  { path: '/employee/new', redirect: '/dashboard/employee/new' },
  

  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const publicRoutes = ['/login'];
  const isAuthenticated = localStorage.getItem('loggedIn') === 'true';
  
  if (!publicRoutes.includes(to.path) && !isAuthenticated) {
    next('/login');
  } else if (publicRoutes.includes(to.path) && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;