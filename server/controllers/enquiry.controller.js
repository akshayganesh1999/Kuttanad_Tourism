const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const enquiryService = require('../services/enquiry.service');

// then builds the wa.me link from the same data once this succeeds.
const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.createEnquiry(req.body, req.user);
  return new ApiResponse(201, 'Enquiry submitted successfully', enquiry).send(res, 201);
});

// GET /api/enquiries — admin only.
const listEnquiries = asyncHandler(async (req, res) => {
  const { items, pagination } = await enquiryService.listEnquiries(req.query);
  return new ApiResponse(200, 'Enquiries fetched successfully', items, pagination).send(res);
});

// GET /api/enquiries/my — the logged-in tourist's own enquiries.
const myEnquiries = asyncHandler(async (req, res) => {
  const { items, pagination } = await enquiryService.getUserEnquiries(req.user, req.query);
  return new ApiResponse(200, 'Your enquiries fetched successfully', items, pagination).send(res);
});

const getEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.getEnquiryById(req.params.id, req.user);
  return new ApiResponse(200, 'Enquiry fetched successfully', enquiry).send(res);
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.updateEnquiryStatus(req.params.id, req.body);
  return new ApiResponse(200, 'Enquiry updated successfully', enquiry).send(res);
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  await enquiryService.deleteEnquiry(req.params.id);
  return new ApiResponse(200, 'Enquiry deleted successfully', null).send(res);
});

module.exports = {
  createEnquiry,
  listEnquiries,
  myEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
