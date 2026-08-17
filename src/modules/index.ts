import { FastifyInstance } from "fastify";
import gamesModule from "./games";
import campaignsModule from "./campaigns";
import chaptersModule from "./chapters";
import survivorsModule from "./survivors";
import commonInfectedModule from "./common-infected";

export default async function appModules(fastify: FastifyInstance) {
	await fastify.register(gamesModule, { prefix: "/games" });
	await fastify.register(campaignsModule, { prefix: "/campaigns" });
	await fastify.register(chaptersModule, { prefix: "/chapters" });
	await fastify.register(survivorsModule, { prefix: "/survivors" });
	await fastify.register(commonInfectedModule, { prefix: "/common-infected-variants" });
}
