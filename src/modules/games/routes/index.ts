import { FastifyPluginAsync } from "fastify";
import listGamesRoute from "./list-games.route";
import getGameBySlugRoute from "./get-game.route";

const gamesRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(listGamesRoute);
  await fastify.register(getGameBySlugRoute);
}

export default gamesRoutes;