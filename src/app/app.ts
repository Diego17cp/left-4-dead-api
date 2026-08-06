import Fastify from "fastify";
import "dotenv/config";
import corePlugin from "@/core/plugins";
import { DatabaseConnection } from "@/config";

const app = Fastify({
	logger: true,
});

app.register(corePlugin);

app.get("/health", async (_, reply) => {
	reply.status(200).send({
		message: "Left 4 Dead API is online.",
		status: "running",
		database: DatabaseConnection.getInstance().getConnectionStatus(),
		timestamp: new Date().toISOString()
	});
});

export default app;
