import { ExtractValueType } from '@/shared/types';
import { CountryDto } from './country.dto';
import { GenreDto } from './genre.dto';

export const PRODUCTION_STATUS = {
	FILMING: 'FILMING',
	PRE_PRODUCTION: 'PRE_PRODUCTION',
	COMPLETED: 'COMPLETED',
	ANNOUNCED: 'ANNOUNCED',
	UNKNOWN: 'UNKNOWN',
	POST_PRODUCTION: 'POST_PRODUCTION',
} as const;

export const FILM_TYPE = {
	FILM: 'FILM',
	VIDEO: 'VIDEO',
	TV_SERIES: 'TV_SERIES',
	MINI_SERIES: 'MINI_SERIES',
	TV_SHOW: 'TV_SHOW',
} as const;

export type ProductionStatus = ExtractValueType<typeof PRODUCTION_STATUS>;
export type FilmType = ExtractValueType<typeof FILM_TYPE>;

export class FilmDto {
	declare kinopoiskId: number;

	declare imdbId: string | null;

	declare nameRu: string | null;

	declare nameEn: string | null;

	declare nameOriginal: string | null;

	declare posterUrl: string;

	declare posterUrlPreview: string;

	declare coverUrl: string | null;

	declare logoUrl: string | null;

	declare reviewsCount: number;

	declare ratingGoodReview: number | null;

	declare ratingGoodReviewVoteCount: number | null;

	declare ratingKinopoisk: number | null;

	declare ratingKinopoiskVoteCount: number | null;

	declare ratingImdb: number | null;

	declare ratingImdbVoteCount: number | null;

	declare ratingFilmCritics: number | null;

	declare ratingFilmCriticsVoteCount: number | null;

	declare ratingAwait: number | null;

	declare ratingAwaitCount: number | null;

	declare ratingRfCritics: number | null;

	declare ratingRfCriticsVoteCount: number | null;

	declare webUrl: string;

	declare year: number | null;

	declare filmLength: number | null;

	declare slogan: string | null;

	declare description: string | null;

	declare shortDescription: string | null;

	declare editorAnnotation: string | null;

	declare isTicketsAvailable: boolean;

	declare productionStatus: ProductionStatus | null;

	declare type: FilmType;

	declare ratingMpaa: string;

	declare ratingAgeLimits: string | null;

	declare hasImax: boolean | null;

	declare has3D: boolean | null;

	declare lastSync: string;

	declare countries: CountryDto[];

	declare genres: GenreDto[];

	declare startYear: number | null;

	declare endYear: number | null;

	declare serial?: boolean | null;

	declare shortFilm?: boolean | null;

	declare completed?: boolean | null;
}
