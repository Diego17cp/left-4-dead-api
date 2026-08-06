import z from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z.url(),
	DIRECT_URL: z.url(),
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
});

export const env = envSchema.parse(process.env)

export const isDevelopment = env.NODE_ENV === "development"
export const isProduction = env.NODE_ENV === "production"