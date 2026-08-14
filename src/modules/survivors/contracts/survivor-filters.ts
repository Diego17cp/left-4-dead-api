export const SURVIVOR_LIST_FILTERS = ["game"] as const;

export type SurvivorListFilterKeys = (typeof SURVIVOR_LIST_FILTERS)[number];

export type SurvivorListFilters = Partial<Record<SurvivorListFilterKeys, string>>;