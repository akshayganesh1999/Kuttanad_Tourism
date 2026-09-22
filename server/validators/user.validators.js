const { body } = require('express-validator');

const updateUserValidator = [
  body('name').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 characters'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[\d\s-]{7,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be "user" or "admin"'),
];

module.exports = { updateUserValidator };
