import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import responsePlugin from './response.plugin';
import globalErrorPlugin from './global-error.plugin';
import helmetPlugin from '@fastify/helmet';
import corsPlugin from '@fastify/cors';

const corePlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(corsPlugin, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });
  await fastify.register(helmetPlugin);
  await fastify.register(responsePlugin);
  await fastify.register(globalErrorPlugin);
}

export default fp(corePlugin, {
  name: "core"
});