import { AppError } from '@shared/errors/AppError';

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('User already exists', 409);
  }
}
