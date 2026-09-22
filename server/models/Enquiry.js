const mongoose = require('mongoose');

const STATUS_VALUES = ['Pending', 'Contacted', 'Confirmed', 'Cancelled', 'Completed'];
const SOURCE_VALUES = ['Website', 'WhatsApp', 'Admin'];

const enquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[+]?[\d\s-]{7,15}$/, 'Please provide a valid phone number'],
    },
    travelStartDate: {
      type: Date,
      required: [true, 'Travel start date is required'],
    },
    travelEndDate: {
      type: Date,
      required: [true, 'Travel end date is required'],
      validate: {
        validator: function validateEndDate(value) {
          return !this.travelStartDate || value >= this.travelStartDate;
        },
        message: 'Travel end date cannot be before the start date',
      },
    },
    numberOfDays: {
      type: Number,
      required: [true, 'Number of days is required'],
      min: [1, 'Trip must be at least 1 day'],
    },
    numberOfGuests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'There must be at least 1 guest'],
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
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
    itinerary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Itinerary',
    },
    foodPreferences: {
      type: String,
      trim: true, // e.g. "Vegetarian", "Non-vegetarian", "No seafood"
    },
    specialRequirements: {
      type: String,
      trim: true,
      maxlength: [1000, 'Special requirements cannot exceed 1000 characters'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [4000, 'Message cannot exceed 4000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: STATUS_VALUES,
        message: '{VALUE} is not a valid enquiry status',
      },
      default: 'Pending',
    },
    source: {
      type: String,
      enum: {
        values: SOURCE_VALUES,
        message: '{VALUE} is not a valid enquiry source',
      },
      default: 'Website',
    },
  },
  { timestamps: true }
);

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ phone: 1 });

enquirySchema.statics.STATUS_VALUES = STATUS_VALUES;
enquirySchema.statics.SOURCE_VALUES = SOURCE_VALUES;

module.exports = mongoose.model('Enquiry', enquirySchema);
