const errorHandler = (err, _req, res, _next) => {
  const status =
    typeof err.statusCode === "number"
      ? err.statusCode
      : typeof err.status === "number"
      ? err.status
      : 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  if (process.env.NODE_ENV !== "production") {
    if (status >= 500) {
      console.error(err);
    } else {
      console.warn(`[${status}] ${message} - ${_req.method} ${_req.originalUrl}`);
    }
  }

  return res.status(status).json({
    success: false,
    statusCode: status,
    message,
    errors,
  });
};

export default errorHandler;