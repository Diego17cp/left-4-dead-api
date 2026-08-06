import { FastifyServerOptions } from "fastify";
import { isDevelopment } from "./env";

export const loggerConfig: FastifyServerOptions["logger"] = {
	level: isDevelopment ? "debug" : "info",
	transport: isDevelopment
		? {
				target: "pino-pretty",
				options: {
					colorize: true,
					translateTime: "HH:MM:ss",
					ignore: "pid,hostname",
					singleLine: false,
				},
			}
		: undefined,
	redact: {
		paths: [
			"req.headers.authorization",
			"req.headers.cookie",
			"body.password",
			"body.accessToken",
			"body.refreshToken",
		],
		remove: false,
	},
};
