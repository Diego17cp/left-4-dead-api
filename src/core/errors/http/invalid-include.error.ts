import { AppError } from "../base/app.error";
import { ERROR_CODES } from "../../contracts";

export class InvalidIncludeError extends AppError {
  constructor(
    invalid: string[],
    allowed: readonly string[],
    message = "Invalid include parameter",
  ) {
    super(
      400,
      ERROR_CODES.INVALID_INCLUDE,
      `${message}: ${invalid.join(", ")}`,
      [
        {
          field: "allowed",
          message: `Allowed: ${allowed.join(", ")}`,
        },
      ],
    );
  }
}