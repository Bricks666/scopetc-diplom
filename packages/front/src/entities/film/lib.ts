import { FilmGenre } from '@/shared/api';

export const concatGenres = (genres: FilmGenre[]): string => {
	return genres.map(({ genre, }) => genre).join(', ');
};
