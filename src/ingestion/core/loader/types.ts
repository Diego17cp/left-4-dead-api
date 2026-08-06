export interface LoadedResource<T = unknown> {
	directory: string;
	manifest: T;
}
