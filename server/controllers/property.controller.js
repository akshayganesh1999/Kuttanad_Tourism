const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const propertyService = require('../services/property.service');

const listProperties = asyncHandler(async (req, res) => {
  const { items, pagination } = await propertyService.listProperties(req.query);
  return new ApiResponse(200, 'Properties fetched successfully', items, pagination).send(res);
});

const getProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.findPropertyByIdOrSlug(req.params.id);
  return new ApiResponse(200, 'Property fetched successfully', property).send(res);
});

const createProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.createProperty({ ...req.body, owner: req.user._id });
  return new ApiResponse(201, 'Property created successfully', property).send(res, 201);
});

const updateProperty = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.slug; // slug is derived, never set directly by clients
  delete data._id;
  delete data.owner;
  const property = await propertyService.updateProperty(req.params.id, data);
  return new ApiResponse(200, 'Property updated successfully', property).send(res);
});

const deleteProperty = asyncHandler(async (req, res) => {
  await propertyService.deleteProperty(req.params.id);
  return new ApiResponse(200, 'Property deleted successfully', null).send(res);
});

module.exports = { listProperties, getProperty, createProperty, updateProperty, deleteProperty };
