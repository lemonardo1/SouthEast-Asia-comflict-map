const axios = require('axios');

// First, let's login to get a token
async function addNewEvent() {
  try {
    console.log('Logging in to get authentication token...');
    const loginResponse = await axios.post('http://localhost:5001/api/users/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });

    const token = loginResponse.data.token;
    console.log('Successfully logged in and got token');

    // Now add the new event
    console.log('Adding new event...');
    const newEvent = {
      title: 'Air defence units activated along India-Pakistan border',
      description: 'All air defence units have been activated all along the India-Pakistan border to tackle any eventuality, according to Indian Defence Officials.',
      date: new Date('2025-05-07T05:00:00Z').toISOString(),
      location: {
        type: 'Point',
        coordinates: [75.1, 30.14] // 30°14′N 75°1′E as mentioned in the data
      },
      type: 'military',
      region: 'punjab',
      source: 'Live Map',
      sourceUrl: 'https://livemap.com/example',
      verified: true,
      tags: ['air defence', 'military alert', 'border security'],
      casualties: {
        civilian: 0,
        military: 0
      }
    };

    const eventResponse = await axios.post('http://localhost:5001/api/events', newEvent, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    });

    console.log('Event added successfully:', eventResponse.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

addNewEvent();
