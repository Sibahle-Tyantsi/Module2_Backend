<template>
  <div class="login-container">
    <div class="login-left">
      <h1>Welcome to ModernTech HR</h1>
      <p>Manage employees, attendance, payroll, and more.</p>
      <img src="@/assets/login.png" alt="HR System Illustration" />
    </div>

    
    <div class="login-right">
      <div class="logo-section">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </div>

      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" class="btn-login">Login</button>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");


const users = [
  { username: "admin", password: "admin123", role: "Admin" },
  { username: "user", password: "user123", role: "User" }
];

function handleLogin() {
  const user = users.find(
    (u) => u.username === username.value && u.password === password.value
  );

  if (user) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", user.role);

    router.push("/dashboard");
  } else {
    alert("Invalid username or password");
  }
}
</script>

<style scoped>

.logo-section {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.logo {
  width: 120px;
}


.login-container {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}


.login-left {
  flex: 1;
  background-color: #16a34a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  text-align: center;
}

.login-left h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.login-left p {
  font-size: 18px;
  margin-bottom: 30px;
}

.login-left img {
  max-width: 80%;
  height: auto;
  border-radius: 10px;
}

.login-right {
  flex: 1;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.05);
}

.login-right h2 {
  font-size: 28px;
  margin-bottom: 30px;
  color: #1e293b;
  text-align: center;
}

/* FORM STYLES */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #475569;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  transition: 0.2s;
}

.form-group input:focus {
  border-color: #16a34a;
  outline: none;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.25);
}


.btn-login {
  width: 100%;
  padding: 12px;
  background-color: #16a34a;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-login:hover {
  background-color: #15803d;
}
</style>
