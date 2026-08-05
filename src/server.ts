import app from "./app/app";
import "dotenv/config";

const PORT: number = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await app.listen({ 
      port: PORT, 
      host: '0.0.0.0' 
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();