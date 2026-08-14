import { MediaRelationLike } from "./media.types";
import { MediaMapper } from "./media.mapper";

export type MappedMedia = ReturnType<typeof MediaMapper.toDto>;

export class MediaRelationMapper {
	static groupAndMap<T extends MediaRelationLike>(relations: T[]) {
		const grouped: Record<string, (MappedMedia & { display_order: number })[]> = {};
		const sorted = [...relations].sort((a, b) => a.displayOrder - b.displayOrder);
		for (const relation of sorted) {
			const role = relation.mediaRole.name;
			if (!grouped[role]) grouped[role] = [];
			grouped[role].push({
				...MediaMapper.toDto(relation.media),
				display_order: relation.displayOrder
			});
		}
		return grouped;
	}
	static mapMany<T extends MediaRelationLike>(relations: T[]) {
		return relations
			.sort((a, b) => a.displayOrder - b.displayOrder)
			.map((relation) => ({
				role: relation.mediaRole.name,
				order: relation.displayOrder,
				...MediaMapper.toDto(relation.media),
			}));
	}
}
