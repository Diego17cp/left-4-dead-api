import { ReferenceCache } from "./reference-cache";

export type ReferenceLoader = (cache: ReferenceCache) => Promise<void>;
