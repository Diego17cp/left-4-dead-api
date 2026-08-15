import { campaignIngestionModule } from "@/modules/campaigns/ingestion/campaign.module";
import { chapterIngestionModule } from "@/modules/chapters/ingestion/chapter.module";
import { gameIngestionModule } from "@/modules/games/ingestion/game.module";
import { survivorModule } from "@/modules/survivors/ingestion/survivor.module";
import { commonInfectedModule } from "@/modules/common-infected/ingestion/common-infected.module";

export const ingestionModules = [
  gameIngestionModule,
  campaignIngestionModule,
  chapterIngestionModule,
  survivorModule,
  commonInfectedModule
];