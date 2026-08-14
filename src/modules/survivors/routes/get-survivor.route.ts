import { FastifyPluginAsync } from "fastify";
import { SurvivorController } from "../controllers/survivor.controller";

const getSurvivorBySlugRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/:slug", SurvivorController.getSurvivorBySlug);
};

export default getSurvivorBySlugRoute;
