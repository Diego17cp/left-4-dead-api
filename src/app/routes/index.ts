import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import rootRoute from "./root.route";
import healthRoute from "./health.route";

const applicationRoutes: FastifyPluginAsync = async (fastify) => {
	await fastify.register(rootRoute);
	await fastify.register(healthRoute);
};

export default fp(applicationRoutes, {
	name: "application-routes",
});
