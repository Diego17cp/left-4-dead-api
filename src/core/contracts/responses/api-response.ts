import { PaginationMeta } from "../pagination/pagination-meta";

export interface ApiResponse<T> {
	data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	meta: PaginationMeta;
}

export type EmptyResponse = ApiResponse<null>