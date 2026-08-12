import { AppError } from "../base/app.error";
import { ERROR_CODES } from "../../contracts";

export class InvalidFilterError extends AppError {
  constructor(field: string, allowed: readonly string[]) {
    const message = `Invalid filter field: ${field}`;
    super(
      400,
      ERROR_CODES.INVALID_FILTER,
      message,
      [
        {
          field: "allowed",
          message: `Allowed: ${allowed.join(", ")}`
        }
      ]
    );
  }
}