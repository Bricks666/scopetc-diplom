import ky from 'ky';

let token: string | null = null;

export const instance = ky.create({
	mode: 'cors',
	credentials: 'include',
	prefixUrl: import.meta.env.VITE_API_URL || '/api',
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
			},
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
			},
		],
	},
});
