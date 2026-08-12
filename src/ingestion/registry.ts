import { campaignIngestionModule } from "@/modules/campaigns/ingestion/campaign.module";
import { chapterIngestionModule } from "@/modules/chapters/ingestion/chapter.module";
import { gameIngestionModule } from "@/modules/games/ingestion/game.module";

export const ingestionModules = [
  gameIngestionModule,
  campaignIngestionModule,
  chapterIngestionModule
];