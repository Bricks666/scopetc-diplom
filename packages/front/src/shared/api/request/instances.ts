import ky from 'ky';
import { API_KEY, KINOPOISK_API_URL, MYOWN_API_URL } from '@/shared/config';

let token: string | null = null;

console.log(MYOWN_API_URL);
export const myownServerInstalce = ky.create({
	mode: 'cors',
	credentials: 'include',
	prefixUrl: MYOWN_API_URL,
	hooks: {
		beforeRequest: [
			(request) => {
				if (!token) {
					return;
				}
				if (request.headers.get('authorization')) {
					return;
				}

				request.headers.set('authorization', `Bearer ${token}`);
			}
		],
		afterResponse: [
			async (_request, _, response) => {
				if (!response.ok) {
					return;
				}

				const body = await response.json();
				if (!('tokens' in body)) {
					return;
				}

				token = body.tokens.accessToken;
			}
		],
	},
});

export const kinopoiskServerInstance = ky.create({
	mode: 'cors',
	prefixUrl: KINOPOISK_API_URL,
	headers: {
		'X-API-KEY': API_KEY,
	},
});
