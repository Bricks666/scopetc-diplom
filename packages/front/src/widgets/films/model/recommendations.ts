import { type FetchingStatus } from '@farfetched/core';

import {
	AsyncResult,
	Event,
	Store,
	createDomain,
	createEffect,
	createEvent,
	createStore,
	sample
} from 'effector';
import { and, debug, empty, not, pending, reshape, spread } from 'patronum';
import { SearchedFilm, filmsApi } from '@/shared/api';

const recommendations = createDomain();

// Преобразовать потом в фабрику для пагинации или бесконечного скрола

export interface ParamsAndResult<Params, Result> {
	readonly params: Params;
	readonly result: AsyncResult<Result>;
}

export interface CreatePaginationOptions<
	Params,
	Data,
	FetcherData,
	MapData extends Data,
	PageKey extends keyof Required<Params>
> {
	readonly initialData: Data;
	readonly fetcher: (params: Params) => FetcherData;
	readonly mapData: (options: ParamsAndResult<Params, FetcherData>) => MapData;
	readonly hasNextPage: (
		options: ParamsAndResult<Params, FetcherData>
	) => boolean;
	readonly hasPrevPage: (
		options: ParamsAndResult<Params, FetcherData>
	) => boolean;
	readonly extractCurrentPage: (
		options: ParamsAndResult<Params, FetcherData>
	) => number;
	readonly pageKey: PageKey;
}

const createPagination = <
	Params,
	Data,
	FetcherData,
	MapData extends Data,
	PageKey extends keyof Params
>(
		options: CreatePaginationOptions<Params, Data, FetcherData, MapData, PageKey>
	) => {
	const {
		fetcher,
		initialData,
		mapData,
		hasNextPage,
		extractCurrentPage,
		hasPrevPage,
		pageKey,
	} = options;

	const requestFx = createEffect(fetcher);

	const $data = createStore<MapData>(initialData as MapData);
	const $error = createStore<any>(null);

	const $lastParams = createStore<Params | null>(null);
	const $hasParams = not(empty($lastParams));
	const updateLastParams = createEvent<ParamsAndResult<Params, FetcherData>>();

	const $status = createStore<FetchingStatus>('initial');
	const { $failed, $initial, $pending, $succeeded, } = reshape({
		source: $status,
		shape: {
			$initial: (status) => status === 'initial',
			$pending: (status) => status === 'pending',
			$failed: (status) => status === 'fail',
			$succeeded: (status) => status === 'done',
		},
	});

	const $currentPage = createStore(0);
	const $hasNextPage = createStore(true);
	const $hasPrevPage = createStore(false);
	const updateCurrentPage = createEvent<ParamsAndResult<Params, FetcherData>>();
	const checkExistingPage = createEvent<ParamsAndResult<Params, FetcherData>>();

	const start = createEvent<Params>();
	const next = createEvent();
	const prev = createEvent();
	const specificPage = createEvent<number>();

	sample({
		clock: start,
		filter: not($pending),
		target: [$currentPage.reinit!, requestFx],
	});

	sample({
		clock: requestFx.done as Event<ParamsAndResult<Params, FetcherData>>,
		target: [updateLastParams, updateCurrentPage, checkExistingPage],
	});

	sample({
		clock: updateLastParams,
		fn: ({ params, }) => params,
		target: $lastParams,
	});

	sample({
		clock: updateCurrentPage,
		fn: extractCurrentPage,
		target: $currentPage,
	});

	sample({
		clock: checkExistingPage,
		fn: hasNextPage,
		target: $hasNextPage,
	});

	sample({
		clock: checkExistingPage,
		fn: hasPrevPage,
		target: $hasPrevPage,
	});

	sample({
		clock: requestFx.done,
		fn: mapData,
		target: $data,
	});

	sample({
		clock: next,
		source: { page: $currentPage, params: $lastParams, },
		filter: and($hasNextPage, not($pending), $hasParams),
		fn: ({ page, params, }) => ({ ...params!, [pageKey]: page + 1, }),
		target: requestFx,
	});

	sample({
		clock: prev,
		source: { page: $currentPage, params: $lastParams, },
		filter: and($hasPrevPage, not($pending), $hasParams),
		fn: ({ page, params, }) => ({ ...params!, [pageKey]: page - 1, }),
		target: requestFx,
	});

	sample({
		clock: specificPage,
		source: $lastParams,
		filter: and(not($pending), $hasParams),
		fn: (params, page) => ({ ...params!, [pageKey]: page, }),
		target: requestFx,
	});

	sample({
		clock: requestFx,
		fn: () => 'pending' as FetchingStatus,
		target: $status,
	});

	sample({
		clock: requestFx.fail,
		fn: () => 'fail' as FetchingStatus,
		target: $status,
	});

	sample({
		clock: requestFx.done,
		fn: () => 'done' as FetchingStatus,
		target: $status,
	});

	return {
		start,
		next,
		$data,
		$error,
		$status,
		$failed,
		$initial,
		$pending,
		$succeeded,
	};
};

