<template>
  <div id="app" class="dark-mode">
    <h1 class="dark-mode-text" style="text-align: center;">Church Parochial Register</h1>
    <RegisterForm @add-entry="addEntry" />
    <RegisterList :entries="registerEntries" @delete-entry="deleteEntry" />
  </div>
</template>

<script>
import RegisterForm from './components/RegisterForm.vue';
import RegisterList from './components/RegisterList.vue';

export default {
  components: {
    RegisterForm,
    RegisterList,
  },
  data() {
    return {
      registerEntries: [],
    };
  },
  created() {
    const savedEntries = localStorage.getItem('registerEntries');
    if (savedEntries) {
      this.registerEntries = JSON.parse(savedEntries);
    }
  },
  methods: {
    addEntry(newEntry) {
      newEntry.dateOfBirth = this.formatDate(newEntry.dateOfBirth);
      newEntry.dateOfBaptism = this.formatDate(newEntry.dateOfBaptism);
      this.registerEntries.push(newEntry);
      localStorage.setItem('registerEntries', JSON.stringify(this.registerEntries));
    },
    deleteEntry(index) {
      this.registerEntries.splice(index, 1);
      localStorage.setItem('registerEntries', JSON.stringify(this.registerEntries));
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style>
/* Global styles */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* Default dark mode background for entire page */
body {
  background-color: #2f3640;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ced6e0;
  /* Light text color in dark mode */
  margin-top: 60px;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.list-container,
.form-container,
.confirmation-dialog {
  background-color: #353b48;
}

.delete-button {
  color: #dc3545;
}

.print-button {
  color: #28a745;
}


.dialog-content {
  background-color: #353b48;
  color: #ced6e0;
  border: 1px solid #666;
}

.delete-confirm-button {
  background-color: #dc3545;
}

.cancel-delete-button {
  background-color: #28a745;
}

.entry-table th,
.entry-table td {
  border-color: #666;
}

input[type="text"],
input[type="date"],
select {
  background-color: #444;
  color: #ced6e0;
  border-color: #666;
}

.entry-table th {
  color: #ced6e0;
}

.entry-table td {
  color: #ced6e0;
}

.filter-container input {
  background-color: #444;
  color: #ced6e0;
  border: 1px solid #666;
}

.dark-mode-text {
  color: #ced6e0;
}
</style>