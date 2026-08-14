import { FastifyInstance } from "fastify";
import gamesModule from "./games";
import campaignsModule from "./campaigns";
import chaptersModule from "./chapters";
import survivorsModule from "./survivors";

export default async function appModules(fastify: FastifyInstance) {
	await fastify.register(gamesModule, { prefix: "/games" });
	await fastify.register(campaignsModule, { prefix: "/campaigns" });
	await fastify.register(chaptersModule, { prefix: "/chapters" });
	await fastify.register(survivorsModule, { prefix: "/survivors" });
}
