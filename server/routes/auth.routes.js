const express = require('express');
const { register, login, me, logout } = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validators');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/me', protect, me);
router.post('/logout', protect, logout);

module.exports = router;
