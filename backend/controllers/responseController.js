export const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export const successResponse = (res, statusCode, message, payload) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    payload: payload,
  });
};
