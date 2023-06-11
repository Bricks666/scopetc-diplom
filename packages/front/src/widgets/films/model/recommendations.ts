// import { createDomain } from 'effector';
import { SearchedFilm, filmsApi } from '@/shared/api';
import { createInfinityScroll } from '@/shared/lib';

// const recommendations = createDomain();

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
