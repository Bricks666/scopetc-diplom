import { createDomain, sample } from 'effector';
import { and, debug, not, pending, spread } from 'patronum';
import { SearchedFilm, filmsApi } from '@/shared/api';
import { createInfinityScroll, createPagination } from '@/shared/lib';

const recommendations = createDomain();

export const pagination = createPagination({
	initialData: [] as SearchedFilm[],
	fetcher: filmsApi.getRecommendations,
	extractCurrentPage: ({ params, }) => params.page,
	hasNextPage: ({ params, result, }) => params.page < result.totalPages,
	hasPrevPage: ({ params, }) => params.page > 1,
	mapData: ({ result, }) => result.items,
	pageKey: 'page',
});

export const infinityScroll = createInfinityScroll({
	initialData: [] as SearchedFilm[],
	fetcher: filmsApi.getRecommendations,
	mapData: ({ result, }) => result.items,
	concatData: ({ data, mapped, }) => [...data, ...mapped],
	getNextParams: ({ params, result, }) => ({
		...params,
		page: Math.min(params.page + 1, result.totalPages),
	}),
	isEnd: ({ params, result, }) => params.page === result.totalPages,
});

export const $data = recommendations.store<SearchedFilm[]>([]);
export const $empty = $data.map((data) => !data.length);
export const $totalPages = recommendations.store<number>(0);
const $fetchingPage = recommendations.store<number>(1);
const $currentPage = recommendations.store<number>(0);
const $canFetch = recommendations.store(true);

export const start = recommendations.event();
const filteredStart = recommendations.event();
export const next = recommendations.event();
const filteredNext = recommendations.event();
const requestFx = recommendations.effect(filmsApi.getRecommendations);
export const $pending = pending({ effects: [requestFx], });
export const $fetching = and(not($empty), $pending);
const updateData = recommendations.event<SearchedFilm[]>();

sample({
	clock: start,
	filter: not($pending),
	target: filteredStart,
});

sample({
	clock: next,
	filter: and(not($fetching), $canFetch),
	target: filteredNext,
});

sample({
	clock: filteredNext,
	source: $fetchingPage,
	fn: (currentPage) => currentPage + 1,
	target: $fetchingPage,
});

sample({
	clock: [filteredNext, filteredStart],
	source: $fetchingPage,
	fn: (page) => ({ page, }),
	target: requestFx,
});

sample({
	clock: requestFx.doneData,
	source: $fetchingPage,
	filter: $canFetch,
	fn: (currentPage, { totalPages, }) => currentPage < totalPages,
	target: $canFetch,
});

spread({
	source: requestFx.doneData,
	targets: {
		items: updateData,
		totalPages: $totalPages,
	},
});

sample({
	clock: requestFx.done,
	source: $fetchingPage,
	target: $currentPage,
});

sample({
	clock: updateData,
	source: $data,
	filter: (_, newData) => !!newData.length,
	fn: (data, newData) => [...data, ...newData],
	target: $data,
});

debug(infinityScroll.$data);
