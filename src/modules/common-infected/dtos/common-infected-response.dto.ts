import { MediaItemResponseDTO } from "@/shared/media/media.types";

export type CommonInfectedMediaResponseDTO = Record<
	string,
	MediaItemResponseDTO | MediaItemResponseDTO[] | undefined
>;

export interface CommonInfectedResponseDTO {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	special_trait: string | null;
	media?: CommonInfectedMediaResponseDTO;
}