import { FastifyPluginAsync } from "fastify";
import { CampaignController } from "../controllers/campaign.controller";

const getCampaignBySlugRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/:slug", CampaignController.getCampaignBySlug)
}

export default getCampaignBySlugRoute;