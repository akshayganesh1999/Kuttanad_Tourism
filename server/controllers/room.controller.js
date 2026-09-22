const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const roomService = require('../services/room.service');

const listRooms = asyncHandler(async (req, res) => {
  const { items, pagination } = await roomService.listRooms(req.query);
  return new ApiResponse(200, 'Rooms fetched successfully', items, pagination).send(res);
});

const getRoom = asyncHandler(async (req, res) => {
  const room = await roomService.getRoomById(req.params.id);
  return new ApiResponse(200, 'Room fetched successfully', room).send(res);
});

const createRoom = asyncHandler(async (req, res) => {
  const room = await roomService.createRoom(req.body);
  return new ApiResponse(201, 'Room created successfully', room).send(res, 201);
});

const updateRoom = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data._id;
  delete data.property;
  const room = await roomService.updateRoom(req.params.id, data);
  return new ApiResponse(200, 'Room updated successfully', room).send(res);
});

const deleteRoom = asyncHandler(async (req, res) => {
  await roomService.deleteRoom(req.params.id);
  return new ApiResponse(200, 'Room deleted successfully', null).send(res);
});

module.exports = { listRooms, getRoom, createRoom, updateRoom, deleteRoom };
