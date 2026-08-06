import { FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { PaginationOptions } from "../contracts";
import { SuccessBuilder } from "../http/builders";

const responsePlugin: FastifyPluginAsync = async (fastify) => {
	fastify.decorateReply("ok", function <T>(this: FastifyReply, data: T) {
		return this.status(200).send(SuccessBuilder.ok(data));
	});
	fastify.decorateReply("paginated", function<T>(
		this: FastifyReply,
		data: T[],
		options: PaginationOptions,
	) {
		return this.status(200).send(SuccessBuilder.paginated(data, options));
	});
	fastify.decorateReply("noContent", function (this: FastifyReply) {
		return this.status(204).send();
	});
};

export default fp(responsePlugin, { name: "http-response" });
