import "dotenv/config";
import { seedMediaRoles } from "./media-roles.seed";
import { seedMediaTypes } from "./media-types.seed";
import { seedContentSources } from "./content-source.seed";

import { DatabaseConnection } from "../../src/config";

const prisma = DatabaseConnection.getInstance().getPrismaClient();

const main = async () => {
	await seedMediaTypes(prisma);
	await seedMediaRoles(prisma);
	await seedContentSources(prisma);
};

main()
	.then(async () => {
		console.log("Seeding completed successfully.");
		await prisma.$disconnect();
		process.exit(0);
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
