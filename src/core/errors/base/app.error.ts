import { ErrorCode, ErrorDetail } from "../../contracts";

export abstract class AppError extends Error {
	constructor(
		public readonly statusCode: number,
		public readonly code: ErrorCode,
		message: string,
		public readonly details?: ErrorDetail[],
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
