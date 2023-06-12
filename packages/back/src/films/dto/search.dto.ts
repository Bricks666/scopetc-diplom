import { ApiProperty } from '@nestjs/swagger';
import { ExtractValueType } from '@/shared/types';

export const SEARCH_FILM_TYPE = {
	FILM: 'FILM',
	TV_SERIES: 'TV_SERIES',
	MINI_SERIES: 'MINI_SERIES',
	TV_SHOW: 'TV_SHOW',
	ALL: 'ALL',
} as const;

export type SearchFilmType = ExtractValueType<typeof SEARCH_FILM_TYPE>;
export const SEARCH_ORDER = {
	RATING: 'RATING',
	NUM_VOTE: 'NUM_VOTE',
	YEAR: 'YEAR',
} as const;
export type SearchOrder = ExtractValueType<typeof SEARCH_ORDER>;

export class SearchDto {
	@ApiProperty({ required: false, })
	declare countries?: number[];

	@ApiProperty({ required: false, })
	declare genres?: number[];

	@ApiProperty({ required: false, default: 'RATING', enum: SEARCH_ORDER, })
	declare order?: SearchOrder;

	@ApiProperty({ required: false, default: 'ALL', enum: SEARCH_FILM_TYPE, })
	declare type?: SearchFilmType;

	@ApiProperty({ required: false, default: 0, })
	declare ratingFrom?: number;

	@ApiProperty({ required: false, default: 10, })
	declare ratingTo?: number;

	@ApiProperty({ required: false, default: 1000, })
	declare yearFrom?: number;

	@ApiProperty({ required: false, default: 3000, })
	declare yearTo?: number;

	@ApiProperty({ required: false, })
	declare keyword?: string;

	@ApiProperty({ required: false, default: 1, })
	declare page?: number;
}
