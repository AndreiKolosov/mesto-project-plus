import STATUS_CODES from '../utils/variables';

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODES.Conflict;
  }
}

export default ConflictError;
