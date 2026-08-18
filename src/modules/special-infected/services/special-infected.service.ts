import { SpecialInfectedInclude } from "../contracts/special-infected-includes";
import { SpecialInfectedFilters } from "../contracts/special-infected-filters";
import { SpecialInfectedRepository } from "../repositories/special-infected.repository";
import { SpecialInfectedResponseDTO } from "../dtos/special-infected-response.dto";
import {
	SpecialInfectedResponseMapper,
	SpecialInfectedWithIncludes,
} from "../dtos/special-infected-response.mapper";
import { NotFoundError } from "@/core/errors";

export class SpecialInfectedService {
	private static repo = new SpecialInfectedRepository();

	static async findList(
		includes: SpecialInfectedInclude[],
		page: number,
		limit: number,
		filters: SpecialInfectedFilters,
	): Promise<{ data: SpecialInfectedResponseDTO[]; total: number }> {
		const { data: specials, total } = await this.repo.findList(
			includes,
			page,
			limit,
			filters,
		);
		return {
			data: specials.map((s) =>
				SpecialInfectedResponseMapper.toResponse(
					s as unknown as SpecialInfectedWithIncludes,
				),
			),
			total,
		};
	}

	static async findBySlug(
		slug: string,
		includes: SpecialInfectedInclude[],
	): Promise<SpecialInfectedResponseDTO> {
		const data = await this.repo.findBySlug(slug, includes);
		if (!data) throw new NotFoundError("Special infected not found");
		return SpecialInfectedResponseMapper.toResponse(
			data as unknown as SpecialInfectedWithIncludes,
		);
	}

	static async findById(
		id: string,
		includes: SpecialInfectedInclude[],
	): Promise<SpecialInfectedResponseDTO> {
		const data = await this.repo.findById(id, includes);
		if (!data) throw new NotFoundError("Special infected not found");
		return SpecialInfectedResponseMapper.toResponse(
			data as unknown as SpecialInfectedWithIncludes,
		);
	}
}
