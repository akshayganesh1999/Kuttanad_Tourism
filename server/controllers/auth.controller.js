const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/auth.service');

const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  return new ApiResponse(201, 'Account created successfully', { user, token }).send(res, 201);
});

const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  return new ApiResponse(200, 'Logged in successfully', { user, token }).send(res);
});

const me = asyncHandler(async (req, res) => {
  return new ApiResponse(200, 'Current user fetched successfully', { user: req.user }).send(res);
});

const logout = asyncHandler(async (req, res) => {
  // JWTs are stateless — there is nothing to invalidate server-side. The
  // frontend simply discards the token; this endpoint exists so the client
  // has a consistent "logout" call to make and confirm.
  return new ApiResponse(200, 'Logged out successfully', null).send(res);
});

module.exports = { register, login, me, logout };
