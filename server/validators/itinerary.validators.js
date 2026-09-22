const { body } = require('express-validator');
const Itinerary = require('../models/Itinerary');

const createItineraryValidator = [
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
        throw new Error('End date cannot be before start date');
      }
      return true;
    }),
  body('guests').isInt({ min: 1 }).withMessage('Guests must be at least 1'),
  body('accommodation')
    .optional()
    .isIn(Itinerary.ACCOMMODATION_TYPES)
    .withMessage(`Accommodation must be one of: ${Itinerary.ACCOMMODATION_TYPES.join(', ')}`),
  body('destinations').optional().isArray(),
  body('activities').optional().isArray(),
  body('days').optional().isArray(),
];

const updateItineraryValidator = [
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
  body('guests').optional().isInt({ min: 1 }).withMessage('Guests must be at least 1'),
  body('accommodation').optional().isIn(Itinerary.ACCOMMODATION_TYPES),
  body('status')
    .optional()
    .isIn(Itinerary.STATUS_VALUES)
    .withMessage(`Status must be one of: ${Itinerary.STATUS_VALUES.join(', ')}`),
  body('destinations').optional().isArray(),
  body('activities').optional().isArray(),
  body('days').optional().isArray(),
];

module.exports = { createItineraryValidator, updateItineraryValidator };
