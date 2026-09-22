const mongoose = require('mongoose');
const Destination = require('../models/Destination');
const ApiError = require('../utils/ApiError');
const { paginate, buildPaginationMeta } = require('../utils/paginate');

const ACTIVITY_PREVIEW_FIELDS = 'name slug category image';

const buildFilter = (query) => {
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.featured !== undefined) filter.featured = query.featured === 'true';
  if (query.search) filter.$text = { $search: query.search };
  return filter;
};

const listDestinations = async (query) => {
  const filter = buildFilter(query);
  const { page, limit, skip } = paginate(query);

  const [items, total] = await Promise.all([
    Destination.find(filter)
      .populate('activities', ACTIVITY_PREVIEW_FIELDS)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Destination.countDocuments(filter),
  ]);

  return { items, pagination: buildPaginationMeta(page, limit, total) };
};

const findDestinationByIdOrSlug = async (idOrSlug) => {
  const lookup = mongoose.Types.ObjectId.isValid(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };
  const destination = await Destination.findOne(lookup).populate(
    'activities',
    ACTIVITY_PREVIEW_FIELDS
  );
  if (!destination) throw ApiError.notFound('Destination not found');
  return destination;
};

const createDestination = async (data) => Destination.create(data);

const updateDestination = async (idOrSlug, data) => {
  const destination = await findDestinationByIdOrSlug(idOrSlug);
  Object.assign(destination, data);
  await destination.save();
  return destination;
};

const deleteDestination = async (idOrSlug) => {
  const destination = await findDestinationByIdOrSlug(idOrSlug);
  await destination.deleteOne();
  return destination;
};

module.exports = {
  listDestinations,
  findDestinationByIdOrSlug,
  createDestination,
  updateDestination,
  deleteDestination,
};
