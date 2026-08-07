import { storageResolver } from "../storage/storage-resolver";
import { MediaLike } from "./media.types";

export class MediaMapper {
  static toDto(media: MediaLike) {
    return {
      id: media.id,
      filename: media.filename,
      mimeType: media.mimeType,
      width: media.width,
      height: media.height,
      duration: media.duration,
      fileSize: media.fileSize,
      storagePath: media.storagePath,
      url: storageResolver.publicUrl(media.storagePath),
    }
  };
}