<template>
  <div class="form-container">
    <h2 class="dark-mode-text" style="text-align: center;">Add New Entry</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName" class="dark-mode-text">First name:</label>
          <input type="text" id="firstName" v-model="firstName" required>
        </div>
        <div class="form-group">
          <label for="familyName" class="dark-mode-text">Family name:</label>
          <input type="text" id="familyName" v-model="familyName" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="fatherName" class="dark-mode-text">Father's name:</label>
          <input type="text" id="fatherName" v-model="fatherName" required>
        </div>
        <div class="form-group">
          <label for="motherName" class="dark-mode-text">Mother's name:</label>
          <input type="text" id="motherName" v-model="motherName" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="dateOfBirth" class="dark-mode-text">Date of birth:</label>
          <input type="date" id="dateOfBirth" v-model="dateOfBirth" required>
        </div>
        <div class="form-group">
          <label for="placeOfBirth" class="dark-mode-text">Place of birth:</label>
          <input type="text" id="placeOfBirth" v-model="placeOfBirth" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="dateOfBaptism" class="dark-mode-text">Date of baptism:</label>
          <input type="date" id="dateOfBaptism" v-model="dateOfBaptism" required>
        </div>
        <div class="form-group">
          <label for="baptizingPriest" class="dark-mode-text">Baptizing Priest:</label>
          <input type="text" id="baptizingPriest" v-model="baptizingPriest" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="godfather" class="dark-mode-text">Godfather:</label>
          <input type="text" id="godfather" v-model="godfather" required>
        </div>
        <div class="form-group">
          <label for="godmother" class="dark-mode-text">Godmother:</label>
          <input type="text" id="godmother" v-model="godmother" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="registrationNumber" class="dark-mode-text">Registration number:</label>
          <input type="text" id="registrationNumber" v-model="registrationNumber" required>
        </div>
        <div class="form-group">
          <label for="registrationBook" class="dark-mode-text">Registration book:</label>
          <input type="text" id="registrationBook" v-model="registrationBook" required>
        </div>
      </div>

      <button type="submit">Add Entry</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      familyName: '',
      fatherName: '',
      motherName: '',
      dateOfBirth: '',
      placeOfBirth: '',
      dateOfBaptism: '',
      baptizingPriest: '',
      godfather: '',
      godmother: '',
      registrationNumber: '',
      registrationBook: '',
    };
  },
  methods: {
    handleSubmit() {
      const newEntry = {
        firstName: this.firstName,
        familyName: this.familyName,
        fatherName: this.fatherName,
        motherName: this.motherName,
        dateOfBirth: this.dateOfBirth,
        placeOfBirth: this.placeOfBirth,
        dateOfBaptism: this.dateOfBaptism,
        baptizingPriest: this.baptizingPriest,
        godfather: this.godfather,
        godmother: this.godmother,
        registrationNumber: this.registrationNumber,
        registrationBook: this.registrationBook
      };
      this.$emit('add-entry', newEntry);
      // Clear form fields
      Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  /* Adjust as needed */
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  /* Allow wrapping for smaller screens */
  margin-bottom: 10px;
  /* Reduced spacing between rows */
}

.form-group {
  flex: 1;
  /* Each group takes equal width */
  margin-right: 20px;
  /* Space between groups in a row */
  margin-bottom: 0;
  /* Remove bottom margin */
}

.form-group:last-child {
  margin-right: 0;
  /* Remove margin from last group in a row */
}

label {
  display: block;
  margin-bottom: 2px;
  /* Reduced spacing between label and input */
  font-weight: bold;
}

input[type="text"],
input[type="date"],
select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: #5cb85c;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #4cae4c;
}

.dark-mode-text {
  color: #ced6e0;
}
</style>