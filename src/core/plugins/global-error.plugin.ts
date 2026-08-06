import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { AppError } from "../errors";
import { ErrorBuilder } from "../http/builders";
import { ERROR_CODES } from "../contracts";

const globalErrorHandler: FastifyPluginAsync = async (fastify) => {
	fastify.setErrorHandler((error, request, reply) => {
		if (error instanceof AppError) {
			return reply
				.code(error.statusCode)
				.send(
					ErrorBuilder.build(
						error.code,
						error.message,
						error.details,
					),
				);
		}
		request.log.error(error);
		return reply
			.code(500)
			.send(
				ErrorBuilder.build(
					ERROR_CODES.INTERNAL_SERVER_ERROR,
					"Internal server error",
				),
			);
	});
};

export default fp(globalErrorHandler, {
	name: "global-error-handler",
});
