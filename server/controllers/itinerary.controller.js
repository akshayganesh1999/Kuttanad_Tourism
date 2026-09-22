const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const itineraryService = require('../services/itinerary.service');

const listItineraries = asyncHandler(async (req, res) => {
  const { items, pagination } = await itineraryService.listItinerariesForUser(req.user, req.query);
  return new ApiResponse(200, 'Itineraries fetched successfully', items, pagination).send(res);
});

const getItinerary = asyncHandler(async (req, res) => {
  const itinerary = await itineraryService.getItineraryById(req.params.id, req.user);
  return new ApiResponse(200, 'Itinerary fetched successfully', itinerary).send(res);
});

const createItinerary = asyncHandler(async (req, res) => {
  const itinerary = await itineraryService.createItinerary(req.body, req.user);
  return new ApiResponse(201, 'Itinerary created successfully', itinerary).send(res, 201);
});

const updateItinerary = asyncHandler(async (req, res) => {
  const itinerary = await itineraryService.updateItinerary(req.params.id, req.body, req.user);
  return new ApiResponse(200, 'Itinerary updated successfully', itinerary).send(res);
});

const deleteItinerary = asyncHandler(async (req, res) => {
  await itineraryService.deleteItinerary(req.params.id, req.user);
  return new ApiResponse(200, 'Itinerary deleted successfully', null).send(res);
});

module.exports = { listItineraries, getItinerary, createItinerary, updateItinerary, deleteItinerary };
