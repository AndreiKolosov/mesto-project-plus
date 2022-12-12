import STATUS_CODES from '../utils/variables';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.Forbidden;
  }
}

export default ForbiddenError;
