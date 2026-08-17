export const COMMON_INFECTED_INCLUDES = ["media"] as const;

export type CommonInfectedInclude = (typeof COMMON_INFECTED_INCLUDES)[number];