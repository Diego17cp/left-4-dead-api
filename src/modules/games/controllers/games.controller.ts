import { FastifyReply, FastifyRequest } from "fastify";
import { GamesService } from "../services/games.service";
import { z } from "zod";
import {
	GAME_LIST_INCLUDES,
	GameListInclude,
	GameDetailInclude,
	GAME_DETAIL_INCLUDES,
} from "../contracts/game-includes";

const listQuerySchema = z
	.object({
		include: z.string().optional(),
	})
	.extend({
		page: z.coerce.number().default(1),
		limit: z.coerce.number().default(15),
	});

const detailParamsSchema = z.object({
	slug: z.string(),
});

const detailQuerySchema = z.object({
	include: z.string().optional(),
});

export class GamesController {
	static async listGames(req: FastifyRequest, reply: FastifyReply) {
		const { include, page, limit } = listQuerySchema.parse(req.query);
		const rawInclude = include ? include.split(",") : [];
		const validIncludes = rawInclude.filter((inc): inc is GameListInclude =>
			(GAME_LIST_INCLUDES as readonly string[]).includes(inc),
		);
		const { data, total } = await GamesService.listGames(
			validIncludes,
			page,
			limit,
		);
		return reply.paginated(data, { page, limit, total });
	}
	static async getGameBySlug(req: FastifyRequest, reply: FastifyReply) {
		const { include } = detailQuerySchema.parse(req.query);
		const { slug } = detailParamsSchema.parse(req.params);
		const rawInclude = include ? include.split(",") : [];
		const validIncludes = rawInclude.filter(
			(inc): inc is GameDetailInclude =>
				(GAME_DETAIL_INCLUDES as readonly string[]).includes(inc),
		);
		const game = await GamesService.getGameBySlug(slug, validIncludes);
		return reply.send(game);
	}
}
