export interface MediaLike {
  id: string;
  storagePath: string;
  filename: string;
  mimeType: string;
  fileSize: number | null;
  width: number | null;
  height: number | null;
  duration: number | null;
}

export interface MediaRelationLike {
  displayOrder: number;
  mediaRole: {
    name: string;
  };
  media: MediaLike;
}