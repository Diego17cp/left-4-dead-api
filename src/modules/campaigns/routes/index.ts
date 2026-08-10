import { FastifyPluginAsync } from "fastify";
import listCampaignsRoute from "./list-campaigns.route";
import getCampaignBySlugRoute from "./get-campaign.route";

const campaignsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(listCampaignsRoute);
  fastify.register(getCampaignBySlugRoute);
}

export default campaignsRoutes;