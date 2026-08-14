import { FastifyReply, FastifyRequest } from "fastify";
import { survivorListQuerySchema } from "../schemas/survivor-list.schema";
import { SurvivorService } from "../services/survivor.service";
import { parseFilters } from "@/shared/http/query";
import { SURVIVOR_LIST_FILTERS } from "../contracts/survivor-filters";
import {
	survivorDetailParamsSchema,
	survivorDetailQuerySchema,
} from "../schemas/survivor-detail.schema";

export class SurvivorController {
	static async listSurvivors(req: FastifyRequest, reply: FastifyReply) {
		const { include, page, limit } = survivorListQuerySchema.parse(
			req.query,
		);
		const filters = parseFilters(
			req.query as Record<string, unknown>,
			SURVIVOR_LIST_FILTERS,
		);
		const { data, total } = await SurvivorService.findList(
			include,
			page,
			limit,
			filters,
		);
		return reply.paginated(data, { page, limit, total });
	}

	static async getSurvivorBySlug(req: FastifyRequest, reply: FastifyReply) {
		const { include } = survivorDetailQuerySchema.parse(req.query);
		const { slug } = survivorDetailParamsSchema.parse(req.params);
		const survivor = await SurvivorService.findBySlug(slug, include);
		return reply.send(survivor);
	}
}
