import { InvalidIncludeError } from "@/core/errors";

export const parseIncludes = <T extends string>(
	value: string | undefined,
	allowed: readonly T[],
): T[] => {
	if (!value) return [];
	const includes = value
		.split(",")
		.map((include) => include.trim())
		.filter(Boolean);
	const invalid = includes.filter(
		(include) => !allowed.includes(include as T),
	);
	if (invalid.length > 0) throw new InvalidIncludeError(invalid, allowed);
	return includes as T[];
};
