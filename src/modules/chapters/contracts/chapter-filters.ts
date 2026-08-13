export const CHAPTER_LIST_FILTERS = ["campaign", "game"] as const;

export type ChapterListFilterKeys = (typeof CHAPTER_LIST_FILTERS)[number];

export type ChapterListFilters = Partial<Record<ChapterListFilterKeys, string>>;