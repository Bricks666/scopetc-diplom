import { ItemsResponse, myownServerInstalce } from '../request';
import { Film, GetOneParams, SearchedFilm } from './types';

const baseURL = 'films';

export const getAll = async (): Promise<ItemsResponse<SearchedFilm>> => {
	return myownServerInstalce.get(baseURL).json();
};

export const getRecommendations = async (): Promise<
	ItemsResponse<SearchedFilm>
> => {
	return myownServerInstalce.get(`${baseURL}/recommendations`).json();
};

export const getOne = async (params: GetOneParams): Promise<Film> => {
	return myownServerInstalce.get(`${baseURL}/${params.id}`).json();
};
