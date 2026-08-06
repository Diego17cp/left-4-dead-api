import {
	ApiResponse,
	EmptyResponse,
	PaginatedResponse,
	PaginationMeta,
	PaginationOptions,
} from "../../contracts";

export class SuccessBuilder {
	/**
	 * Builds a standard response for successful requests
	 *
	 * @param data - Data to be returned
	 * @returns ApiResponse with the data
	 */
	static ok<T>(data: T): ApiResponse<T> {
		return {
			data,
		};
	}

	/**
	 * Builds a response with no data
	 *
	 * @returns EmptyResponse with null data
	 */
	static empty(): EmptyResponse {
		return {
			data: null,
		};
	}

	/**
	 * Builds a paginated response
	 *
	 * @param data - Array of items
	 * @param options - Pagination options
	 * @returns PaginatedResponse with data and meta
	 */
	static paginated<T>(
		data: T[],
		options: PaginationOptions,
	): PaginatedResponse<T> {
		const { page, limit, total } = options;

		const totalPages = Math.ceil(total / limit);
		const meta: PaginationMeta = {
			page,
			limit,
			total,
			totalPages,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
		};

		return {
			data,
			meta,
		};
	}
}
