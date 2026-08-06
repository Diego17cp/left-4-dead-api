import * as fs from "node:fs/promises";
import mime from "mime-types";
import path from "node:path";
import { StorageFile } from "./types";

const RESOURCES_DIR = path.resolve("resources");

export const scanResources = async (): Promise<StorageFile[]> => {
	const files: StorageFile[] = [];
	await walk(RESOURCES_DIR, files);
	return files;
};

const walk = async (directory: string, files: StorageFile[]): Promise<void> => {
	const entries = await fs.readdir(directory, {
		withFileTypes: true,
	});
	const hasManifest = entries.some(
		(e) => e.isFile() && e.name === "manifest.json",
	);
	if (hasManifest) await scanResource(directory, files);
	for (const entry of entries) {
		if (!entry.isDirectory()) continue;
		await walk(path.join(directory, entry.name), files);
	}
};

const scanResource = async (
	resourceDirectory: string,
	files: StorageFile[],
): Promise<void> => {
	const mediaDirectory = path.join(resourceDirectory, "media");
	try {
		const entries = await fs.readdir(mediaDirectory, {
			withFileTypes: true,
		});
		for (const entry of entries) {
			if (!entry.isFile()) continue;
			const localPath = path.join(mediaDirectory, entry.name);
			const relative = path.relative(RESOURCES_DIR, localPath);

			files.push({
				localPath,
				storagePath: relative.replace(/\\/g, "/"),
				mimeType: mime.lookup(localPath) || "application/octet-stream",
			});
		}
	} catch {}
};