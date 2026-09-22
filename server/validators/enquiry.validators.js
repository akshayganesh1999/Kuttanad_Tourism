const { body } = require('express-validator');
const Enquiry = require('../models/Enquiry');

const createEnquiryValidator = [
  body('customerName').trim().notEmpty().withMessage('Customer name is required'),
  body('phone')
    .trim()
    .matches(/^[+]?[\d\s-]{7,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('email').optional().trim().isEmail().withMessage('Please provide a valid email address'),
  body('travelStartDate')
    .notEmpty()
    .withMessage('Travel start date is required')
    .isISO8601()
    .withMessage('Travel start date must be a valid date'),
  body('travelEndDate')
    .notEmpty()
    .withMessage('Travel end date is required')
    .isISO8601()
    .withMessage('Travel end date must be a valid date')
    .custom((value, { req }) => {
      if (req.body.travelStartDate && new Date(value) < new Date(req.body.travelStartDate)) {
        throw new Error('Travel end date cannot be before the start date');
      }
      return true;
    }),
  body('numberOfDays').isInt({ min: 1 }).withMessage('Number of days must be at least 1'),
  body('numberOfGuests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  body('destinations').optional().isArray(),
  body('activities').optional().isArray(),
];

const updateEnquiryValidator = [
  body('status')
    .optional()
    .isIn(Enquiry.STATUS_VALUES)
    .withMessage(`Status must be one of: ${Enquiry.STATUS_VALUES.join(', ')}`),
];

module.exports = { createEnquiryValidator, updateEnquiryValidator };
