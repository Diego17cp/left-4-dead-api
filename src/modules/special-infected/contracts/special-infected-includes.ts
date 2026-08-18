export const SPECIAL_INFECTED_INCLUDES = ["media"] as const;

export type SpecialInfectedInclude = (typeof SPECIAL_INFECTED_INCLUDES)[number];