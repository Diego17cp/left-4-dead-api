import { NotFoundError } from "@/core/errors";
import {
	ChapterDetailInclude,
	ChapterListInclude,
} from "../contracts/chapter-includes";
import { ChapterListResponseDTO } from "../dtos/chapter-list-response.dto";
import { ChapterListResponseMapper } from "../dtos/chapter-list-response.mapper";
import { ChapterResponseDTO } from "../dtos/chapter-response.dto";
import {
	ChapterResponseMapper,
	ChapterWithIncludes,
} from "../dtos/chapter-response.mapper";
import { ChapterRepository } from "../repositories/chapter.repository";
import { ChapterListFilters } from "../contracts/chapter-filters";

export class ChapterService {
	private static repo = new ChapterRepository();

	static async listChapters(
		includes: ChapterListInclude[],
		page: number,
		limit: number,
		filters: ChapterListFilters
	): Promise<{
		data: ChapterListResponseDTO[];
		total: number;
	}> {
		const { data: chapters, total } = await this.repo.findList(
			includes,
			page,
			limit,
      filters
		);
		return {
			data: ChapterListResponseMapper.toResponse(chapters),
			total,
		};
	}

	static async getChapterBySlug(
		slug: string,
		includes: ChapterDetailInclude[],
	): Promise<ChapterResponseDTO> {
		const chapter = await this.repo.findBySlug(slug, includes);
		if (!chapter) throw new NotFoundError("Chapter not found");
		return ChapterResponseMapper.toResponse(
			chapter as unknown as ChapterWithIncludes,
			includes,
		);
	}
}
