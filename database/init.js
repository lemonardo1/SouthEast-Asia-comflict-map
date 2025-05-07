const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../backend/.env' });

// Import models
const Event = require('../backend/models/Event');
const User = require('../backend/models/User');

// Sample events data
const eventsData = [
  {
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
    },
  },
  {
    title: 'Military clash near Line of Control',
    description: 'Indian and Pakistani forces exchanged fire across the Line of Control in Kashmir, resulting in casualties on both sides.',
    date: new Date('2025-04-15T08:30:00Z'),
    location: {
      type: 'Point',
      coordinates: [74.1, 34.5], // [longitude, latitude]
    },
    type: 'military',
    region: 'loc',
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com/example',
    imageUrl: 'https://example.com/images/clash1.jpg',
    verified: true,
    tags: ['artillery', 'loc', 'kashmir'],
    casualties: {
      civilian: 2,
      military: 5,
    },
  },
  {
    title: 'Diplomatic talks in Islamabad',
    description: 'Representatives from India and Pakistan met in Islamabad to discuss border tensions and potential de-escalation measures.',
    date: new Date('2025-04-20T10:00:00Z'),
    location: {
      type: 'Point',
      coordinates: [73.0941, 33.7294], // Islamabad
    },
    type: 'diplomatic',
    region: 'other',
    source: 'Al Jazeera',
    sourceUrl: 'https://www.aljazeera.com/example',
    verified: true,
    tags: ['diplomacy', 'peace talks', 'bilateral'],
  },
  {
    title: 'Protest in Srinagar against military presence',
    description: 'Hundreds of civilians gathered in Srinagar to protest increased military presence in the region.',
    date: new Date('2025-04-22T14:00:00Z'),
    location: {
      type: 'Point',
      coordinates: [74.8, 34.1], // Srinagar
    },
    type: 'protest',
    region: 'kashmir',
    source: 'BBC',
    sourceUrl: 'https://www.bbc.com/example',
    imageUrl: 'https://example.com/images/protest1.jpg',
    verified: true,
    tags: ['protest', 'civilian', 'kashmir'],
    casualties: {
      civilian: 0,
      military: 0,
    },
  },
  {
    title: 'Humanitarian aid delivered to affected areas',
    description: 'Red Cross delivered humanitarian aid to civilians affected by recent border clashes in Kashmir.',
    date: new Date('2025-04-25T09:15:00Z'),
    location: {
      type: 'Point',
      coordinates: [74.4, 34.3], // Kashmir region
    },
    type: 'humanitarian',
    region: 'kashmir',
    source: 'Red Cross',
    sourceUrl: 'https://www.redcross.org/example',
    imageUrl: 'https://example.com/images/aid1.jpg',
    verified: true,
    tags: ['humanitarian', 'aid', 'red cross'],
  },
  {
    title: 'Artillery exchange in Punjab sector',
    description: 'Heavy artillery exchange reported along the Punjab border, with both sides claiming provocation by the other.',
    date: new Date('2025-05-01T23:30:00Z'),
    location: {
      type: 'Point',
      coordinates: [74.5, 31.6], // Punjab border region
    },
    type: 'military',
    region: 'punjab',
    source: 'Associated Press',
    sourceUrl: 'https://www.ap.org/example',
    verified: true,
    tags: ['artillery', 'punjab', 'border'],
    casualties: {
      civilian: 0,
      military: 3,
    },
  },
  {
    title: 'UN Security Council meeting on Kashmir',
    description: 'UN Security Council held an emergency meeting to discuss escalating tensions between India and Pakistan over Kashmir.',
    date: new Date('2025-05-03T18:00:00Z'),
    location: {
      type: 'Point',
      coordinates: [-73.9684, 40.7498], // UN Headquarters, New York
    },
    type: 'diplomatic',
    region: 'other',
    source: 'United Nations',
    sourceUrl: 'https://www.un.org/example',
    verified: true,
    tags: ['un', 'security council', 'international'],
  },
  {
    title: 'Civilian displacement in border villages',
    description: 'Thousands of civilians have been displaced from border villages following recent military clashes.',
    date: new Date('2025-05-05T12:45:00Z'),
    location: {
      type: 'Point',
      coordinates: [74.3, 32.7], // Border region
    },
    type: 'humanitarian',
    region: 'loc',
    source: 'UNHCR',
    sourceUrl: 'https://www.unhcr.org/example',
    imageUrl: 'https://example.com/images/displacement1.jpg',
    verified: true,
    tags: ['displacement', 'civilians', 'border'],
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin',
  organization: 'India-Pakistan Conflict Map',
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/india-pakistan-conflict', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected');

    try {
      // Clear existing data
      await Event.deleteMany({});
      await User.deleteMany({});

      // Create admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminUser.password, salt);
      
      const user = await User.create({
        ...adminUser,
        password: hashedPassword,
      });

      console.log('Admin user created:', user.email);

      // Insert events with admin user as creator
      const eventsWithCreator = eventsData.map(event => ({
        ...event,
        createdBy: user._id,
      }));

      await Event.insertMany(eventsWithCreator);
      console.log(`${eventsData.length} events inserted`);

      console.log('Database initialization completed successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    } finally {
      mongoose.disconnect();
      console.log('MongoDB disconnected');
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
