import { ERROR_CODES } from "../../contracts";
import { AppError } from "../base/app.error";

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(401, ERROR_CODES.UNAUTHORIZED, message);
	}
}
