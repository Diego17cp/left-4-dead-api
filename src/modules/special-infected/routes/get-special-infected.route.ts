import { FastifyPluginAsync } from "fastify";
import { SpecialInfectedController } from "../controllers/special-infected.controller";

const getSpecialInfectedBySlugRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/:slug", SpecialInfectedController.getSpecialInfectedBySlug);
};

export default getSpecialInfectedBySlugRoute;
