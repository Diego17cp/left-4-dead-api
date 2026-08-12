import { InvalidFilterError } from "@/core/errors";

const FILTER_PATTERN = /^filter\[(.+)\]$/;

export const parseFilters = (query: Record<string, unknown>, allowed: readonly string[]): Record<string, string> => {
  const filters: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(query)) {
    const match = key.match(FILTER_PATTERN);
    if (!match) continue;
    const field = match[1];
    if (!allowed.includes(field)) throw new InvalidFilterError(field, allowed);
    if (typeof value !== "string") throw new InvalidFilterError(field, allowed);
    filters[field] = value;
  }
  return filters;
}