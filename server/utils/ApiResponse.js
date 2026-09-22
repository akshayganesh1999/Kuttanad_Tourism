class ApiResponse {
  constructor(statusCode, message = 'Success', data = null, pagination = null) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (pagination) {
      this.pagination = pagination;
    }
  }

  send(res, statusCode = 200) {
    return res.status(statusCode).json(this);
  }
}

module.exports = ApiResponse;
