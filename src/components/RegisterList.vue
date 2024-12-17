<template>
  <div class="list-container">
    <h2 class="dark-mode-text">Register Entries</h2>

    <div class="filter-container">
      <input type="text" v-model="filterText" placeholder="Filter entries..." class="dark-mode-input filter-input">
    </div>

    <table class="entry-table">
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index" class="dark-mode-text table-header">
            {{ header }}
          </th>
          <th class="dark-mode-text table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in filteredEntries" :key="index">
          <td class="dark-mode-text">{{ entry.firstName }}</td>
          <td class="dark-mode-text">{{ entry.familyName }}</td>
          <td class="dark-mode-text">{{ entry.fatherName }}</td>
          <td class="dark-mode-text">{{ entry.motherName }}</td>
          <td class="dark-mode-text">{{ entry.dateOfBirth }}</td>
          <td class="dark-mode-text">{{ entry.placeOfBirth }}</td>
          <td class="dark-mode-text">{{ entry.dateOfBaptism }}</td>
          <td class="dark-mode-text">{{ entry.baptizingPriest }}</td>
          <td class="dark-mode-text">{{ entry.godfather }}</td>
          <td class="dark-mode-text">{{ entry.godmother }}</td>
          <td class="dark-mode-text">{{ entry.registrationNumber }}</td>
          <td class="dark-mode-text">{{ entry.registrationBook }}</td>
          <td>
            <button @click="confirmDelete(index)" class="delete-button">
              <i class="fas fa-times"></i>
            </button>
            <button @click="printEntry(index)" class="print-button">
              <i class="fas fa-print"></i> Print
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showConfirmation" class="confirmation-dialog">
      <div class="dialog-content">
        <p class="dark-mode-text">Are you sure you want to delete this entry?</p>
        <button @click="deleteEntry" class="delete-confirm-button">Delete</button>
        <button @click="cancelDelete" class="cancel-delete-button">Don't Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filterText: '',
      showConfirmation: false,
      deleteIndex: null,
      tableHeaders: [
        'First name', 'Family name', 'Father\'s name', 'Mother\'s name',
        'Date of birth', 'Place of birth', 'Date of baptism', 'Baptizing Priest',
        'Godfather', 'Godmother', 'Registration number', 'Registration book'
      ]
    };
  },
  computed: {
    filteredEntries() {
      if (!this.filterText) {
        return this.entries; // No filter applied
      }

      // Split the filter text into an array of words
      const filterWords = this.filterText.toLowerCase().split(/\s+/); // Split by any whitespace

      return this.entries.filter(entry => {
        // Check if all filter words are present in at least one of the entry fields
        return filterWords.every(word => {
          return (
            (entry.firstName?.toLowerCase() ?? '').includes(word) ||
            (entry.familyName?.toLowerCase() ?? '').includes(word) ||
            (entry.fatherName?.toLowerCase() ?? '').includes(word) ||
            (entry.motherName?.toLowerCase() ?? '').includes(word) ||
            (entry.placeOfBirth?.toLowerCase() ?? '').includes(word) ||
            (entry.baptizingPriest?.toLowerCase() ?? '').includes(word) ||
            (entry.godfather?.toLowerCase() ?? '').includes(word) ||
            (entry.godmother?.toLowerCase() ?? '').includes(word) ||
            (entry.registrationNumber?.toLowerCase() ?? '').includes(word) ||
            (entry.registrationBook?.toLowerCase() ?? '').includes(word)
          );
        });
      });
    },
  },
  methods: {
    printEntry(index) {
      const entry = this.filteredEntries[index];

      // Create a temporary iframe element
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none'; // Hide the iframe
      document.body.appendChild(iframe);

      // Write the content to the iframe's document
      iframe.contentDocument.write(`
        <html>
        <head>
          <title></title> <style>
            body { font-family: sans-serif; background-color: #2f3640; color: #ced6e0; }
            h2 { text-align: center; color: #ced6e0; }
            table { width: 100%; border-collapse: collapse; border-color: #666; }
            th, td { border: 1px solid #666; padding: 8px; }
            th { text-align: left; background-color: #353b48; color: #ced6e0; }
            td { color: #ced6e0; }

            /* Print-specific styles */
            @media print {
              body {
                background-color: white; /* White background for printing */
                color: black; /* Black text for printing */
              }
              h2 {
                color: black; /* Black text for printing */
                display: none;
              }
              table {
                border-color: black; /* Black table borders */
              }
              th {
                background-color: #f2f2f2; /* Light gray header background */
                color: black; /* Black text for header */
              }
              td {
                color: black; /* Black text for table cells */
              }
            }
          </style>
        </head>
        <body>
          <h2>Entry Details</h2> <table>
            <tr>
              <th>First Name</th>
              <td>${entry.firstName}</td>
            </tr>
            <tr>
              <th>Family Name</th>
              <td>${entry.familyName}</td>
            </tr>
            <tr>
              <th>Father's Name</th>
              <td>${entry.fatherName}</td>
            </tr>
            <tr>
              <th>Mother's Name</th>
              <td>${entry.motherName}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>${entry.dateOfBirth}</td>
            </tr>
            <tr>
              <th>Place of Birth</th>
              <td>${entry.placeOfBirth}</td>
            </tr>
            <tr>
              <th>Date of Baptism</th>
              <td>${entry.dateOfBaptism}</td>
            </tr>
            <tr>
              <th>Baptizing Priest</th>
              <td>${entry.baptizingPriest}</td>
            </tr>
            <tr>
              <th>Godfather</th>
              <td>${entry.godfather}</td>
            </tr>
            <tr>
              <th>Godmother</th>
              <td>${entry.godmother}</td>
            </tr>
            <tr>
              <th>Registration Number</th>
              <td>${entry.registrationNumber}</td>
            </tr>
            <tr>
              <th>Registration Book</th>
              <td>${entry.registrationBook}</td>
            </tr>
          </table>
        </body>
        </html>
      `);

      iframe.contentDocument.close();

      // Wait for the iframe content to load before printing
      iframe.onload = () => {
        // Use a try-catch block to handle potential errors
        try {
          // Access the iframe's window and trigger the print dialog
          const iframeWindow = iframe.contentWindow;
          iframeWindow.focus();
          iframeWindow.print();
        } catch (e) {
          console.error("Error printing from iframe:", e);
        } finally {
          // Clean up the iframe after printing (or on error)
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000); // Adjust delay as needed
        }
      };
    },
    confirmDelete(index) {
      this.showConfirmation = true;
      this.deleteIndex = index;
    },
    deleteEntry() {
      this.$emit('delete-entry', this.deleteIndex);
      this.showConfirmation = false;
      this.deleteIndex = null;
    },
    cancelDelete() {
      this.showConfirmation = false;
      this.deleteIndex = null;
    },
  }
};
</script>

<style scoped>
/* Same table styles as before */
.entry-table {
  width: 100%;
  border-collapse: collapse;
}

.entry-table th,
.entry-table td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

.table-header {
  background-color: #353b48;
  color: #ced6e0;
}

.filter-container {
  margin-bottom: 20px;
  
}

.delete-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: red;
  font-size: 1.2em;
  /* Adjust icon size as needed */
  margin-right: 10px;
}

.confirmation-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dialog-content {
  text-align: center;
}

.print-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: blue;
  font-size: 1em;
}

.delete-confirm-button,
.cancel-delete-button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.delete-confirm-button {
  background-color: #dc3545;
  color: white;
}

.cancel-delete-button {
  background-color: #28a745;
  color: white;
}

.dark-mode-text {
  color: #ced6e0;
}

.dark-mode-input {
  background-color: #444;
  color: #ced6e0;
  border-color: #666;
}

.list-container {
  border: 2px solid white;
  border-radius: 5px;
  padding: 10px;
}
.filter-input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>