import { ERROR_CODES } from "../../contracts";
import { AppError } from "../base/app.error";

export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(403, ERROR_CODES.FORBIDDEN, message);
	}
}
