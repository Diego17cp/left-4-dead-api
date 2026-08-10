import { DatabaseConnection } from "@/config";
import { Prisma } from "@/generated/prisma/client";
import { CampaignDetailInclude, CampaignListInclude } from "../contracts/campaign-includes";

export class CampaignRepository {
  private db = DatabaseConnection.getInstance().getPrismaClient();
  private buildDefaultIncludes(): Prisma.CampaignInclude {
    return {
      chapters: {
        select: { name: true, slug: true }
      },
      game: {
        select: { name: true, slug: true }
      }
    };
  }
  private buildEnrichedInclude(include: CampaignDetailInclude): Partial<Prisma.CampaignInclude> {
    switch (include) {
      case "game":
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
      case "chapters":
        return {
          chapters: {
            select: {
              name: true,
              slug: true,
              chapterNumber: true,
              description: true,
            },
          },
        };
      case "media":
        return {
          campaignMedia: {
            include: {
              media: true,
              mediaRole: true,
            },
          },
        };
      default:
        return {};
    }
  }
  private buildIncludes(includes: CampaignDetailInclude[], isList: boolean = false): Prisma.CampaignInclude {
    const prismaIncludes = isList ? {} : this.buildDefaultIncludes();
    for (const include of includes) {
      Object.assign(prismaIncludes, this.buildEnrichedInclude(include));
    }
    return prismaIncludes;
  }

  async findList(includes: CampaignListInclude[], page: number, limit: number) {
    const prismaIncludes = this.buildIncludes(includes, true);
    const skip = (page - 1) * limit;
    const take = limit;
    const [data, total] = await this.db.$transaction([
      this.db.campaign.findMany({
        include: Object.keys(prismaIncludes).length
          ? prismaIncludes
          : undefined,
        skip,
        take,
      }),
      this.db.campaign.count(),
    ]);

    return { data, total };
  }

  async findBySlug(slug: string, includes: CampaignDetailInclude[]) {
    const prismaIncludes = this.buildIncludes(includes);
    return this.db.campaign.findUnique({
      where: { slug },
      include: prismaIncludes,
    });
  }

  async findById(id: string, includes: CampaignDetailInclude[]) {
    const prismaIncludes = this.buildIncludes(includes);
    return this.db.campaign.findUnique({
      where: { id },
      include: prismaIncludes,
    });
  }
}