import { FastifyPluginAsync } from "fastify";
import listSurvivorRoute from "./list-survivor.route";
import getSurvivorBySlugRoute from "./get-survivor.route";

const survivorRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(listSurvivorRoute);
	fastify.register(getSurvivorBySlugRoute);
};

export default survivorRoutes;
