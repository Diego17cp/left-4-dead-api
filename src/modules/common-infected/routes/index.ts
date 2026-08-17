import { FastifyPluginAsync } from "fastify";
import listCommonInfectedRoute from "./list-common-infecteds.route";
import getCommonInfectedBySlugRoute from "./get-common-infected.route";

const commonInfectedRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(listCommonInfectedRoute);
	fastify.register(getCommonInfectedBySlugRoute);
};

export default commonInfectedRoutes;