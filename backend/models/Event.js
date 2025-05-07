const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        index: '2dsphere',
      },
    },
    type: {
      type: String,
      required: true,
      enum: ['military', 'diplomatic', 'protest', 'humanitarian', 'other'],
      index: true,
    },
    region: {
      type: String,
      required: true,
      enum: ['kashmir', 'punjab', 'sindh', 'balochistan', 'gilgit', 'loc', 'other'],
      index: true,
    },
    source: {
      type: String,
      required: true,
    },
    sourceUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      index: true,
    },
    casualties: {
      civilian: {
        type: Number,
        default: 0,
      },
      military: {
        type: Number,
        default: 0,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
EventSchema.index({ date: -1 });
EventSchema.index({ type: 1 });
EventSchema.index({ region: 1 });
EventSchema.index({ tags: 1 });

module.exports = mongoose.model('Event', EventSchema);
