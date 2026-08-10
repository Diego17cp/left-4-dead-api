export const CAMPAIGN_LIST_INCLUDES = ["game", "media"] as const;

export const CAMPAIGN_DETAIL_INCLUDES = ["game", "media", "chapters"] as const;

export const CAMPAIGN_DETAIL_DEFAULT_INCLUDES = [
	"game",
	"chapters",
] as const satisfies readonly CampaignDetailInclude[];

export type CampaignListInclude = (typeof CAMPAIGN_LIST_INCLUDES)[number];

export type CampaignDetailInclude = (typeof CAMPAIGN_DETAIL_INCLUDES)[number];