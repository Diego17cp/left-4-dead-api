import { FastifyPluginAsync } from "fastify";
import { ChapterController } from "../controllers/chapter.controller";

const getChapterBySlugRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/:slug", ChapterController.getChapterBySlug);
};

export default getChapterBySlugRoute;
