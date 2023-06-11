import { ExtractValueType } from '@/shared/types';

export const PRODUCTION_STATUS = {
	FILMING: 'FILMING',
	PRE_PRODUCTION: 'PRE_PRODUCTION',
	COMPLETED: 'COMPLETED',
	ANNOUNCED: 'ANNOUNCED',
	UNKNOWN: 'UNKNOWN',
	POST_PRODUCTION: 'POST_PRODUCTION',
} as const;

export const FILM_TYPE = {
	FILM: 'Фильмы',
	VIDEO: 'Видео',
	TV_SERIES: 'Сериалы',
	MINI_SERIES: 'Мини сериалы',
	TV_SHOW: 'ТВ-шоу',
} as const;

export type ProductionStatus = ExtractValueType<typeof PRODUCTION_STATUS>;
export type FilmType = ExtractValueType<typeof FILM_TYPE>;

export interface Country {
	readonly id: number;
	readonly country: string;
}

export interface Genre {
	readonly id: number;
	readonly genre: string;
}

export interface FilmCountry extends Pick<Country, 'country'> {}
export interface FilmGenre extends Pick<Genre, 'genre'> {}

export interface Film {
	readonly kinopoiskId: number;
	readonly imdbId: string | null;
	readonly nameRu: string | null;
	readonly nameEn: string | null;
	readonly nameOriginal: string | null;
	readonly posterUrl: string;
	readonly posterUrlPreview: string;
	readonly coverUrl: string | null;
	readonly logoUrl: string | null;
	readonly reviewsCount: number;
	readonly ratingGoodReview: number | null;
	readonly ratingGoodReviewVoteCount: number | null;
	readonly ratingKinopoisk: number | null;
	readonly ratingKinopoiskVoteCount: number | null;
	readonly ratingImdb: number | null;
	readonly ratingImdbVoteCount: number | null;
	readonly ratingFilmCritics: number | null;
	readonly ratingFilmCriticsVoteCount: number | null;
	readonly ratingAwait: number | null;
	readonly ratingAwaitCount: number | null;
	readonly ratingRfCritics: number | null;
	readonly ratingRfCriticsVoteCount: number | null;
	readonly webUrl: string;
	readonly year: number | null;
	readonly filmLength: number | null;
	readonly slogan: string | null;
	readonly description: string | null;
	readonly shortDescription: string | null;
	readonly editorAnnotation: string | null;
	readonly isTicketsAvailable: boolean;
	readonly productionStatus: ProductionStatus | null;
	readonly type: FilmType;
	readonly ratingMpaa: string;
	readonly ratingAgeLimits: string | null;
	readonly hasImax: boolean | null;
	readonly has3D: boolean | null;
	readonly lastSync: string;
	readonly countries: FilmCountry[];
	readonly genres: FilmGenre[];
	readonly startYear: number | null;
	readonly endYear: number | null;
	readonly serial?: boolean | null;
	readonly shortFilm?: boolean | null;
	readonly completed?: boolean | null;
}

export interface SearchedFilm
	extends Pick<
		Film,
		| 'kinopoiskId'
		| 'imdbId'
		| 'nameRu'
		| 'nameEn'
		| 'nameOriginal'
		| 'countries'
		| 'genres'
		| 'ratingKinopoisk'
		| 'ratingImdb'
		| 'year'
		| 'type'
		| 'posterUrl'
		| 'posterUrlPreview'
	> {}

export const SEARCH_ORDER = {
	RATING: 'Рейтинг',
	NUM_VOTE: 'Число голосов',
	YEAR: 'Год',
} as const;

export const SEARCH_FILM_TYPE = {
	FILM: 'Фильмы',
	TV_SERIES: 'Сериалы',
	MINI_SERIES: 'Мини сериалы',
	TV_SHOW: 'ТВ-шоу',
	ALL: 'Все',
} as const;

export type SearchFilmType = ExtractValueType<typeof SEARCH_FILM_TYPE>;
export type SearchOrder = ExtractValueType<typeof SEARCH_ORDER>;

export interface SearchFilmQuery {
	readonly page: number;
	readonly countries?: number[];
	readonly genres?: number[];
	readonly order?: SearchOrder;
	readonly type?: SearchFilmType;
	readonly ratingFrom?: number;
	readonly ratingTo?: number;
	readonly yearFrom?: number;
	readonly yearTo?: number;
}

export interface Filters {
	readonly genres: Genre[];
	readonly countries: Country[];
}

export interface GetOneParams {
	readonly id: number;
}
