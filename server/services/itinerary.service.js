const Itinerary = require('../models/Itinerary');
const ApiError = require('../utils/ApiError');
const { paginate, buildPaginationMeta } = require('../utils/paginate');

const populateItinerary = (query) =>
  query
    .populate('user', 'name email')
    .populate('houseboat', 'title slug thumbnail pricePerNight')
    .populate('destinations', 'name slug images')
    .populate('activities', 'name slug image')
    .populate('days.activities', 'name slug image')
    .populate('days.destinations', 'name slug images');

    
const listItinerariesForUser = async (user, query) => {
  const filter = user.role === 'admin' && query.all === 'true' ? {} : { user: user._id };
  if (query.status) filter.status = query.status;

  const { page, limit, skip } = paginate(query);
  const [items, total] = await Promise.all([
    populateItinerary(Itinerary.find(filter)).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Itinerary.countDocuments(filter),
  ]);

  return { items, pagination: buildPaginationMeta(page, limit, total) };
};

const getItineraryById = async (id, user) => {
  const itinerary = await populateItinerary(Itinerary.findById(id));
  if (!itinerary) throw ApiError.notFound('Itinerary not found');

  const isOwner = String(itinerary.user) === String(user._id);
  if (user.role !== 'admin' && !isOwner) {
    throw ApiError.forbidden('You do not have access to this itinerary');
  }

  return itinerary;
};

const createItinerary = async (data, user) => Itinerary.create({ ...data, user: user._id });

const updateItinerary = async (id, data, user) => {
  const itinerary = await getItineraryById(id, user);
  const payload = { ...data };
  delete payload.user; // ownership can never be changed via the API
  Object.assign(itinerary, payload);
  await itinerary.save();
  return itinerary;
};

const deleteItinerary = async (id, user) => {
  const itinerary = await getItineraryById(id, user);
  await itinerary.deleteOne();
  return itinerary;
};

module.exports = {
  listItinerariesForUser,
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
};
