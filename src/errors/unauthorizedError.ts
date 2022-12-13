import STATUS_CODES from '../utils/variables';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.Unauthorized;
  }
}

export default UnauthorizedError;
