const express = require('express');
const {
  listItineraries,
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
} = require('../controllers/itinerary.controller');
const {
  createItineraryValidator,
  updateItineraryValidator,
} = require('../validators/itinerary.validators');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', listItineraries);
router.get('/:id', getItinerary);
router.post('/', createItineraryValidator, validate, createItinerary);
router.put('/:id', updateItineraryValidator, validate, updateItinerary);
router.delete('/:id', deleteItinerary);

module.exports = router;
