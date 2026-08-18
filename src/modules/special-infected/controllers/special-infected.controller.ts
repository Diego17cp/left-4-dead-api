import { FastifyReply, FastifyRequest } from "fastify";
import { specialInfectedListQuerySchema } from "../schemas/special-infected-list.schema";
import { parseFilters } from "@/shared/http/query";
import { SPECIAL_INFECTED_FILTERS } from "../contracts/special-infected-filters";
import { SpecialInfectedService } from "../services/special-infected.service";
import {
	specialInfectedDetailParamsSchema,
	specialInfectedDetailQuerySchema,
} from "../schemas/special-infected-detail.schema";

export class SpecialInfectedController {
	static async listSpecialInfecteds(
		req: FastifyRequest,
		reply: FastifyReply,
	) {
		const { include, page, limit } = specialInfectedListQuerySchema.parse(
			req.query,
		);
		const filters = parseFilters(
			req.query as Record<string, unknown>,
			SPECIAL_INFECTED_FILTERS,
		);
		const { data, total } = await SpecialInfectedService.findList(
			include,
			page,
			limit,
			filters,
		);
		return reply.paginated(data, { page, limit, total });
	}

	static async getSpecialInfectedBySlug(
		req: FastifyRequest,
		reply: FastifyReply,
	) {
		const { include } = specialInfectedDetailQuerySchema.parse(req.query);
		const { slug } = specialInfectedDetailParamsSchema.parse(req.params);
		const specialInfected = await SpecialInfectedService.findBySlug(
			slug,
			include,
		);
		return reply.send(specialInfected);
	}
}
