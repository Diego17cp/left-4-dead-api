import { FastifyPluginAsync } from "fastify";
import commonInfectedRoutes from "./routes";

const commonInfectedModule: FastifyPluginAsync = async (fastify) => {
	fastify.register(commonInfectedRoutes);
};

export default commonInfectedModule;
