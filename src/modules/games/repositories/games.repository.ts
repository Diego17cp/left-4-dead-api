import { DatabaseConnection } from "@/config";
import { Prisma } from "@/generated/prisma/client";
import {
	GAME_DETAIL_DEFAULT_INCLUDES,
	GameDetailInclude,
	GameListInclude,
} from "../contracts/game-includes";

export class GamesRepository {
	private db = DatabaseConnection.getInstance().getPrismaClient();
	private buildDefaultIncludes(): Prisma.GameInclude {
		return {
			campaigns: {
				select: { name: true, slug: true },
			},
			survivors: {
				select: { name: true, slug: true },
			},
			specialInfected: {
				select: { name: true, slug: true },
			},
			commonInfectedVariants: {
				select: { name: true, slug: true },
			},
		};
	}
	private buildEnrichedInclude(
		include: GameDetailInclude,
	): Partial<Prisma.GameInclude> {
		switch (include) {
			case "campaigns":
				return {
					campaigns: {
						select: {
							name: true,
							slug: true,
							description: true,
							releaseDate: true,
						},
					},
				};
			case "survivors":
				return {
					survivors: {
						select: {
							name: true,
							slug: true,
							biography: true,
							gender: true,
							age: true,
							occupation: true,
						},
					},
				};
			case "media":
				return {
					gameMedia: {
						include: {
							media: true,
							mediaRole: true,
						},
					},
				};
			case "specialInfected":
				return {
					specialInfected: {
						select: { name: true, slug: true, description: true },
					},
				};
			case "commonInfectedVariants":
				return {
					commonInfectedVariants: {
						select: { name: true, slug: true, specialTrait: true },
					},
				};
			default:
				return {};
		}
	}
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
		const prismaIncludes = this.buildDefaultIncludes();
		for (const include of includes) {
			Object.assign(prismaIncludes, this.buildEnrichedInclude(include));
		}
		return this.db.game.findUnique({
			where: { id },
			include: prismaIncludes,
		});
	}

	async findBySlug(slug: string, includes: GameDetailInclude[]) {
		const prismaIncludes = this.buildDefaultIncludes();
		for (const include of includes) {
			Object.assign(prismaIncludes, this.buildEnrichedInclude(include));
		}
		return this.db.game.findUnique({
			where: { slug },
			include: prismaIncludes,
		});
	}
}
