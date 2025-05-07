const { validationResult } = require('express-validator');
const Event = require('../models/Event');

// Get all events with optional filtering
exports.getEvents = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      type,
      region,
      search,
      limit = 100,
      page = 1,
    } = req.query;

    // Build query
    const query = {};

    // Date filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Type filter
    if (type) {
      // Handle multiple types as an array
      if (Array.isArray(type)) {
        query.type = { $in: type };
      } else {
        query.type = type;
      }
    }

    // Region filter
    if (region) {
      // Handle multiple regions as an array
      if (Array.isArray(region)) {
        query.region = { $in: region };
      } else {
        query.region = region;
      }
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { source: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const events = await Event.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Event.countDocuments(query);

    res.json({
      events,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select('-__v');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user has permission (admin or editor)
    if (req.user.role !== 'admin' && req.user.role !== 'editor') {
      return res.status(403).json({ message: 'Not authorized to create events' });
    }

    // Prepare event data
    const {
      title,
      description,
      date,
      location,
      type,
      region,
      source,
      sourceUrl,
      imageUrl,
      tags,
      casualties,
      verified,
    } = req.body;

    // Create new event
    const newEvent = new Event({
      title,
      description,
      date,
      location: {
        type: 'Point',
        coordinates: location.coordinates,
      },
      type,
      region,
      source,
      sourceUrl,
      imageUrl,
      tags,
      casualties,
      verified: verified || false,
      createdBy: req.user.id,
    });

    // Save event
    const event = await newEvent.save();

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user has permission (admin or editor)
    if (req.user.role !== 'admin' && req.user.role !== 'editor') {
      return res.status(403).json({ message: 'Not authorized to update events' });
    }

    // Find event
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Prepare update data
    const updateData = {};
    const fields = [
      'title',
      'description',
      'date',
      'type',
      'region',
      'source',
      'sourceUrl',
      'imageUrl',
      'tags',
      'casualties',
      'verified',
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Handle location separately
    if (req.body.location) {
      updateData.location = {
        type: 'Point',
        coordinates: req.body.location.coordinates,
      };
    }

    // Update event
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    // Check if user has permission (admin only)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete events' });
    }

    // Find event
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete event
    await event.remove();

    res.json({ message: 'Event removed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get events by region
exports.getEventsByRegion = async (req, res) => {
  try {
    const events = await Event.find({ region: req.params.region })
      .sort({ date: -1 })
      .select('-__v');

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get events by type
exports.getEventsByType = async (req, res) => {
  try {
    const events = await Event.find({ type: req.params.type })
      .sort({ date: -1 })
      .select('-__v');

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get events by date range
exports.getEventsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    
    const events = await Event.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .sort({ date: -1 })
      .select('-__v');

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
