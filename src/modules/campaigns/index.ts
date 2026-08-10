import { FastifyPluginAsync } from "fastify";
import campaignsRoutes from "./routes";

const campaignsModule: FastifyPluginAsync = async (fastify) => {
	fastify.register(campaignsRoutes);
};

export default campaignsModule;