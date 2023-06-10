import {
	ItemsResponse,
	myownServerInstalce,
	kinopoiskServerInstance
} from '../request';
import { Film, GetOneParams, SearchedFilm } from './types';

const baseURL = 'films';

export const getAll = async (): Promise<ItemsResponse<SearchedFilm>> => {
	return kinopoiskServerInstance.get(`v2.2/${baseURL}`).json();
};

export const getRecommendations = async (): Promise<
	ItemsResponse<SearchedFilm>
> => {
	return myownServerInstalce.get(`${baseURL}/recommendations`).json();
};

export const getOne = async (params: GetOneParams): Promise<Film> => {
	return kinopoiskServerInstance.get(`v2.2/${baseURL}/${params.id}`).json();
};
