import { ErrorCode, ErrorDetail, ErrorResponse } from "../../contracts";

export class ErrorBuilder {
	static build(
		code: ErrorCode,
		message: string,
		details?: ErrorDetail[],
	): ErrorResponse {
		return {
			error: {
				code,
				message,
				details,
			},
		};
	}
}
