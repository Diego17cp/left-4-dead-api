import { storageConfig } from "@/config";
import { StorageResolver } from "./storage.types";

export class SupabaseStorageResolver implements StorageResolver {
	publicUrl(path: string): string {
		return `${storageConfig.publicBaseUrl}/${storageConfig.bucket}/${path}`;
	}
}

export const storageResolver = new SupabaseStorageResolver();