import { createQuery } from '@farfetched/core';
import { RouteInstance, RouteParams, chainRoute } from 'atomic-router';
import {
	Effect,
	Event,
	createDomain,
	createEffect,
	createEvent,
	sample,
} from 'effector';
import { authApi } from '../api';

const session = createDomain();

enum AuthorizationStatus {
	Initial = 1,
	Pending,
	Anonymous,
	Authorized,
}

export const $user = session.store<{ id: number } | null>(null);
const $authorizationStatus = session.store<AuthorizationStatus>(
	AuthorizationStatus.Initial
);
export const $isAuth = $authorizationStatus.map(
	(status) => status === AuthorizationStatus.Authorized
);
export const auth = createQuery({
	effect: createEffect(authApi.auth),
});

sample({
	clock: auth.start,
	fn: () => AuthorizationStatus.Pending,
	target: $authorizationStatus,
});

sample({
	clock: auth.finished.failure,
	fn: () => AuthorizationStatus.Anonymous,
	target: $authorizationStatus,
});

sample({
	clock: auth.finished.success,
	fn: () => AuthorizationStatus.Authorized,
	target: $authorizationStatus,
});

sample({
	clock: auth.finished.success,
	fn: ({ result }) => result.user,
	target: $user,
});

export interface ChainAuthOptions<Params extends RouteParams> {
	readonly route: RouteInstance<Params>;
	readonly otherwise?: Event<any> | Effect<any, any, any>;
}

export const chainAuthorized = <Params extends RouteParams>(
	options: ChainAuthOptions<Params>
) => {
	const { route, otherwise } = options;

	const sessionCheckStarted = createEvent<any>();
	const alreadyAuthorized = createEvent();
	const alreadyAnonymous = createEvent();

	const sessionReceivedAuthorized = createEvent();
	const sessionReceivedAnonymous = createEvent();

	sample({
		clock: sessionCheckStarted,
		filter: $isAuth,
		target: alreadyAuthorized,
	});

	sample({
		clock: sessionCheckStarted,
		source: $authorizationStatus,
		filter: (status) => status === AuthorizationStatus.Anonymous,
		target: alreadyAnonymous,
	});

	sample({
		clock: sessionCheckStarted,
		source: $authorizationStatus,
		filter: (status) => status === AuthorizationStatus.Initial,
		target: auth.start,
	});

	sample({
		clock: [alreadyAuthorized, auth.finished.success],
		filter: route.$isOpened,
		fn: () => null,
		target: sessionReceivedAuthorized,
	});

	sample({
		clock: [alreadyAnonymous, auth.finished.failure],
		filter: route.$isOpened,
		fn: () => null,
		target: sessionReceivedAnonymous,
	});

	if (otherwise) {
		sample({
			clock: sessionReceivedAnonymous,
			target: otherwise as Event<any>,
		});
	}

	return chainRoute({
		route,
		beforeOpen: sessionCheckStarted,
		openOn: sessionReceivedAuthorized,
		cancelOn: sessionReceivedAnonymous,
	});
};

export const chainAnonymous = <Params extends RouteParams>(
	options: ChainAuthOptions<Params>
) => {
	const { route, otherwise } = options;

	const sessionCheckStarted = createEvent<any>();
	const alreadyAuthorized = createEvent();
	const alreadyAnonymous = createEvent();

	const sessionReceivedAuthorized = createEvent();
	const sessionReceivedAnonymous = createEvent();

	sample({
		clock: sessionCheckStarted,
		filter: $isAuth,
		target: alreadyAuthorized,
	});

	sample({
		clock: sessionCheckStarted,
		source: $authorizationStatus,
		filter: (status) => status === AuthorizationStatus.Anonymous,
		target: alreadyAnonymous,
	});

	sample({
		clock: sessionCheckStarted,
		source: $authorizationStatus,
		filter: (status) => status === AuthorizationStatus.Initial,
		target: auth.start,
	});

	sample({
		clock: [alreadyAuthorized, auth.finished.success],
		filter: route.$isOpened,
		fn: () => null,
		target: sessionReceivedAuthorized,
	});

	sample({
		clock: [alreadyAnonymous, auth.finished.failure],
		filter: route.$isOpened,
		fn: () => null,
		target: sessionReceivedAnonymous,
	});

	if (otherwise) {
		sample({
			clock: sessionReceivedAuthorized,
			target: otherwise as Event<any>,
		});
	}

	return chainRoute({
		route,
		beforeOpen: sessionCheckStarted,
		cancelOn: sessionReceivedAuthorized,
		openOn: sessionReceivedAnonymous,
	});
};
