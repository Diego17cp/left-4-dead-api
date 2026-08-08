import { ResourceMapper } from "@/ingestion/core/contracts/resource-mapper";
import { CampaignAggregate, CampaignManifest } from "./campaign.types";

export const campaignMapper: ResourceMapper<CampaignManifest, CampaignAggregate> = {
	async map(manifest) {
		return {
			gameSlug: manifest.game,
			contentSourceName: manifest.contentSource,
			name: manifest.name,
			slug: manifest.slug,
			description: manifest.description ?? null,
			releaseDate: manifest.releaseDate ? new Date(manifest.releaseDate) : null,
			media: manifest.media?.map(m => ({
				role: m.role,
				file: m.file,
				mimeType: m.type
			})) ?? []
		};
	},
};
