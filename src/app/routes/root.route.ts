import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { routesConfig } from "@/config";

const rootRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get(routesConfig.ROOT, async (_, reply) => {
    return reply.ok({
      name: "Left 4 Dead API",
      description: "A public REST API for Left 4 Dead game data and statistics.",
      version: routesConfig.CURRENT_VERSION,
      status: "online",
      documentation: "/docs",
      baseUrl: `${routesConfig.API}/${routesConfig.CURRENT_VERSION}`,
      repository: "https://github.com/Diego17cp/left-4-dead-api",
      author: "Dialcadev",
      license: "MIT",
    });
  });
}

export default fp(rootRoute, {
  name: "root-route"
})