import { ERROR_CODES } from "../../contracts";
import { AppError } from "../base/app.error";

export class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(404, ERROR_CODES.RESOURCE_NOT_FOUND, message);
	}
}
