import { DatabaseConnection } from "@/config";
import { SpecialInfectedInclude } from "../contracts/special-infected-includes";
import { Prisma } from "@/generated/prisma/client";
import { SpecialInfectedFilters } from "../contracts/special-infected-filters";

export class SpecialInfectedRepository {
	private db = DatabaseConnection.getInstance().getPrismaClient();

	private buildEnrichedIncludes(
		include: SpecialInfectedInclude,
	): Prisma.SpecialInfectedInclude {
		switch (include) {
			case "media": {
				return {
					specialInfectedMedia: {
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

	private buildIncludes(includes: SpecialInfectedInclude[]) {
		const prismaIncludes = {};
		for (const include of includes) {
			Object.assign(prismaIncludes, this.buildEnrichedIncludes(include));
		}
		return prismaIncludes;
	}

	private buildWhere(
		filters: SpecialInfectedFilters,
	): Prisma.SpecialInfectedWhereInput {
		const where: Prisma.SpecialInfectedWhereInput = {};

		if (filters.game) {
			where.game = { slug: filters.game };
		}

		return where;
	}

	async findList(
		includes: SpecialInfectedInclude[],
		page: number,
		limit: number,
		filters: SpecialInfectedFilters,
	) {
		const prismaIncludes = this.buildIncludes(includes);
		const skip = (page - 1) * limit;
		const take = limit;
		const where = this.buildWhere(filters);
		const [data, total] = await this.db.$transaction([
			this.db.specialInfected.findMany({
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
			this.db.specialInfected.count({
				where,
			}),
		]);
		return { data, total };
	}

	async findBySlug(slug: string, includes: SpecialInfectedInclude[]) {
		const prismaIncludes = this.buildIncludes(includes);
		return this.db.specialInfected.findUnique({
			where: { slug },
			include: prismaIncludes,
		});
	}

	async findById(id: string, includes: SpecialInfectedInclude[]) {
		const prismaIncludes = this.buildIncludes(includes);
		return this.db.specialInfected.findUnique({
			where: { id },
			include: prismaIncludes,
		});
	}
}
