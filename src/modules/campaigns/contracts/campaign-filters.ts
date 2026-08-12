export const CAMPAIGN_LIST_FILTERS = ["game", "content-source"] as const;

export type CampaignListFilterKeys = (typeof CAMPAIGN_LIST_FILTERS)[number];

export type CampaignListFilters = Partial<Record<CampaignListFilterKeys, string>>;