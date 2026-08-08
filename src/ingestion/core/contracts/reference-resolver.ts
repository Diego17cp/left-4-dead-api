import { ReferenceCache } from "@/ingestion/shared/reference-cache";

export interface ReferenceResolver<TInput, TOutput> {
  resolve(
    resources: TInput[],
    cache: ReferenceCache
  ): Promise<TOutput[]> | TOutput[]
}