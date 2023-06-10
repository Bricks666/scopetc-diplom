import { createDomain, sample } from 'effector';
import { not, pending, spread } from 'patronum';
import { SearchedFilm, filmsApi } from '@/shared/api';

const recommendations = createDomain();

export const $data = recommendations.store<SearchedFilm[]>([]);
export const $totalPages = recommendations.store<number>(0);

export const start = recommendations.event();
const requestFx = recommendations.effect(filmsApi.getRecommendations);
export const $pending = pending({ effects: [requestFx], of: 'some', });
const updateData = recommendations.event<SearchedFilm[]>();

sample({
	clock: start,
	filter: not($pending),
	target: requestFx,
});

spread({
	source: requestFx.doneData,
	targets: {
		items: updateData,
		totalPages: $totalPages,
	},
});

sample({
	clock: updateData,
	source: $data,
	filter: (_, newData) => !!newData.length,
	fn: (data, newData) => [...data, ...newData],
	target: $data,
});
