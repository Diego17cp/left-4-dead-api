export interface GameManifest {
	slug: string;
	name: string;
	description?: string;
	releaseDate?: string;
	media: GameMediaManifest[];
}

export interface GameMediaManifest {
	role: string;
	file: string;
	type: string;
}

export interface GameAggregate {
	game: {
		slug: string;
		name: string;
		description: string | null;
		releaseDate: Date | null;
	};

	media: GameMediaAggregate[];
}

export interface GameMediaAggregate {
	role: string;
	file: string;
	mimeType: string;
}
