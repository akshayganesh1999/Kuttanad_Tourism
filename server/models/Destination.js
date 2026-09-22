const mongoose = require('mongoose');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

const CATEGORIES = ['Beach', 'Backwaters', 'Village', 'Island', 'Culture', 'Nature'];

const destinationLocationSchema = new mongoose.Schema(
  {
    area: { type: String, trim: true, required: [true, 'Area is required'] },
    district: { type: String, trim: true, default: 'Alappuzha' },
    state: { type: String, trim: true, default: 'Kerala' },
    country: { type: String, trim: true, default: 'India' },
  },
  { _id: false }
);

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
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
    },
    location: {
      type: destinationLocationSchema,
      required: [true, 'Location is required'],
    },
    thingsToDo: {
      type: [String],
      default: [],
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
    recommendedDuration: {
      type: String,
      default: 'Half day',
    },
    bestTimeToVisit: {
      type: String,
      default: 'October to March',
    },
    category: {
      type: String,
      enum: {
        values: CATEGORIES,
        message: '{VALUE} is not a supported destination category',
      },
      required: [true, 'Category is required'],
    },
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        type: [Number],
        default: undefined,
      },
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

destinationSchema.pre('validate', async function setSlug(next) {
  await generateUniqueSlug(this, this.constructor, 'name');
  next();
});

destinationSchema.index({
  name: 'text',
  shortDescription: 'text',
  description: 'text',
});
destinationSchema.index({ category: 1 });
destinationSchema.index({ featured: 1 });
destinationSchema.index({ coordinates: '2dsphere' });

destinationSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('Destination', destinationSchema);
