const ApiError = require('../utils/ApiError');

const normalizeError = (err) => {
  if (err instanceof ApiError) return err;

  if (err.name === 'CastError') {
    return ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return ApiError.badRequest('Validation failed', errors);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return ApiError.conflict(`${field} already exists`);
  }

  if (err.name === 'JsonWebTokenError') {
    return ApiError.unauthorized('Invalid authentication token');
  }
  if (err.name === 'TokenExpiredError') {
    return ApiError.unauthorized('Authentication token has expired');
  }

  return ApiError.internal(
    process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  );
};

const errorHandler = (err, req, res, next) => {
  const apiError = normalizeError(err);

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  } else if (!apiError.isOperational) {
    console.error('Unhandled error:', err);
  }

  res.status(apiError.statusCode).json({
    success: false,
    message: apiError.message,
    errors: apiError.errors || [],
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
