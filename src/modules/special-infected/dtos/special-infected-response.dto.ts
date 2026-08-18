import { MediaItemResponseDTO } from "@/shared/media/media.types";

export type SpecialInfectedMediaResponseDTO = Record<
	string,
	MediaItemResponseDTO | MediaItemResponseDTO[] | undefined
>;
export interface SpecialInfectedResponseDTO {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	media?: SpecialInfectedMediaResponseDTO;
}
