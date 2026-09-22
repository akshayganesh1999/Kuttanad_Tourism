const { body } = require('express-validator');
const Destination = require('../models/Destination');

const createDestinationValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('location.area').trim().notEmpty().withMessage('Location area is required'),
  body('category')
    .isIn(Destination.CATEGORIES)
    .withMessage(`Category must be one of: ${Destination.CATEGORIES.join(', ')}`),
  body('images').optional().isArray(),
  body('thingsToDo').optional().isArray(),
  body('activities').optional().isArray(),
];

const updateDestinationValidator = [
  body('category')
    .optional()
    .isIn(Destination.CATEGORIES)
    .withMessage(`Category must be one of: ${Destination.CATEGORIES.join(', ')}`),
  body('images').optional().isArray(),
  body('thingsToDo').optional().isArray(),
  body('activities').optional().isArray(),
];

module.exports = { createDestinationValidator, updateDestinationValidator };
