const mongoose = require('mongoose');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

const CATEGORIES = [
  'Water Activity',
  'Cultural',
  'Adventure',
  'Food & Cuisine',
  'Nature',
  'Leisure',
  'Photography',
];

const DIFFICULTY_LEVELS = ['Easy', 'Moderate', 'Challenging'];

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Activity name is required'],
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
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    category: {
      type: String,
      enum: {
        values: CATEGORIES,
        message: '{VALUE} is not a supported activity category',
      },
      required: [true, 'Category is required'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    price: {
      type: Number,
      min: [0, 'Price cannot be negative'],
      default: 0,
    },
    location: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: {
        values: DIFFICULTY_LEVELS,
        message: '{VALUE} is not a supported difficulty level',
      },
      default: 'Easy',
    },
    bestTime: {
      type: String,
      default: 'Morning',
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

activitySchema.pre('validate', async function setSlug(next) {
  await generateUniqueSlug(this, this.constructor, 'name');
  next();
});

activitySchema.index({ name: 'text', description: 'text' });
activitySchema.index({ category: 1 });
activitySchema.index({ featured: 1 });

activitySchema.statics.CATEGORIES = CATEGORIES;
activitySchema.statics.DIFFICULTY_LEVELS = DIFFICULTY_LEVELS;

module.exports = mongoose.model('Activity', activitySchema);
