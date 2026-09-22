const express = require('express');
const {
  listDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} = require('../controllers/destination.controller');
const {
  createDestinationValidator,
  updateDestinationValidator,
} = require('../validators/destination.validators');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/', listDestinations);
router.get('/:id', getDestination);

router.post(
  '/',
  protect,
  authorize('admin'),
  createDestinationValidator,
  validate,
  createDestination
);
router.put(
  '/:id',
  protect,
  authorize('admin'),
  updateDestinationValidator,
  validate,
  updateDestination
);
router.delete('/:id', protect, authorize('admin'), deleteDestination);

module.exports = router;
