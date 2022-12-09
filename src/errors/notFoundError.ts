import STATUS_CODES from '../utils/variables';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.NotFound;
  }
}

export default NotFoundError;
