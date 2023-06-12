import { join } from 'node:path';
import { API_KEY, EXTERNAL_API_URl } from '../const';

export const request = async <T>(
	url: string,
	options: globalThis.RequestInit = {}
): Promise<T> => {
	const requestURL = join(EXTERNAL_API_URl, url);
	const response = await fetch(requestURL, {
		...options,
		mode: 'cors',
		headers: {
			...options.headers,
			'X-API-KEY': API_KEY,
		},
	});

	if (response.ok) {
		return response.json();
	}
};
