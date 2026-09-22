const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { paginate, buildPaginationMeta } = require('../utils/paginate');

const listUsers = async (query) => {
  const filter = {};
  if (query.role) filter.role = query.role;
  if (query.search) {
    const regex = new RegExp(query.search, 'i');
    filter.$or = [{ name: regex }, { email: regex }];
  }

  const { page, limit, skip } = paginate(query);
  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return { items, pagination: buildPaginationMeta(page, limit, total) };
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw ApiError.notFound('User not found');
  return user;
};

const updateUser = async (id, data) => {
  const user = await getUserById(id);
  
  const allowedFields = ['name', 'phone', 'role', 'profileImage'];
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) user[field] = data[field];
  });
  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  await user.deleteOne();
  return user;
};

module.exports = { listUsers, getUserById, updateUser, deleteUser };
