const Room = require('../models/Room');
const Property = require('../models/Property');
const ApiError = require('../utils/ApiError');
const { paginate, buildPaginationMeta } = require('../utils/paginate');

const PROPERTY_PREVIEW_FIELDS = 'title slug thumbnail location propertyType';

const listRooms = async (query) => {
  const filter = {};
  if (query.property) filter.property = query.property;
  if (query.roomType) filter.roomType = new RegExp(query.roomType, 'i');
  if (query.available !== undefined) filter.available = query.available === 'true';

  const { page, limit, skip } = paginate(query);
  const [items, total] = await Promise.all([
    Room.find(filter)
      .populate('property', PROPERTY_PREVIEW_FIELDS)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Room.countDocuments(filter),
  ]);

  return { items, pagination: buildPaginationMeta(page, limit, total) };
};

const getRoomById = async (id) => {
  const room = await Room.findById(id).populate('property', PROPERTY_PREVIEW_FIELDS);
  if (!room) throw ApiError.notFound('Room not found');
  return room;
};

const createRoom = async (data) => {
  const property = await Property.findById(data.property);
  if (!property) throw ApiError.badRequest('Referenced property does not exist');
  return Room.create(data);
};

const updateRoom = async (id, data) => {
  const room = await getRoomById(id);
  Object.assign(room, data);
  await room.save();
  return room;
};

const deleteRoom = async (id) => {
  const room = await getRoomById(id);
  await room.deleteOne();
  return room;
};

module.exports = { listRooms, getRoomById, createRoom, updateRoom, deleteRoom };
