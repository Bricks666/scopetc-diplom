import { PickType } from '@nestjs/swagger';
import { FilmDto } from './film.dto';

export class SearchedFilmDto extends PickType(FilmDto, [
	'kinopoiskId',
	'imdbId',
	'nameEn',
	'nameOriginal',
	'nameRu',
	'ratingKinopoisk',
	'ratingImdb',
	'posterUrl',
	'posterUrlPreview',
	'year',
	'type',
	'genres',
	'countries'
]) {}
