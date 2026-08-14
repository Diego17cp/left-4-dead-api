export const SURVIVOR_LIST_INCLUDES = ["game", "media"] as const;

export const SURVIVOR_DETAIL_INCLUDES = ["game", "media"] as const;

export type SurvivorListInclude = (typeof SURVIVOR_LIST_INCLUDES)[number];
export type SurvivorDetailInclude = (typeof SURVIVOR_DETAIL_INCLUDES)[number];

export const SURVIVOR_DETAIL_DEFAULT_INCLUDES = ["game"] as const satisfies SurvivorDetailInclude[];