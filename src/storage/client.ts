import "dotenv/config";
import { env } from "@/config";
import { createClient } from "@supabase/supabase-js";

if (!env.SUPABASE_URL) throw new Error("Missing SUPABASE_URL.");
if (!env.SUPABASE_SERVICE_ROLE_KEY)
	throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");

export const supabase = createClient(
	env.SUPABASE_URL,
	env.SUPABASE_SERVICE_ROLE_KEY,
);
