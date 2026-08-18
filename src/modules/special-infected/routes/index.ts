import { FastifyPluginAsync } from "fastify";
import listSpecialInfectedRoute from "./list-special-infected.route";
import getSpecialInfectedBySlugRoute from "./get-special-infected.route";

const specialInfectedRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(listSpecialInfectedRoute);
	fastify.register(getSpecialInfectedBySlugRoute);
};

export default specialInfectedRoutes;
