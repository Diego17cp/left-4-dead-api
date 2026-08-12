import { IngestionModule } from "@/ingestion/core/contracts";
import { ChapterAggregate, ChapterManifest, ResolvedChapter } from "./chapter.types";
import { chapterManifestSchema } from "./chapter.schema";
import { chapterMapper } from "./chapter.mapper";
import { chapterResolver } from "./chapter.resolver";
import { chapterPersister } from "./chapter.persister";

export const chapterIngestionModule: IngestionModule<ChapterManifest, ChapterAggregate, ResolvedChapter> = {
  id: "chapter",
  name: "chapters",
  resource: "chapters",
  schema: chapterManifestSchema,
  mapper: chapterMapper,
  resolver: chapterResolver,
  persister: chapterPersister,
};