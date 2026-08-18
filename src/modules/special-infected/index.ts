import { FastifyPluginAsync } from "fastify";
import specialInfectedRoutes from "./routes";

const specialInfectedModule: FastifyPluginAsync = async (fastify) => {
	fastify.register(specialInfectedRoutes);
};

export default specialInfectedModule;
