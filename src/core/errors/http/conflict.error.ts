import { ERROR_CODES } from "../../contracts";
import { AppError } from "../base/app.error";

export class ConflictError extends AppError {
	constructor(message = "Resource already exists") {
		super(409, ERROR_CODES.DUPLICATE_RESOURCE, message);
	}
}
