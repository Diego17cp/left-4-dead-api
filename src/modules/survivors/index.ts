import { FastifyPluginAsync } from "fastify";
import survivorRoutes from "./routes";

const survivorsModule: FastifyPluginAsync = async (fastify) => {
	fastify.register(survivorRoutes);
};

export default survivorsModule;
