const Enquiry = require('../models/Enquiry');
const ApiError = require('../utils/ApiError');
const { paginate, buildPaginationMeta } = require('../utils/paginate');

const populateEnquiry = (query) =>
  query
    .populate('property', 'title slug thumbnail propertyType')
    .populate('room', 'name roomType price')
    .populate('houseboat', 'title slug thumbnail')
    .populate('destinations', 'name slug')
    .populate('activities', 'name slug')
    .populate('itinerary');

const buildFilter = (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.source) filter.source = query.source;
  return filter;
};

const listEnquiries = async (query) => {
  const filter = buildFilter(query);
  const { page, limit, skip } = paginate(query);

  const [items, total] = await Promise.all([
    populateEnquiry(Enquiry.find(filter)).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  return { items, pagination: buildPaginationMeta(page, limit, total) };
};

const getUserEnquiries = async (user, query) => {
  const filter = { user: user._id };
  if (query.status) filter.status = query.status;

  const { page, limit, skip } = paginate(query);
  const [items, total] = await Promise.all([
    populateEnquiry(Enquiry.find(filter)).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  return { items, pagination: buildPaginationMeta(page, limit, total) };
};


const getEnquiryById = async (id, user) => {
  const enquiry = await populateEnquiry(Enquiry.findById(id));
  if (!enquiry) throw ApiError.notFound('Enquiry not found');

  const isOwner = Boolean(enquiry.user) && String(enquiry.user) === String(user._id);
  if (user.role !== 'admin' && !isOwner) {
    throw ApiError.forbidden('You do not have access to this enquiry');
  }

  return enquiry;
};


const createEnquiry = async (data, user) => {
  const payload = { ...data };
  if (user) payload.user = user._id;
  payload.source = payload.source || 'Website';
  return Enquiry.create(payload);
};

const updateEnquiryStatus = async (id, data) => {
  const enquiry = await Enquiry.findById(id);
  if (!enquiry) throw ApiError.notFound('Enquiry not found');
  Object.assign(enquiry, data);
  await enquiry.save();
  return enquiry;
};

const deleteEnquiry = async (id) => {
  const enquiry = await Enquiry.findById(id);
  if (!enquiry) throw ApiError.notFound('Enquiry not found');
  await enquiry.deleteOne();
  return enquiry;
};

module.exports = {
  listEnquiries,
  getUserEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
};
