const { body } = require('express-validator');
const Room = require('../models/Room');

const createRoomValidator = [
  body('property')
    .notEmpty()
    .withMessage('Property id is required')
    .isMongoId()
    .withMessage('Property id must be a valid Mongo ID'),
  body('name').trim().notEmpty().withMessage('Room name is required'),
  body('roomType').trim().notEmpty().withMessage('Room type is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('bedType')
    .optional()
    .isIn(Room.BED_TYPES)
    .withMessage(`Bed type must be one of: ${Room.BED_TYPES.join(', ')}`),
  body('totalRooms').optional().isInt({ min: 1 }),
];

const updateRoomValidator = [
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('bedType')
    .optional()
    .isIn(Room.BED_TYPES)
    .withMessage(`Bed type must be one of: ${Room.BED_TYPES.join(', ')}`),
  body('totalRooms').optional().isInt({ min: 1 }),
];

module.exports = { createRoomValidator, updateRoomValidator };
