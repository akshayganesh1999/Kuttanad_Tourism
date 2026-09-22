const express = require('express');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const router = express.Router();

const READY_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const dbState = READY_STATES[mongoose.connection.readyState] || 'unknown';

    return new ApiResponse(200, 'Kuttanad Tourism API is healthy', {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      database: dbState,
      timestamp: new Date().toISOString(),
    }).send(res);
  })
);

module.exports = router;
