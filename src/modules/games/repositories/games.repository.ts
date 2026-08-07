import { DatabaseConnection } from "@/config";
import { Prisma } from "@/generated/prisma/client";
import { GameDetailInclude, GameListInclude } from "../contracts/game-includes";

export class GamesRepository {
	private db = DatabaseConnection.getInstance().getPrismaClient();
	private parseIncludes(
		includes: (GameListInclude | GameDetailInclude)[],
	): Prisma.GameInclude {
		const prismaIncludes: Prisma.GameInclude = {};
		for (const include of includes) {
			switch (include) {
				case "campaigns":
					prismaIncludes.campaigns = true;
					break;
				case "media":
					prismaIncludes.gameMedia = {
						include: {
							media: true,
							mediaRole: true,
						},
					};
					break;
				case "weapons":
					prismaIncludes.weapons = true;
					break;
				case "items":
					prismaIncludes.items = true;
					break;
				case "survivors":
					prismaIncludes.survivors = true;
					break;
				case "specialInfected":
					prismaIncludes.specialInfected = true;
					break;
				case "commonInfectedVariants":
					prismaIncludes.commonInfectedVariants = true;
					break;
			}
		}
		return prismaIncludes;
	}
	async findList(includes: GameListInclude[], page: number, limit: number) {
		const prismaIncludes = this.parseIncludes(includes);
		const skip = (page - 1) * limit;
		const take = limit;
		const [data, total] = await this.db.$transaction([
			this.db.game.findMany({
				include: Object.keys(prismaIncludes).length
					? prismaIncludes
					: undefined,
				skip,
				take,
			}),
			this.db.game.count(),
		]);

		return { data, total };
	}

	async findById(id: string, includes: GameDetailInclude[]) {
		const prismaIncludes = this.parseIncludes(includes);
		return this.db.game.findUnique({
			where: { id },
			include: Object.keys(prismaIncludes).length
				? prismaIncludes
				: undefined,
		});
	}

	async findBySlug(slug: string, includes: GameDetailInclude[]) {
		// TODO: The details may show summarized relations and if the user wants the full relation, it should be included in the includes
		const prismaIncludes = this.parseIncludes(includes);
		return this.db.game.findUnique({
			where: { slug },
			include: Object.keys(prismaIncludes).length
				? prismaIncludes
				: undefined,
		});
	}
}
