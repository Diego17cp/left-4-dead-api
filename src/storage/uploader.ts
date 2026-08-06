import "dotenv/config"
import fs from "node:fs/promises";
import { StorageFile } from "./types";
import { supabase } from "./client";
import { env } from "@/config";

export const uploadFile = async (file: StorageFile): Promise<void> => {
	const buffer = await fs.readFile(file.localPath);
	const { error } = await supabase.storage
		.from(env.SUPABASE_STORAGE_BUCKET)
		.upload(file.storagePath, buffer, {
			contentType: file.mimeType,
			upsert: true,
		});
	if (error) throw error;
	console.log("File uploaded successfully:", file.storagePath);
};
