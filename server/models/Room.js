const mongoose = require('mongoose');

const BED_TYPES = ['Single', 'Double', 'Twin', 'Queen', 'King', 'Bunk'];

const roomSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Room must belong to a property'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true,
      maxlength: [100, 'Room name cannot exceed 100 characters'],
    },
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, 'Room price is required'],
      min: [0, 'Price cannot be negative'],
    },
    capacity: {
      type: Number,
      required: [true, 'Guest capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    bedType: {
      type: String,
      enum: {
        values: BED_TYPES,
        message: '{VALUE} is not a supported bed type',
      },
      default: 'Double',
    },
    amenities: { type: [String], default: [] },
    available: { type: Boolean, default: true },
    totalRooms: {
      type: Number,
      min: [1, 'There must be at least 1 room of this type'],
      default: 1,
    },
  },
  { timestamps: true }
);

roomSchema.index({ property: 1, roomType: 1 });

roomSchema.statics.BED_TYPES = BED_TYPES;

module.exports = mongoose.model('Room', roomSchema);
