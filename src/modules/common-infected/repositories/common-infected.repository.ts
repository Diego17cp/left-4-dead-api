import { DatabaseConnection } from "@/config";
import { Prisma } from "@/generated/prisma/client";
import { CommonInfectedInclude } from "../contracts/common-infected-includes";
import { CommonInfectedResponseMapper } from "../dtos/common-infected-response.mapper";

export class CommonInfectedRepository {
	private db = DatabaseConnection.getInstance().getPrismaClient();

	private buildEnrichedIncludes(
		include: CommonInfectedInclude,
	): Prisma.CommonInfectedVariantInclude {
		switch (include) {
			case "media": {
				return {
					commonInfectedVariantMedia: {
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
		includes: CommonInfectedInclude[],
	): Prisma.CommonInfectedVariantInclude {
		const prismaIncludes = {};
		for (const include of includes) {
			Object.assign(prismaIncludes, this.buildEnrichedIncludes(include));
		}
		return prismaIncludes;
	}

	async findList(
		includes: CommonInfectedInclude[],
		page: number,
		limit: number,
	) {
		const prismaIncludes = this.buildIncludes(includes);
		const skip = (page - 1) * limit;
		const take = limit;
		const [data, total] = await this.db.$transaction([
			this.db.commonInfectedVariant.findMany({
				include: Object.keys(prismaIncludes).length
					? prismaIncludes
					: undefined,
				skip,
				take,
				orderBy: { name: "asc" },
			}),
			this.db.commonInfectedVariant.count(),
		]);
		return { data, total };
	}

	async findBySlug(slug: string, includes: CommonInfectedInclude[]) {
		const prismaIncludes = this.buildIncludes(includes);
		return this.db.commonInfectedVariant.findUnique({
			where: { slug },
			include: prismaIncludes,
		});
	}

	async findById(id: string, includes: CommonInfectedInclude[]) {
		const prismaIncludes = this.buildIncludes(includes);
		return this.db.commonInfectedVariant.findUnique({
			where: { id },
			include: prismaIncludes,
		});
	}
}
