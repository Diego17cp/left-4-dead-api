import { routesConfig } from "@/config";
import { FastifyPluginAsync } from "fastify"
import fp from "fastify-plugin"

const versionRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (_, reply) => {
    return reply.ok({
      version: routesConfig.CURRENT_VERSION,
      status: "stable",
      resources: [
        "games",
        "campaigns",
        "chapters",
        "survivors",
        "special-infected",
        "common-infected-variants",
        "weapons",
        "items",
        // TODO: Check if this really going to be used.
        "media",
        "search"
      ]
    });
  });
};

export default versionRoute;