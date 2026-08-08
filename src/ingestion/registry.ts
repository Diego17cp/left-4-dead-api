import { campaignIngestionModule } from "@/modules/campaigns/ingestion/campaign.module";
import { gameIngestionModule } from "@/modules/games/ingestion/game.module";

export const ingestionModules = [
  gameIngestionModule,
  campaignIngestionModule
];