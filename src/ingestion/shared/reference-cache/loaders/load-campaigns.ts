import { PrismaClient } from "@/generated/prisma/client";
import { ReferenceCache } from "../reference-cache";

export const loadCampaigns = async (
	cache: ReferenceCache,
	prisma: PrismaClient,
): Promise<void> => {
	const campaigns = await prisma.campaign.findMany({
		select: {
			id: true,
			slug: true,
		},
	});

	for (const campaign of campaigns) {
		cache.set("Campaign", campaign.slug, campaign.id);
	}
}
