import { FastifyPluginAsync } from "fastify";
import gamesRoutes from "./routes";

const gamesModule: FastifyPluginAsync = async (fastify) => {
	await fastify.register(gamesRoutes);
};

export default gamesModule;
