import { FastifyReply, FastifyRequest } from "fastify";
import { chapterListQuerySchema } from "../schemas/chapter-list.schema";
import { ChapterService } from "../services/chapter.service";
import {
	chapterDetailParamsSchema,
	chapterDetailQuerySchema,
} from "../schemas/chapter-detail.schema";
import { parseFilters } from "@/shared/http/query";
import { CHAPTER_LIST_FILTERS } from "../contracts/chapter-filters";

export class ChapterController {
	static async listChapters(req: FastifyRequest, reply: FastifyReply) {
		const { include, page, limit } = chapterListQuerySchema.parse(
			req.query,
		);
    const filters = parseFilters(req.query as Record<string, unknown>, CHAPTER_LIST_FILTERS);
		const { data, total } = await ChapterService.listChapters(
			include,
			page,
			limit,
			filters,
		);
		return reply.paginated(data, { page, limit, total });
	}
	static async getChapterBySlug(req: FastifyRequest, reply: FastifyReply) {
		const { include } = chapterDetailQuerySchema.parse(req.query);
		const { slug } = chapterDetailParamsSchema.parse(req.params);
		const chapter = await ChapterService.getChapterBySlug(slug, include);
		return reply.send(chapter);
	}
}
