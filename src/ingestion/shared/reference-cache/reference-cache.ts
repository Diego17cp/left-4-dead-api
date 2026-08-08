import { ReferenceLoader } from "./types";

export class ReferenceCache {
	private readonly cache = new Map<string, Map<string, string>>();
	private readonly loaders = new Map<string, ReferenceLoader>();

	register(moduleId: string, loader: ReferenceLoader) {
		this.loaders.set(moduleId, loader);
	}

	async loadAll() {
		for (const loader of this.loaders.values()) {
			await loader(this);
		}
	}

	async refresh(moduleId: string) {
		const loader = this.loaders.get(moduleId);
		if (!loader) return;
		await loader(this);
	}

	set(entity: string, key: string, id: string) {
		if (!this.cache.has(entity)) {
			this.cache.set(entity, new Map<string, string>());
		}
		this.cache.get(entity)!.set(key, id);
	}

	get(entity: string, key: string): string {
		const id = this.cache.get(entity)?.get(key);
		if (!id) {
			throw new Error(`Reference for ${entity} "${key}" not found.`);
		}
		return id;
	}
}
