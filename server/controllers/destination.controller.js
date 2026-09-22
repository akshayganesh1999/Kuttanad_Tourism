const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const destinationService = require('../services/destination.service');

const listDestinations = asyncHandler(async (req, res) => {
  const { items, pagination } = await destinationService.listDestinations(req.query);
  return new ApiResponse(200, 'Destinations fetched successfully', items, pagination).send(res);
});

const getDestination = asyncHandler(async (req, res) => {
  const destination = await destinationService.findDestinationByIdOrSlug(req.params.id);
  return new ApiResponse(200, 'Destination fetched successfully', destination).send(res);
});

const createDestination = asyncHandler(async (req, res) => {
  const destination = await destinationService.createDestination(req.body);
  return new ApiResponse(201, 'Destination created successfully', destination).send(res, 201);
});

const updateDestination = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.slug;
  delete data._id;
  const destination = await destinationService.updateDestination(req.params.id, data);
  return new ApiResponse(200, 'Destination updated successfully', destination).send(res);
});

const deleteDestination = asyncHandler(async (req, res) => {
  await destinationService.deleteDestination(req.params.id);
  return new ApiResponse(200, 'Destination deleted successfully', null).send(res);
});

module.exports = {
  listDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
};
