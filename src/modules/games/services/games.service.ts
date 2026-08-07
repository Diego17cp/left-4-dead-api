import { GamesRepository } from "../repositories/games.repository";
import { GameListResponseDTO } from "../dtos/game-list-response.dto";
import { GameListResponseMapper } from "../dtos/game-list-response.mapper";
import { GameResponseDTO } from "../dtos/game-response.dto";
import { GameResponseMapper } from "../dtos/game-response.mapper";
import { GameDetailInclude, GameListInclude } from "../contracts/game-includes";
import { NotFoundError } from "@/core/errors";

export class GamesService {
	private static repo = new GamesRepository();

	static async listGames(
		includes: GameListInclude[],
		page: number,
		limit: number,
	): Promise<{ data: GameListResponseDTO[]; total: number }> {
		const { data, total } = await this.repo.findList(includes, page, limit);
		return { data: GameListResponseMapper.toResponse(data), total };
	}

	static async getGameBySlug(
		slug: string,
		includes: GameDetailInclude[],
	): Promise<GameResponseDTO> {
		const game = await this.repo.findBySlug(slug, includes);
		if (!game) {
			throw new NotFoundError("Game not found");
		}
		return GameResponseMapper.toResponse(game);
	}
}
