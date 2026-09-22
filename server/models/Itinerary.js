const mongoose = require('mongoose');

const ACCOMMODATION_TYPES = ['Houseboat', 'Homestay', 'Resort', 'Villa', 'Apartment'];
const STATUS_VALUES = ['Draft', 'Submitted', 'Confirmed', 'Cancelled'];

const itineraryDaySchema = new mongoose.Schema(
  {
    dayNumber: {
      type: Number,
      required: [true, 'Day number is required'],
      min: [1, 'Day number must be at least 1'],
    },
    date: { type: Date },
    title: { type: String, trim: true },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
      },
    ],
    notes: { type: String, trim: true, maxlength: 500 },
  },
  { _id: true }
);

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Itinerary must belong to a user'],
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: 'My Kuttanad Trip',
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function validateEndDate(value) {
          return !this.startDate || value >= this.startDate;
        },
        message: 'End date cannot be before start date',
      },
    },
    numberOfDays: {
      type: Number,
      required: [true, 'Number of days is required'],
      min: [1, 'Trip must be at least 1 day'],
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'There must be at least 1 guest'],
    },
    accommodation: {
      type: String,
      enum: {
        values: ACCOMMODATION_TYPES,
        message: '{VALUE} is not a supported accommodation type',
      },
    },
    houseboat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
      },
    ],
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
    days: {
      type: [itineraryDaySchema],
      default: [],
    },
    specialRequirements: {
      type: String,
      trim: true,
      maxlength: [1000, 'Special requirements cannot exceed 1000 characters'],
    },
    estimatedPrice: {
      type: Number,
      min: [0, 'Estimated price cannot be negative'],
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: STATUS_VALUES,
        message: '{VALUE} is not a valid itinerary status',
      },
      default: 'Draft',
    },
  },
  { timestamps: true }
);

itinerarySchema.pre('validate', function checkDayCount(next) {
  if (this.startDate && this.endDate) {
    const diffMs = this.endDate.getTime() - this.startDate.getTime();
    const inclusiveDays = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
    if (!this.numberOfDays) {
      this.numberOfDays = inclusiveDays;
    }
  }
  next();
});

itinerarySchema.index({ user: 1, status: 1 });

itinerarySchema.statics.ACCOMMODATION_TYPES = ACCOMMODATION_TYPES;
itinerarySchema.statics.STATUS_VALUES = STATUS_VALUES;

module.exports = mongoose.model('Itinerary', itinerarySchema);
