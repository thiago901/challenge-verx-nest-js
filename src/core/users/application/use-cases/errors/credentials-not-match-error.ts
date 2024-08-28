import { AppError } from "@shared/errors/AppError";


export class CrendentialsNotMatchFoundError extends AppError {
  constructor() {
    super('Crendentials not match',403)
  }
}