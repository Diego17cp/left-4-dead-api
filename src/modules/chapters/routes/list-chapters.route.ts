import { FastifyPluginAsync } from "fastify";
import { ChapterController } from "../controllers/chapter.controller";

const listChapterRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/", ChapterController.listChapters);
};

export default listChapterRoute;
