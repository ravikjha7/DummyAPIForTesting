const axios = require('axios');

const apiUrl = 'http://localhost:8080/employee';

// Generate an array of 1000 entries
const entries = [];
for (let i = 0; i < 1000; i++) {
  entries.push({ name: 'Sapana Khedkar', city: 'Mumbai' });
}

// Define a function to insert 1000 entries at a time
async function insertEntries(entries) {
  try {
    // Split the entries into groups of 100

    // Insert each group of 1000 entries
    // var i = 0;
    for (const group of  entries) {
      await axios.post(apiUrl, group, {
        timeout: 10000 // 10 seconds
      });
      console.log(`Inserted entries`);
    }

    console.log('Insertion complete');
  } catch (error) {
    console.error(error);
  }
}

// Call the insertEntries function
insertEntries(entries);