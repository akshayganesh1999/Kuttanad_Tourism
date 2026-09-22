const mongoose = require('mongoose');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

const PROPERTY_TYPES = ['Houseboat', 'Houseboat Room', 'Homestay', 'Resort', 'Villa', 'Apartment'];

const locationSchema = new mongoose.Schema(
  {
    address: { type: String, trim: true },
    area: { type: String, trim: true, required: [true, 'Area is required'] },
    city: { type: String, trim: true, required: [true, 'City is required'] },
    district: { type: String, trim: true, default: 'Alappuzha' },
    state: { type: String, trim: true, default: 'Kerala' },
    country: { type: String, trim: true, default: 'India' },
    latitude: { type: Number, min: -90, max: 90 },
    longitude: { type: Number, min: -180, max: 180 },
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    propertyType: {
      type: String,
      enum: {
        values: PROPERTY_TYPES,
        message: '{VALUE} is not a supported property type',
      },
      required: [true, 'Property type is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    shortDescription: {
      type: String,
      maxlength: [220, 'Short description cannot exceed 220 characters'],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 20,
        message: 'A property cannot have more than 20 images',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail image is required'],
    },
    location: {
      type: locationSchema,
      required: [true, 'Location is required'],
    },
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        type: [Number],
        default: undefined,
      },
    },
    pricePerNight: {
      type: Number,
      min: [0, 'Price per night cannot be negative'],
    },
    pricePerPerson: {
      type: Number,
      min: [0, 'Price per person cannot be negative'],
    },
    guestCapacity: {
      type: Number,
      required: [true, 'Guest capacity is required'],
      min: [1, 'Guest capacity must be at least 1'],
    },
    bedrooms: { type: Number, min: 0, default: 1 },
    bathrooms: { type: Number, min: 0, default: 1 },
    amenities: { type: [String], default: [] },
    facilities: { type: [String], default: [] },
    roomTypes: { type: [String], default: [] },
    houseboatType: {
      type: String,
      trim: true,
    },
    checkIn: { type: String, default: '12:00 PM' },
    checkOut: { type: String, default: '09:00 AM' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    featured: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

propertySchema.pre('validate', function ensurePricing(next) {
  if (this.pricePerNight == null && this.pricePerPerson == null) {
    return next(new Error('Either pricePerNight or pricePerPerson must be provided'));
  }
  next();
});

propertySchema.pre('validate', async function setSlug(next) {
  await generateUniqueSlug(this, this.constructor, 'title');
  next();
});

propertySchema.index({
  title: 'text',
  shortDescription: 'text',
  description: 'text',
  'location.area': 'text',
  'location.city': 'text',
});
propertySchema.index({ propertyType: 1 });
propertySchema.index({ 'location.city': 1 });
propertySchema.index({ pricePerNight: 1 });
propertySchema.index({ featured: 1 });
propertySchema.index({ coordinates: '2dsphere' });

propertySchema.statics.TYPES = PROPERTY_TYPES;

module.exports = mongoose.model('Property', propertySchema);
