import { FastifyPluginAsync } from "fastify";
import { SurvivorController } from "../controllers/survivor.controller";

const listSurvivorRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/", SurvivorController.listSurvivors);
};

export default listSurvivorRoute;
