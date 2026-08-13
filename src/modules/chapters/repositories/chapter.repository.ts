import { DatabaseConnection } from "@/config";
import { Prisma } from "@/generated/prisma/client";
import {
	ChapterDetailInclude,
	ChapterListInclude,
} from "../contracts/chapter-includes";
import { ChapterListFilters } from "../contracts/chapter-filters";

export class ChapterRepository {
	private db = DatabaseConnection.getInstance().getPrismaClient();

	private buildDefaultIncludes(): Prisma.ChapterInclude {
		return {
			campaign: {
				select: { name: true, slug: true },
			},
		};
	}
	private buildEnrichedInclude(
		include: ChapterDetailInclude,
	): Partial<Prisma.ChapterInclude> {
		switch (include) {
			case "campaign": {
				return {
					campaign: {
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
					chapterMedia: {
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
		includes: ChapterDetailInclude[],
		isList: boolean = false,
	): Prisma.ChapterInclude {
		const prismaIncludes = isList ? {} : this.buildDefaultIncludes();
		for (const include of includes) {
			Object.assign(prismaIncludes, this.buildEnrichedInclude(include));
		}
		return prismaIncludes;
	}
  private buildWhere(filters: ChapterListFilters) {
    const where: Prisma.ChapterWhereInput = {};
    if (filters.campaign) {
      where.campaign = {
        slug: filters.campaign,
      };
    }
    if (filters.game) {
      where.campaign = {
        game: {
          slug: filters.game,
        },
      };
    }
    return where;
  }

	async findList(
		includes: ChapterListInclude[],
		page: number,
		limit: number,
		filters: ChapterListFilters
	) {
		const prismaIncludes = this.buildIncludes(includes, true);
		const skip = (page - 1) * limit;
		const take = limit;
		const where = this.buildWhere(filters);
		const [data, total] = await this.db.$transaction([
			this.db.chapter.findMany({
				include: Object.keys(prismaIncludes).length
					? prismaIncludes
					: undefined,
				where,
				skip,
				take,
				orderBy: [
          {
            campaign: {
              game: {
                releaseDate: "asc"
              }
            }
          },
          {
            campaign: {
              id: "asc",
            }
          },
          {
            chapterNumber: "asc"
          }
        ],
			}),
			this.db.chapter.count({ where }),
		]);
		return { data, total };
	}

	async findBySlug(slug: string, includes: ChapterDetailInclude[]) {
		const prismaIncludes = this.buildIncludes(includes);
		return this.db.chapter.findUnique({
			where: { slug },
			include: prismaIncludes,
		});
	}

	async findById(id: string, includes: ChapterDetailInclude[]) {
		const prismaIncludes = this.buildIncludes(includes);
		return this.db.chapter.findUnique({
			where: { id },
			include: prismaIncludes,
		});
	}
}
