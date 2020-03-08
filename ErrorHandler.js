class ErrorHandler {
  async handleError(err) {
    if (err.isOperational) return;
    exit(1);
  }
}

export default ErrorHandler;
