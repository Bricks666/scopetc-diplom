import { instance } from '../request';
import {
	RemovePresetParams,
	Preset,
	UpdatePresetParams,
	CreatePresetParams
} from './types';

const baseURL = 'presets';

export const getAll = (): Promise<Preset[]> => {
	return instance.get(`${baseURL}`).json();
};

export const create = (params: CreatePresetParams): Promise<Preset> => {
	return instance.post(`${baseURL}/create`, { json: params, }).json();
};

export const update = (params: UpdatePresetParams): Promise<Preset> => {
	const { id, ...body } = params;
	return instance.put(`${baseURL}/${id}/update`, { json: body, }).json();
};

export const remove = (params: RemovePresetParams): Promise<void> => {
	const { id, } = params;
	return instance.delete(`${baseURL}/${id}/remove`).json();
};
