import fp from "fastify-plugin";
import apiRoute from "./api.route";
import { routesConfig } from "@/config";
import versionRoute from "./version.route";
import modules from "@/modules";

export default fp(async (fastify) => {
  await fastify.register(apiRoute, {
    prefix: routesConfig.API
  });
  await fastify.register(versionRoute, {
    prefix: `${routesConfig.API}/${routesConfig.CURRENT_VERSION}`
  });
  await fastify.register(modules, {
    prefix: `${routesConfig.API}/${routesConfig.CURRENT_VERSION}`
  })
});