import STATUS_CODES from '../utils/variables';

class ServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.InternalServerError;
  }
}

export default ServerError;
