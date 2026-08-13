import { FastifyPluginAsync } from "fastify";
import listChaptersRoute from "./list-chapters.route";
import getChapterBySlugRoute from "./get-chapter.route";

const chapterRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(listChaptersRoute);
	fastify.register(getChapterBySlugRoute);
};

export default chapterRoutes;
