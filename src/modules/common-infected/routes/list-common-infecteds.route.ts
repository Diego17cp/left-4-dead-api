import { FastifyPluginAsync } from "fastify";
import { CommonInfectedController } from "../controllers/common-infected.controller";

const listCommonInfectedRoute: FastifyPluginAsync = async (fastify) => {
	fastify.get("/", CommonInfectedController.listCommonInfecteds);
};

export default listCommonInfectedRoute;
