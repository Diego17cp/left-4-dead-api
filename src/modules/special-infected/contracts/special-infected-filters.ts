export const SPECIAL_INFECTED_FILTERS = ["game"] as const;

export type SpecialInfectedFilterKeys = (typeof SPECIAL_INFECTED_FILTERS)[number];

export type SpecialInfectedFilters = Partial<Record<SpecialInfectedFilterKeys, string>>;