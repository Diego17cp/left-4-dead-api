import "fastify";

import {
	ApiResponse,
	PaginatedResponse,
	PaginationOptions,
} from "../contracts";

declare module "fastify" {
  interface FastifyReply {
    ok<T>(data: T): FastifyReply;
    paginated<T>(
      data: T[],
      options: PaginationOptions
    ): FastifyReply;
    noContent(): FastifyReply;
  }
}