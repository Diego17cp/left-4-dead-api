import Fastify from "fastify";
import helmet from "@fastify/helmet";
import "dotenv/config";

const app = Fastify({
	logger: true,
});

app.register(helmet, { global: true });

app.get("/health", async (_, reply) => {
	reply.status(200).send({ status: "ok" });
});

export default app;
