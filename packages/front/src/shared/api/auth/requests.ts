import { myownServerInstalce } from '../request';
import { AuthResponse, LoginParams, RegistrationParams } from './types';

const baseURL = 'auth';

export const auth = (): Promise<AuthResponse> => {
	return myownServerInstalce.get(baseURL).json();
};

export const login = (params: LoginParams): Promise<AuthResponse> => {
	return myownServerInstalce.post(`${baseURL}/login`, { json: params, }).json();
};

export const registration = (
	params: RegistrationParams
): Promise<AuthResponse> => {
	return myownServerInstalce
		.post(`${baseURL}/registration`, { json: params, })
		.json();
};
