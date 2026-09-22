const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const userService = require('../services/user.service');

const listUsers = asyncHandler(async (req, res) => {
  const { items, pagination } = await userService.listUsers(req.query);
  return new ApiResponse(200, 'Users fetched successfully', items, pagination).send(res);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return new ApiResponse(200, 'User fetched successfully', user).send(res);
});

const updateUser = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.password;
  delete data.email;
  const user = await userService.updateUser(req.params.id, data);
  return new ApiResponse(200, 'User updated successfully', user).send(res);
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  return new ApiResponse(200, 'User deleted successfully', null).send(res);
});

module.exports = { listUsers, getUser, updateUser, deleteUser };
