const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const eventController = require('../controllers/eventController');

// @route   GET /api/events
// @desc    Get all events with optional filtering
// @access  Public
router.get('/', eventController.getEvents);

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', eventController.getEventById);

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin/Editor)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('date', 'Valid date is required').isISO8601().toDate(),
      check('location', 'Location is required').not().isEmpty(),
      check('location.coordinates', 'Coordinates must be an array of [longitude, latitude]').isArray(),
      check('type', 'Type is required').isIn(['military', 'diplomatic', 'protest', 'humanitarian', 'other']),
      check('region', 'Region is required').isIn(['kashmir', 'punjab', 'sindh', 'balochistan', 'gilgit', 'loc', 'other']),
      check('source', 'Source is required').not().isEmpty(),
      check('sourceUrl', 'Source URL is required').isURL(),
    ],
  ],
  eventController.createEvent
);

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Admin/Editor)
router.put(
  '/:id',
  [
    auth,
    [
      check('title', 'Title is required').optional().not().isEmpty(),
      check('description', 'Description is required').optional().not().isEmpty(),
      check('date', 'Valid date is required').optional().isISO8601().toDate(),
      check('location', 'Location is required').optional().not().isEmpty(),
      check('location.coordinates', 'Coordinates must be an array of [longitude, latitude]').optional().isArray(),
      check('type', 'Type must be valid').optional().isIn(['military', 'diplomatic', 'protest', 'humanitarian', 'other']),
      check('region', 'Region must be valid').optional().isIn(['kashmir', 'punjab', 'sindh', 'balochistan', 'gilgit', 'loc', 'other']),
      check('source', 'Source is required').optional().not().isEmpty(),
      check('sourceUrl', 'Source URL is required').optional().isURL(),
    ],
  ],
  eventController.updateEvent
);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Admin only)
router.delete('/:id', auth, eventController.deleteEvent);

// @route   GET /api/events/region/:region
// @desc    Get events by region
// @access  Public
router.get('/region/:region', eventController.getEventsByRegion);

// @route   GET /api/events/type/:type
// @desc    Get events by type
// @access  Public
router.get('/type/:type', eventController.getEventsByType);

// @route   GET /api/events/date/:startDate/:endDate
// @desc    Get events by date range
// @access  Public
router.get('/date/:startDate/:endDate', eventController.getEventsByDateRange);

module.exports = router;
