import { FastifyPluginAsync } from "fastify";
import { SpecialInfectedController } from "../controllers/special-infected.controller";

const listSpecialInfectedRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/", SpecialInfectedController.listSpecialInfecteds);
};

export default listSpecialInfectedRoute;
