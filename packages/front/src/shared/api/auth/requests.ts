import { instance } from '../request';
import { AuthResponse, LoginParams, RegistrationParams } from './types';

const baseURL = 'auth';

export const auth = () => {
	return instance.get(baseURL).json();
};

export const login = (params: LoginParams): Promise<AuthResponse> => {
	return instance.post(`${baseURL}/login`, { json: params }).json();
};

export const registration = (
	params: RegistrationParams
): Promise<AuthResponse> => {
	return instance.post(`${baseURL}/registration`, { json: params }).json();
};
