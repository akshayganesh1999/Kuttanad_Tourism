const mongoose = require('mongoose');
const Activity = require('../models/Activity');
const ApiError = require('../utils/ApiError');
const { paginate, buildPaginationMeta } = require('../utils/paginate');

const buildFilter = (query) => {
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.difficulty) filter.difficulty = query.difficulty;
  if (query.featured !== undefined) filter.featured = query.featured === 'true';
  if (query.search) filter.$text = { $search: query.search };
  return filter;
};

const listActivities = async (query) => {
  const filter = buildFilter(query);
  const { page, limit, skip } = paginate(query);

  const [items, total] = await Promise.all([
    Activity.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Activity.countDocuments(filter),
  ]);

  return { items, pagination: buildPaginationMeta(page, limit, total) };
};

const findActivityByIdOrSlug = async (idOrSlug) => {
  const lookup = mongoose.Types.ObjectId.isValid(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };
  const activity = await Activity.findOne(lookup);
  if (!activity) throw ApiError.notFound('Activity not found');
  return activity;
};

const createActivity = async (data) => Activity.create(data);

const updateActivity = async (idOrSlug, data) => {
  const activity = await findActivityByIdOrSlug(idOrSlug);
  Object.assign(activity, data);
  await activity.save();
  return activity;
};

const deleteActivity = async (idOrSlug) => {
  const activity = await findActivityByIdOrSlug(idOrSlug);
  await activity.deleteOne();
  return activity;
};

module.exports = {
  listActivities,
  findActivityByIdOrSlug,
  createActivity,
  updateActivity,
  deleteActivity,
};
