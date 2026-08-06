import Fastify from "fastify";
import "dotenv/config";
import corePlugin from "@/core/plugins";
import { loggerConfig } from "@/config";
import applicationRoutes from "./routes";

const app = Fastify({
	logger: loggerConfig,
});

app.register(corePlugin);
app.register(applicationRoutes);

export default app;
