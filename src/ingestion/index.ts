import "dotenv/config";

import { runIngestion } from "./core/engine";

import { ingestionModules } from "./registry";

async function main() {
	const target = process.argv[2];

	if (!target) {
		console.error("Usage: pnpm ingest <module|all>");
		process.exit(1);
	}

	if (target === "all") {
		for (const module of ingestionModules) {
			console.log(`\n▶ Ingesting ${module.name}...`);

			await runIngestion(module);

			console.log(`✔ ${module.name} completed.`);
		}

		return;
	}

	const module = ingestionModules.find((module) => module.name === target);

	if (!module) {
		console.error(`Unknown ingestion module '${target}'.`);
		process.exit(1);
	}

	console.log(`▶ Ingesting ${module.name}...`);

	await runIngestion(module);

	console.log(`✔ ${module.name} completed.`);
}

main().catch((error) => {
	console.error(error);

	process.exit(1);
});
