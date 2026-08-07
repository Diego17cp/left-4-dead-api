import { FastifyPluginAsync } from "fastify";
import { GamesController } from "../controllers/games.controller";

const getGameBySlugRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/:slug", GamesController.getGameBySlug);
}

export default getGameBySlugRoute;