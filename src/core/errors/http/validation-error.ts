import { ERROR_CODES, ErrorDetail } from "../../contracts";
import { AppError } from "../base/app.error";

export class ValidationError extends AppError {
	constructor(message = "Validation failed", details?: ErrorDetail[]) {
		super(400, ERROR_CODES.VALIDATION_ERROR, message, details);
	}
}
