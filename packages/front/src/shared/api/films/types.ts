export interface Film {
	readonly id: number;
	readonly title: string;
	readonly description: string;
	readonly releaseDate: string;
	readonly preview: string;
	readonly video: string;
	readonly manifest: string;
}

export interface GetOneParams {
	readonly id: number;
}