export interface CreateInfinityScrollOptions<
	Params,
	Data,
	FetcherData,
	MappedData extends Data
> {
	readonly initialData: Data | MappedData;
	readonly fetcher: (params: Params) => FetcherData;
	readonly mapData: (
		options: ParamsAndResult<Params, FetcherData>
	) => MappedData;
	readonly getNextParams: (
		options: ParamsAndResult<Params, FetcherData>
	) => Params;
	readonly isEnd: (options: ParamsAndResult<Params, FetcherData>) => boolean;
	readonly concatData: ({
		data,
		mapped,
	}: {
		data: MappedData;
		mapped: MappedData;
	}) => MappedData;
}

const createInfinityScroll = <
	Params,
	Data,
	FetcherData,
	MappedData extends Data
>(
		options: CreateInfinityScrollOptions<Params, Data, FetcherData, MappedData>
	) => {
	const { fetcher, initialData, mapData, getNextParams, isEnd, concatData, } =
		options;

	const requestFx = createEffect(fetcher);

	const $data = createStore<MappedData>(initialData as MappedData);
	const $error = createStore<any>(null);
	const dataMapped = createEvent<MappedData>();
	const dataConcatenated = createEvent<MappedData>();

	const $nextParams = createStore<Params | null>(null);
	const extractNextParams = createEvent<ParamsAndResult<Params, FetcherData>>();

	const $status = createStore<FetchingStatus>('initial');
	const { $failed, $initial, $pending, $succeeded, } = reshape({
		source: $status,
		shape: {
			$initial: (status) => status === 'initial',
			$pending: (status) => status === 'pending',
			$failed: (status) => status === 'fail',
			$succeeded: (status) => status === 'done',
		},
	});

	const $ended = createStore(false);
	const checkEnding = createEvent<ParamsAndResult<Params, FetcherData>>();

	const start = createEvent<Params>();
	const next = createEvent();

	sample({
		clock: start,
		filter: not($pending),
		target: [$data.reinit!, requestFx],
	});

	sample({
		clock: requestFx.done,
		target: [extractNextParams, checkEnding],
	});

	sample({
		clock: checkEnding,
		fn: isEnd,
		target: $ended,
	});

	sample({
		clock: extractNextParams,
		fn: getNextParams,
		target: $nextParams,
	});

	sample({
		clock: requestFx.done,
		fn: mapData,
		target: dataMapped,
	});

	sample({
		clock: dataMapped,
		source: $data,
		fn: (data, mapped) => concatData({ data, mapped, }),
		target: dataConcatenated,
	});

	sample({
		clock: dataConcatenated,
		target: $data,
	});

	sample({
		clock: next,
		source: $nextParams as Store<Params>,
		filter: and(not($pending), not($ended)),
		target: requestFx,
	});

	sample({
		clock: requestFx,
		fn: () => 'pending' as FetchingStatus,
		target: $status,
	});

	sample({
		clock: requestFx.fail,
		fn: () => 'fail' as FetchingStatus,
		target: $status,
	});

	sample({
		clock: requestFx.done,
		fn: () => 'done' as FetchingStatus,
		target: $status,
	});

	return {
		start,
		next,
		$data,
		$error,
		$status,
		$failed,
		$initial,
		$pending,
		$succeeded,
		$ended,
	};
};

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
