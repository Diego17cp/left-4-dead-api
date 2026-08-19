import { DatabaseConnection } from "@/config";
import { ReferenceCache } from "./reference-cache"
import { loadCampaigns, loadContentSources, loadGames } from "./loaders";
import { loadItemCategories } from "./loaders/load-item-categories";

export const createReferenceCache = async () => {
  const prisma = DatabaseConnection.getInstance().getPrismaClient();
  const cache = new ReferenceCache();

  cache.register(
    "games",
    cache => loadGames(cache, prisma),
  );

  cache.register(
    "campaigns",
    cache => loadCampaigns(cache, prisma),
  );

  cache.register(
    "contentSources",
    cache => loadContentSources(cache, prisma),
  );

  cache.register(
    "itemCategories",
    cache => loadItemCategories(cache, prisma),
  )

  await cache.loadAll();

  return cache;
}