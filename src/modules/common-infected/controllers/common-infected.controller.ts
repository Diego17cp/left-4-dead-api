import { FastifyReply, FastifyRequest } from "fastify";
import { CommonInfectedService } from "../services/common-infected.service";
import { commonInfectedListQuerySchema } from "../schemas/common-infected-list.schema";
import { commonInfectedDetailParamsSchema, commonInfectedDetailQuerySchema } from "../schemas/common-infected-detail.schema";

export class CommonInfectedController {
	static async listCommonInfecteds(req: FastifyRequest, reply: FastifyReply) {
		const { include, page, limit } = commonInfectedListQuerySchema.parse(
			req.query,
		);
		const { data, total } = await CommonInfectedService.listCommonInfected(
			include,
			page,
			limit,
		);
		return reply.paginated(data, { page, limit, total });
	}

	static async getCommonInfectedBySlug(
		req: FastifyRequest,
		reply: FastifyReply,
	) {
		const { include } = commonInfectedDetailQuerySchema.parse(req.query);
		const { slug } = commonInfectedDetailParamsSchema.parse(req.params);
		const commonInfected =
			await CommonInfectedService.getCommonInfectedBySlug(slug, include);
		return reply.send(commonInfected);
	}
}
