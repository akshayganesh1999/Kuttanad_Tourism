const express = require('express');
const {
  listProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/property.controller');
const {
  createPropertyValidator,
  updatePropertyValidator,
} = require('../validators/property.validators');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/', listProperties);
router.get('/:id', getProperty);

router.post('/', protect, authorize('admin'), createPropertyValidator, validate, createProperty);
router.put('/:id', protect, authorize('admin'), updatePropertyValidator, validate, updateProperty);
router.delete('/:id', protect, authorize('admin'), deleteProperty);

module.exports = router;
