import { scanResources } from "./scanner";
import { uploadFile } from "./uploader";

const main = async () => {
  const files = await scanResources();
  console.log(`Found ${files.length} media files.`);
  for (const file of files) {
    console.log(`Uploading ${file.storagePath} (${file.mimeType})`);
    await uploadFile(file);
  }
  console.log("Storage sync completed successfully.");
};

main().catch(error => {
  console.error("Storage sync failed:", error);
  process.exit(1);
});
