export const CHAPTER_LIST_INCLUDES = ["campaign", "media"] as const;

export const CHAPTER_DETAIL_INCLUDES = ["campaign", "media"] as const;

export type ChapterListInclude = (typeof CHAPTER_LIST_INCLUDES)[number];
export type ChapterDetailInclude = (typeof CHAPTER_DETAIL_INCLUDES)[number];

export const CHAPTER_DETAIL_DEFAULT_INCLUDES = [
	"campaign",
] as const satisfies ChapterDetailInclude[];
