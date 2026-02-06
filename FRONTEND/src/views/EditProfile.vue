
<template>
  <div class="edit-container">
    <h2>Edit Employee Profile</h2>

    <form @submit.prevent="saveEmployee" class="edit-form">
      <div class="form-group">
        <label>Full Name</label>
        <input v-model="formData.name" type="text" required />
      </div>

      <div class="form-group">
        <label>Position</label>
        <input v-model="formData.position" type="text" required />
      </div>

      <div class="form-group">
        <label>Department</label>
        <select v-model="formData.department" required>
          <option value="">Select Department</option>
          <option value="Development">Development</option>
          <option value="HR">HR</option>
          <option value="QA">QA</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Support">Support</option>
        </select>
      </div>

      <div class="form-group">
        <label>Monthly Salary (R)</label>
        <input v-model.number="formData.salary" type="number" min="0" required />
      </div>

      <div class="form-group">
        <label>Contact Email</label>
        <input v-model="formData.contact" type="email" required />
      </div>

      <div class="form-group">
        <label>Employment History</label>
        <textarea v-model="formData.employmentHistory" rows="3"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-save">Save Changes</button>
        <button type="button" @click="$router.back()" class="btn-cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { api } from "@/services/api";

export default {
  name: "EditProfile",
  data() {
    return {
      formData: {}
    };
  },
  async created() {
    await this.loadEmployee();
  },
  methods: {
    async loadEmployee() {
      try {
        const id = this.$route.params.id;
        this.formData = await api.getEmployeeById(id);
      } catch (error) {
        alert("Employee not found");
        this.$router.push("/employees");
      }
    },

    async saveEmployee() {
      try {
        const id = this.formData.id;
        await api.updateEmployee(id, this.formData);
        alert("Employee updated successfully!");
        this.$router.push(`/employee/${id}`);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

</script>

<style scoped>
.edit-container {
  max-width: 700px;
  margin: 30px auto;
  padding: 25px;
  background: #f8f5ff;
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.edit-container h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
}

.edit-form {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.btn-save,
.btn-cancel {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
.btn-save {
  background-color: #2ecc71;
  color: white;
}
.btn-save:hover {
  background-color: #27ae60;
}
.btn-cancel {
  background-color: #e74c3c;
  color: white;
}
.btn-cancel:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  .btn-save,
  .btn-cancel {
    width: 100%;
  }
}
</style>