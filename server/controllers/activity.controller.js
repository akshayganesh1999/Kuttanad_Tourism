const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const activityService = require('../services/activity.service');

const listActivities = asyncHandler(async (req, res) => {
  const { items, pagination } = await activityService.listActivities(req.query);
  return new ApiResponse(200, 'Activities fetched successfully', items, pagination).send(res);
});

const getActivity = asyncHandler(async (req, res) => {
  const activity = await activityService.findActivityByIdOrSlug(req.params.id);
  return new ApiResponse(200, 'Activity fetched successfully', activity).send(res);
});

const createActivity = asyncHandler(async (req, res) => {
  const activity = await activityService.createActivity(req.body);
  return new ApiResponse(201, 'Activity created successfully', activity).send(res, 201);
});

const updateActivity = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.slug;
  delete data._id;
  const activity = await activityService.updateActivity(req.params.id, data);
  return new ApiResponse(200, 'Activity updated successfully', activity).send(res);
});

const deleteActivity = asyncHandler(async (req, res) => {
  await activityService.deleteActivity(req.params.id);
  return new ApiResponse(200, 'Activity deleted successfully', null).send(res);
});

module.exports = { listActivities, getActivity, createActivity, updateActivity, deleteActivity };
