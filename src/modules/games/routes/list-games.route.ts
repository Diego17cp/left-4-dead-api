import { FastifyPluginAsync } from "fastify";
import { GamesController } from "../controllers/games.controller";

const listGamesRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", GamesController.listGames);
}

export default listGamesRoute;