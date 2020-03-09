class ErrorHandler {
  async handleError(err) {
    if (err.isOperational) return;
    console.log(err)
  }
}

export default ErrorHandler;
