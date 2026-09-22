const express = require('express');
const { listUsers, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { updateUserValidator } = require('../validators/user.validators');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/', listUsers);
router.get('/:id', getUser);
router.put('/:id', updateUserValidator, validate, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
