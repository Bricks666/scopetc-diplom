import { FetchingStatus } from '@farfetched/core';
import { createEffect, createStore, createEvent, sample } from 'effector';
import { not, empty, reshape, and } from 'patronum';
import { ParamsAndResult } from '../types';

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

export const createPagination = <
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
		clock: requestFx.done,
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
