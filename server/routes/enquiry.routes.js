const express = require('express');
const {
  createEnquiry,
  listEnquiries,
  myEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiry.controller');
const {
  createEnquiryValidator,
  updateEnquiryValidator,
} = require('../validators/enquiry.validators');
const validate = require('../middleware/validate');
const { protect, optionalAuth } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();


router.post('/', optionalAuth, createEnquiryValidator, validate, createEnquiry);


router.get('/my', protect, myEnquiries);

router.get('/', protect, authorize('admin'), listEnquiries);
router.put('/:id', protect, authorize('admin'), updateEnquiryValidator, validate, updateEnquiry);
router.delete('/:id', protect, authorize('admin'), deleteEnquiry);


router.get('/:id', protect, getEnquiry);

module.exports = router;
