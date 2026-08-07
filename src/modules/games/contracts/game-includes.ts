export const GAME_LIST_INCLUDES = ["campaigns", "media"] as const;

export const GAME_DETAIL_INCLUDES = [
	"campaigns",
	"media",
	"weapons",
	"items",
	"survivors",
	"specialInfected",
	"commonInfectedVariants",
] as const;

export const GAME_DETAIL_DEFAULT_INCLUDES = [
	"campaigns",
	"survivors",
	"specialInfected",
	"commonInfectedVariants",
] as const satisfies readonly GameDetailInclude[];

export type GameListInclude = (typeof GAME_LIST_INCLUDES)[number];

export type GameDetailInclude = (typeof GAME_DETAIL_INCLUDES)[number];
