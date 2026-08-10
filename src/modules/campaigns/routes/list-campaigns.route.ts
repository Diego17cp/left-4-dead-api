import { FastifyPluginAsync } from "fastify";
import { CampaignController } from "../controllers/campaign.controller";

const listCampaignsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", CampaignController.listCampaigns);
}

export default listCampaignsRoute;