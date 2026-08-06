import fs from "node:fs/promises";
import path from "node:path";

import { LoadedResource } from "./types";

const RESOURCES_ROOT = path.resolve("resources");

export const loadResources = async <T>(
	resource: string,
): Promise<LoadedResource<T>[]> => {
	const resourceDirectory = path.join(RESOURCES_ROOT, resource);

	const entries = await fs.readdir(resourceDirectory, {
		withFileTypes: true,
	});

	const resources = await Promise.all(
		entries
			.filter((entry) => entry.isDirectory())
			.map(async (entry) => {
				const directory = path.join(resourceDirectory, entry.name);
				const manifestPath = path.join(directory, "manifest.json");
				const file = await fs.readFile(manifestPath, "utf-8");
				return {
					directory,
					manifest: JSON.parse(file),
				};
			}),
	);
	return resources;
};
