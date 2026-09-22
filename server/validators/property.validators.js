const { body } = require('express-validator');
const Property = require('../models/Property');

const createPropertyValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('propertyType')
    .isIn(Property.TYPES)
    .withMessage(`Property type must be one of: ${Property.TYPES.join(', ')}`),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('thumbnail').trim().notEmpty().withMessage('Thumbnail image is required'),
  body('location.area').trim().notEmpty().withMessage('Location area is required'),
  body('location.city').trim().notEmpty().withMessage('Location city is required'),
  body('guestCapacity').isInt({ min: 1 }).withMessage('Guest capacity must be at least 1'),
  body('pricePerNight').optional().isFloat({ min: 0 }).withMessage('Price per night must be a positive number'),
  body('pricePerPerson').optional().isFloat({ min: 0 }).withMessage('Price per person must be a positive number'),
  body('images').optional().isArray().withMessage('Images must be an array of URLs'),
  body('amenities').optional().isArray(),
  body('facilities').optional().isArray(),
];

const updatePropertyValidator = [
  body('propertyType')
    .optional()
    .isIn(Property.TYPES)
    .withMessage(`Property type must be one of: ${Property.TYPES.join(', ')}`),
  body('guestCapacity').optional().isInt({ min: 1 }).withMessage('Guest capacity must be at least 1'),
  body('pricePerNight').optional().isFloat({ min: 0 }),
  body('pricePerPerson').optional().isFloat({ min: 0 }),
  body('images').optional().isArray(),
  body('amenities').optional().isArray(),
  body('facilities').optional().isArray(),
];

module.exports = { createPropertyValidator, updatePropertyValidator };
