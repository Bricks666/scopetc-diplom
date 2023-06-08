/* eslint-disable no-unreachable */
/* eslint-disable sonarjs/no-duplicate-string */
import { instance } from '../request';
import { Film, GetOneParams } from './types';

const baseURL = 'films';

export const getAll = async (): Promise<Film[]> => {
	return instance.get(baseURL).json();
};

export const getPromo = async (): Promise<Film[]> => {
	return instance.get(`${baseURL}/random`).json();
};

export const getOne = async (params: GetOneParams): Promise<Film> => {
	return instance.get(`${baseURL}/${params.id}`).json();
};
