import { ApiProperty } from '@nestjs/swagger';
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
	@ApiProperty()
	declare kinopoiskId: number;

	@ApiProperty()
	declare imdbId: string | null;

	@ApiProperty()
	declare nameRu: string | null;

	@ApiProperty()
	declare nameEn: string | null;

	@ApiProperty()
	declare nameOriginal: string | null;

	@ApiProperty()
	declare posterUrl: string;

	@ApiProperty()
	declare posterUrlPreview: string;

	@ApiProperty()
	declare coverUrl: string | null;

	@ApiProperty()
	declare logoUrl: string | null;

	@ApiProperty()
	declare reviewsCount: number;

	@ApiProperty()
	declare ratingGoodReview: number | null;

	@ApiProperty()
	declare ratingGoodReviewVoteCount: number | null;

	@ApiProperty()
	declare ratingKinopoisk: number | null;

	@ApiProperty()
	declare ratingKinopoiskVoteCount: number | null;

	@ApiProperty()
	declare ratingImdb: number | null;

	@ApiProperty()
	declare ratingImdbVoteCount: number | null;

	@ApiProperty()
	declare ratingFilmCritics: number | null;

	@ApiProperty()
	declare ratingFilmCriticsVoteCount: number | null;

	@ApiProperty()
	declare ratingAwait: number | null;

	@ApiProperty()
	declare ratingAwaitCount: number | null;

	@ApiProperty()
	declare ratingRfCritics: number | null;

	@ApiProperty()
	declare ratingRfCriticsVoteCount: number | null;

	@ApiProperty()
	declare webUrl: string;

	@ApiProperty()
	declare year: number | null;

	@ApiProperty()
	declare filmLength: number | null;

	@ApiProperty()
	declare slogan: string | null;

	@ApiProperty()
	declare description: string | null;

	@ApiProperty()
	declare shortDescription: string | null;

	@ApiProperty()
	declare editorAnnotation: string | null;

	@ApiProperty()
	declare isTicketsAvailable: boolean;

	@ApiProperty()
	declare productionStatus: ProductionStatus | null;

	@ApiProperty()
	declare type: FilmType;

	@ApiProperty()
	declare ratingMpaa: string;

	@ApiProperty()
	declare ratingAgeLimits: string | null;

	@ApiProperty()
	declare hasImax: boolean | null;

	@ApiProperty()
	declare has3D: boolean | null;

	@ApiProperty()
	declare lastSync: string;

	@ApiProperty()
	declare countries: CountryDto[];

	@ApiProperty()
	declare genres: GenreDto[];

	@ApiProperty()
	declare startYear: number | null;

	@ApiProperty()
	declare endYear: number | null;

	@ApiProperty()
	declare serial?: boolean | null;

	@ApiProperty()
	declare shortFilm?: boolean | null;

	@ApiProperty()
	declare completed?: boolean | null;
}
