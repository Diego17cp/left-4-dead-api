import { env } from "./env";

export const storageConfig = {
	provider: "supabase",
	publicBaseUrl: `${env.SUPABASE_URL}/storage/v1/object/public`,
	bucket: env.SUPABASE_STORAGE_BUCKET,
} as const;