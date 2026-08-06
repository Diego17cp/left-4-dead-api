import { routesConfig } from "@/config";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin"

const apiRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (_, reply) => {
    return reply.ok({
      name: "Left 4 Dead API",
      versions: routesConfig.AVAILABLE_VERSIONS,
      latest: routesConfig.CURRENT_VERSION
    })
  });
}

export default apiRoute;
