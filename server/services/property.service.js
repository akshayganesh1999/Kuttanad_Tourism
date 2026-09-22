const mongoose = require('mongoose');
const Property = require('../models/Property');
const ApiError = require('../utils/ApiError');
const { paginate, buildPaginationMeta } = require('../utils/paginate');


const buildFilter = (query) => {
  const filter = {};

  if (query.type) filter.propertyType = query.type;

  if (query.location) {
    const regex = new RegExp(query.location, 'i');
    filter.$or = [{ 'location.city': regex }, { 'location.area': regex }];
  }
  if (query.city) filter['location.city'] = new RegExp(`^${query.city}$`, 'i');

  if (query.minPrice || query.maxPrice) {
    filter.pricePerNight = {};
    if (query.minPrice) filter.pricePerNight.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.pricePerNight.$lte = Number(query.maxPrice);
  }

  if (query.guests) filter.guestCapacity = { $gte: Number(query.guests) };

  if (query.amenities) {
    const amenitiesArr = query.amenities.split(',').map((a) => a.trim());
    filter.amenities = { $all: amenitiesArr };
  }

  if (query.featured !== undefined) filter.featured = query.featured === 'true';
  if (query.available !== undefined) filter.available = query.available === 'true';

  if (query.search) filter.$text = { $search: query.search };

  return filter;
};

const SORT_MAP = {
  priceAsc: { pricePerNight: 1 },
  priceDesc: { pricePerNight: -1 },
  rating: { rating: -1 },
  newest: { createdAt: -1 },
};

const listProperties = async (query) => {
  const filter = buildFilter(query);
  const { page, limit, skip } = paginate(query);
  const sort = SORT_MAP[query.sort] || { createdAt: -1 };

  const [items, total] = await Promise.all([
    Property.find(filter).sort(sort).skip(skip).limit(limit),
    Property.countDocuments(filter),
  ]);

  return { items, pagination: buildPaginationMeta(page, limit, total) };
};


const findPropertyByIdOrSlug = async (idOrSlug) => {
  const lookup = mongoose.Types.ObjectId.isValid(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };
  const property = await Property.findOne(lookup);
  if (!property) throw ApiError.notFound('Property not found');
  return property;
};

const createProperty = async (data) => Property.create(data);

const updateProperty = async (idOrSlug, data) => {
  const property = await findPropertyByIdOrSlug(idOrSlug);
  Object.assign(property, data);
  await property.save();
  return property;
};

const deleteProperty = async (idOrSlug) => {
  const property = await findPropertyByIdOrSlug(idOrSlug);
  await property.deleteOne();
  return property;
};

module.exports = {
  listProperties,
  findPropertyByIdOrSlug,
  createProperty,
  updateProperty,
  deleteProperty,
};
