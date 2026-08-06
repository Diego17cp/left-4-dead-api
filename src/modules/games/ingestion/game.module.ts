import { IngestionModule } from "@/ingestion/core/contracts/ingestion-module";
import { GameAggregate, GameManifest } from "./game.types";
import { gameManifestSchema } from "./game.schema";
import { gameMapper } from "./game.mapper";
import { gamePersister } from "./game.persister";

export const gameIngestionModule: IngestionModule<GameManifest, GameAggregate> = {
	name: "games",
	resource: "games",
	schema: gameManifestSchema,
	mapper: gameMapper,
	persister: gamePersister,
};
