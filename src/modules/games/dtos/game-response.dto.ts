export interface CampaignSummaryDTO {
	name: string;
	slug: string;
}
export interface CampaignDetailDTO extends CampaignSummaryDTO {
	description: string | null;
	release_date: Date | null;
}

export interface SurvivorSummaryDTO {
	name: string;
	slug: string;
}
export interface SurvivorDetailDTO extends SurvivorSummaryDTO {
	biography: string | null;
	gender: string;
	age: number | null;
	occupation: string | null;
}

export interface SpecialInfectedSummaryDTO {
	name: string;
	slug: string;
}
export interface SpecialInfectedDetailDTO extends SpecialInfectedSummaryDTO {
	description: string | null;
}

export interface CommonInfectedVariantSummaryDTO {
	name: string;
	slug: string;
}
export interface CommonInfectedVariantDetailDTO extends CommonInfectedVariantSummaryDTO {
	specialTrait: string | null;
}


export interface IncludeDTO {
	name: string;
	slug: string;
}

export interface MediaItemResponseDTO {
	url: string;
	mimeType: string;
}

export type GameMediaResponseDTO = Record<
	string,
	MediaItemResponseDTO | MediaItemResponseDTO[] | undefined
>;

export interface GameResponseDTO {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	release_date: Date | null;
	// Default relations included
	campaigns: CampaignSummaryDTO[] | CampaignDetailDTO[];
	survivors: SurvivorSummaryDTO[] | SurvivorDetailDTO[];
	special_infected: SpecialInfectedSummaryDTO[] | SpecialInfectedDetailDTO[];
	common_infected_variants: CommonInfectedVariantSummaryDTO[] | CommonInfectedVariantDetailDTO[];
	// Optional relations
	media?: GameMediaResponseDTO;
	weapons?: IncludeDTO[];
	items?: IncludeDTO[];
}
