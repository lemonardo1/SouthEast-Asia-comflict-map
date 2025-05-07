const mongoose = require('mongoose');
require('dotenv').config({ path: '../backend/.env' });

// Import Event model
const Event = require('../backend/models/Event');

// New event data
const newEvent = {
  title: 'Air defence units activated along India-Pakistan border',
  description: 'All air defence units have been activated all along the India-Pakistan border to tackle any eventuality, according to Indian Defence Officials.',
  date: new Date('2025-05-07T05:00:00Z'), // 10 hours ago from current time
  location: {
    type: 'Point',
    coordinates: [75.1, 30.14], // 30°14′N 75°1′E as mentioned in the data
  },
  type: 'military',
  region: 'punjab',
  source: 'Live Map',
  sourceUrl: 'https://livemap.com/example',
  verified: true,
  tags: ['air defence', 'military alert', 'border security'],
  casualties: {
    civilian: 0,
    military: 0,
  }
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/india-pakistan-conflict')
  .then(async () => {
    console.log('MongoDB connected');

    try {
      // Find an admin user to set as creator
      const User = require('../backend/models/User');
      const admin = await User.findOne({ role: 'admin' });
      
      if (!admin) {
        console.log('No admin user found. Please run the init.js script first.');
        mongoose.disconnect();
        return;
      }

      // Add creator ID to the event
      newEvent.createdBy = admin._id;

      // Create the new event
      const event = await Event.create(newEvent);
      console.log('New event added:', event.title);

      console.log('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
    } finally {
      mongoose.disconnect();
      console.log('MongoDB disconnected');
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
