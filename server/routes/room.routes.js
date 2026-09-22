const express = require('express');
const {
  listRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/room.controller');
const { createRoomValidator, updateRoomValidator } = require('../validators/room.validators');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/', listRooms);
router.get('/:id', getRoom);

router.post('/', protect, authorize('admin'), createRoomValidator, validate, createRoom);
router.put('/:id', protect, authorize('admin'), updateRoomValidator, validate, updateRoom);
router.delete('/:id', protect, authorize('admin'), deleteRoom);

module.exports = router;
