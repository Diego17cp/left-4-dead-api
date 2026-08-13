import { FastifyPluginAsync } from "fastify";
import chapterRoutes from "./routes";

const chaptersModule: FastifyPluginAsync = async (fastify) => {
	fastify.register(chapterRoutes);
};

export default chaptersModule;
