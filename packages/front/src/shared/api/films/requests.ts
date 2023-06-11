import {
	ItemsResponse,
	myownServerInstalce,
	kinopoiskServerInstance
} from '../request';
import { Film, GetOneParams, SearchFilmQuery, SearchedFilm } from './types';

const baseURL = 'films';

export const getAll = async (): Promise<ItemsResponse<SearchedFilm>> => {
	return kinopoiskServerInstance.get(`v2.2/${baseURL}`).json();
};

export const getRecommendations = async (
	params: SearchFilmQuery
): Promise<ItemsResponse<SearchedFilm>> => {
	const query = new URLSearchParams(
		params as unknown as Record<string, string>
	);
	return myownServerInstalce
		.get(`${baseURL}/recommendations`, { searchParams: query, })
		.json();
};

export const getOne = async (params: GetOneParams): Promise<Film> => {
	return kinopoiskServerInstance.get(`v2.2/${baseURL}/${params.id}`).json();
};
