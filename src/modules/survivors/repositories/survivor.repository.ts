import { DatabaseConnection } from "@/config";
import { Prisma } from "@/generated/prisma/client";
import {
	SurvivorDetailInclude,
	SurvivorListInclude,
} from "../contracts/survivor-includes";
import { SurvivorListFilters } from "../contracts/survivor-filters";

export class SurvivorRepository {
	private db = DatabaseConnection.getInstance().getPrismaClient();

	private buildDefaultIncludes(): Prisma.SurvivorInclude {
		return {
			game: {
				select: { name: true, slug: true },
			},
		};
	}
	private buildEnrichedInclude(
		include: SurvivorDetailInclude,
	): Partial<Prisma.SurvivorInclude> {
		switch (include) {
			case "game": {
				return {
					game: {
						select: {
							name: true,
							slug: true,
							description: true,
							releaseDate: true,
						},
					},
				};
			}
			case "media": {
				return {
					survivorMedia: {
						include: {
							media: true,
							mediaRole: true,
						},
					},
				};
			}
			default: {
				return {};
			}
		}
	}
	private buildIncludes(
		includes: SurvivorDetailInclude[],
		isList: boolean = false,
	): Prisma.SurvivorInclude {
		const prismaIncludes = isList ? {} : this.buildDefaultIncludes();
		for (const include of includes) {
			Object.assign(prismaIncludes, this.buildEnrichedInclude(include));
		}
		return prismaIncludes;
	}
	private buildWhere(filters: SurvivorListFilters) {
		const where: Prisma.SurvivorWhereInput = {};
		if (filters.game) {
			where.game = {
				slug: filters.game,
			};
		}
		return where;
	}
	async findList(
		includes: SurvivorListInclude[],
		page: number,
		limit: number,
		filters: SurvivorListFilters,
	) {
		const prismaIncludes = this.buildIncludes(includes, true);
		const skip = (page - 1) * limit;
		const take = limit;
		const where = this.buildWhere(filters);
		const [data, total] = await this.db.$transaction([
			this.db.survivor.findMany({
				include: Object.keys(prismaIncludes).length
					? prismaIncludes
					: undefined,
				where,
				skip,
				take,
				orderBy: [
					{
						game: {
							releaseDate: "asc",
						},
					},
					{
						game: {
							id: "asc",
						},
					},
					{
						id: "asc",
					},
				],
			}),
			this.db.survivor.count({
				where,
			}),
		]);
		return { data, total };
	}
	async findBySlug(slug: string, includes: SurvivorDetailInclude[]) {
		const prismaIncludes = this.buildIncludes(includes);
		return this.db.survivor.findUnique({
			where: { slug },
			include: prismaIncludes,
		});
	}

	async findById(id: string, includes: SurvivorDetailInclude[]) {
		const prismaIncludes = this.buildIncludes(includes);
		return this.db.survivor.findUnique({
			where: { id },
			include: prismaIncludes,
		});
	}
}
