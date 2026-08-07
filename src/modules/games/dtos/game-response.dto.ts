// TODO: The details may show summarized relations and if the user wants the full relation, it should be included in the includes

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
	campaigns?: IncludeDTO[];
	weapons?: IncludeDTO[];
	items?: IncludeDTO[];
	survivors?: IncludeDTO[];
	special_infected?: IncludeDTO[];
	common_infected_variants?: IncludeDTO[];
	media?: GameMediaResponseDTO;
}
