import STATUS_CODES from '../utils/variables';

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.BadRequest;
  }
}

export default BadRequestError;
