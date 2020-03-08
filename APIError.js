// centralized error object that derives from Node’s Error
// https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/useonlythebuiltinerror.md

class APIError extends Error {
  constructor(
    { name = 'internal', httpCode = 500, details = ['Something went wrong on our side'] } = {},
    isOperational = false
  ) {
    super(name);
    this.name = name;
    this.httpCode = httpCode;
    this.details = details;
    this.isOperational = isOperational;
  }

  fromJoi(validationError) {
    this.name = 'validation';
    this.httpCode = 400;
    this.details = validationError.details.map(detail => detail.message);
    this.isOperational = true;
  }

  sanitize() {
    return {
      code: this.name,
      httpCode: this.httpCode,
      details: this.details,
    };
  }
}

export default APIError;
