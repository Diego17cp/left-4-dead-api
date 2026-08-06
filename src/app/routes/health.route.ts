import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const healthRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/health", async (_, reply) => {
		return reply.ok({
			status: "ok",
		});
	});
};

export default healthRoute;
