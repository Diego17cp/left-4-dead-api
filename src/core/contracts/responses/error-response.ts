export const ERROR_CODES = {
	RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",

	VALIDATION_ERROR: "VALIDATION_ERROR",

	DUPLICATE_RESOURCE: "DUPLICATE_RESOURCE",

	INVALID_FILTER: "INVALID_FILTER",

	INVALID_INCLUDE: "INVALID_INCLUDE",

	INVALID_QUERY: "INVALID_QUERY",

	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

	UNAUTHORIZED: "UNAUTHORIZED",

	FORBIDDEN: "FORBIDDEN",
} as const

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]

export interface ErrorDetail {
	field: string;
	message: string;
}

export interface ErrorBody {
	code: ErrorCode;
	message: string;
	details?: ErrorDetail[];
}

export interface ErrorResponse {
	error: ErrorBody;
}
