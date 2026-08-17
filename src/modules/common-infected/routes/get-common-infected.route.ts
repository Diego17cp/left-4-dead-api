import { FastifyPluginAsync } from "fastify";
import { CommonInfectedController } from "../controllers/common-infected.controller";

const getCommonInfectedBySlugRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/:slug", CommonInfectedController.getCommonInfectedBySlug);
};

export default getCommonInfectedBySlugRoute;
