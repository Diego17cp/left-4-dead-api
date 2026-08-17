import { NotFoundError } from "@/core/errors";
import { CommonInfectedResponseDTO } from "../dtos/common-infected-response.dto";
import {
	CommonInfectedResponseMapper,
	CommonInfectedWithIncludes,
} from "../dtos/common-infected-response.mapper";
import { CommonInfectedInclude } from "../contracts/common-infected-includes";
import { CommonInfectedRepository } from "../repositories/common-infected.repository";

export class CommonInfectedService {
	private static repo = new CommonInfectedRepository();

	static async listCommonInfected(
		includes: CommonInfectedInclude[],
		page: number,
		limit: number,
	): Promise<{
		data: CommonInfectedResponseDTO[];
		total: number;
	}> {
		const { data: commonInfected, total } = await this.repo.findList(
			includes,
			page,
			limit,
		);
		return {
			data: commonInfected.map((item) =>
				CommonInfectedResponseMapper.toResponse(
					item as unknown as CommonInfectedWithIncludes,
				),
			),
			total,
		};
	}

	static async getCommonInfectedBySlug(
		slug: string,
		includes: CommonInfectedInclude[],
	): Promise<CommonInfectedResponseDTO> {
		const commonInfected = await this.repo.findBySlug(slug, includes);
		if (!commonInfected)
			throw new NotFoundError("Common Infected not found");
		return CommonInfectedResponseMapper.toResponse(
			commonInfected as unknown as CommonInfectedWithIncludes,
		);
	}

	static async getCommonInfectedById(
		id: string,
		includes: CommonInfectedInclude[],
	): Promise<CommonInfectedResponseDTO> {
		const commonInfected = await this.repo.findById(id, includes);
		if (!commonInfected)
			throw new NotFoundError("Common Infected not found");
		return CommonInfectedResponseMapper.toResponse(
			commonInfected as unknown as CommonInfectedWithIncludes,
		);
	}
}
