const { body } = require('express-validator');
const Activity = require('../models/Activity');

const createActivityValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('image').trim().notEmpty().withMessage('Image is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('category')
    .isIn(Activity.CATEGORIES)
    .withMessage(`Category must be one of: ${Activity.CATEGORIES.join(', ')}`),
  body('difficulty')
    .optional()
    .isIn(Activity.DIFFICULTY_LEVELS)
    .withMessage(`Difficulty must be one of: ${Activity.DIFFICULTY_LEVELS.join(', ')}`),
  body('price').optional().isFloat({ min: 0 }),
];

const updateActivityValidator = [
  body('category')
    .optional()
    .isIn(Activity.CATEGORIES)
    .withMessage(`Category must be one of: ${Activity.CATEGORIES.join(', ')}`),
  body('difficulty')
    .optional()
    .isIn(Activity.DIFFICULTY_LEVELS)
    .withMessage(`Difficulty must be one of: ${Activity.DIFFICULTY_LEVELS.join(', ')}`),
  body('price').optional().isFloat({ min: 0 }),
];

module.exports = { createActivityValidator, updateActivityValidator };
