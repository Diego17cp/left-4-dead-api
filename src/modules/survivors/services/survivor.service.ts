import { SurvivorRepository } from "../repositories/survivor.repository";
import {
	SurvivorListInclude,
	SurvivorDetailInclude,
} from "../contracts/survivor-includes";
import { SurvivorListFilters } from "../contracts/survivor-filters";
import { SurvivorListResponseDTO } from "../dtos/survivor-list-response.dto";
import { SurvivorListResponseMapper } from "../dtos/survivor-list-response.mapper";
import {
	SurvivorResponseMapper,
	SurvivorWithRelations,
} from "../dtos/survivor-response.mapper";
import { SurvivorResponseDTO } from "../dtos/survivor-response.dto";
import { NotFoundError } from "@/core/errors";

export class SurvivorService {
	private static repo = new SurvivorRepository();

	static async findList(
		includes: SurvivorListInclude[],
		page: number,
		limit: number,
		filters: SurvivorListFilters,
	): Promise<{ data: SurvivorListResponseDTO[]; total: number }> {
		const { data, total } = await this.repo.findList(
			includes,
			page,
			limit,
			filters,
		);
		return {
			data: SurvivorListResponseMapper.toResponse(data),
			total,
		};
	}

	static async findBySlug(
		slug: string,
		includes: SurvivorDetailInclude[],
	): Promise<SurvivorResponseDTO> {
		const data = await this.repo.findBySlug(slug, includes);
		if (!data) throw new NotFoundError("Survivor not found");
		return SurvivorResponseMapper.toResponse(
			data as unknown as SurvivorWithRelations,
			includes,
		);
	}

	static async findById(
		id: string,
		includes: SurvivorDetailInclude[],
	): Promise<SurvivorResponseDTO> {
		const data = await this.repo.findById(id, includes);
		if (!data) throw new NotFoundError("Survivor not found");
		return SurvivorResponseMapper.toResponse(
			data as unknown as SurvivorWithRelations,
			includes,
		);
	}
}
