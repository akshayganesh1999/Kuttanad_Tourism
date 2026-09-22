const express = require('express');
const {
  listActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activity.controller');
const {
  createActivityValidator,
  updateActivityValidator,
} = require('../validators/activity.validators');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/', listActivities);
router.get('/:id', getActivity);

router.post('/', protect, authorize('admin'), createActivityValidator, validate, createActivity);
router.put(
  '/:id',
  protect,
  authorize('admin'),
  updateActivityValidator,
  validate,
  updateActivity
);
router.delete('/:id', protect, authorize('admin'), deleteActivity);

module.exports = router;
