class ApiResponse {
  constructor(statusCode, message = "Success", data = null) {
    if (typeof message !== "string" && typeof data === "string") {
      const temp = message;
      message = data;
      data = temp;
    }
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
