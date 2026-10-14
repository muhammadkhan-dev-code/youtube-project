class ApiError extends Error {
  constructor(
    statusCodeOrMessage,
    messageOrStatusCode = "Something went wrong!",
    errors = [],
    stack = ""
  ) {
    let statusCode;
    let message;

    if (typeof statusCodeOrMessage === "number") {
      statusCode = statusCodeOrMessage;
      message =
        typeof messageOrStatusCode === "string"
          ? messageOrStatusCode
          : "Something went wrong!";
    } else if (typeof messageOrStatusCode === "number") {
      statusCode = messageOrStatusCode;
      message =
        typeof statusCodeOrMessage === "string"
          ? statusCodeOrMessage
          : "Something went wrong!";
    } else {
      statusCode = 500;
      message =
        typeof statusCodeOrMessage === "string"
          ? statusCodeOrMessage
          : "Something went wrong!";
    }

    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.message = message;
    this.errors = Array.isArray(errors) ? errors : errors ? [errors] : [];

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };