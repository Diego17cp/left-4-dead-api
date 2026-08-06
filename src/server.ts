import app from "./app/app";
import "dotenv/config";
import { DatabaseConnection, env } from "@/config";

const start = async () => {
  try {
    await DatabaseConnection.getInstance().connect();
    await app.listen({
      port: env.PORT,
      host: '0.0.0.0'
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();