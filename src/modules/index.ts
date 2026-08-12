import { FastifyInstance } from "fastify";
import gamesModule from "./games";
import campaignsModule from "./campaigns";

export default async function appModules(fastify: FastifyInstance) {
	await fastify.register(gamesModule, { prefix: "/games" });
	await fastify.register(campaignsModule, { prefix: "/campaigns" });
}
